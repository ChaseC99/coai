import { useBasic, useQuery } from "@basictech/react";
import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import useCoai from "./hooks/use-coai";
import { CoaiState } from "./coai";
import ListeningButton from "./ListeningButton";
import { initializeMoodAnalyzer, analyzeMood } from "./moodAnalyzer";

function App() {
  const { db } = useBasic();
  const [outputEmoji, setOutputEmoji] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { image, updateState } = useCoai();

  useEffect(() => {
    // Initialize the model when the component mounts
    initializeMoodAnalyzer((progress) => {
      console.log("Loading:", progress.progress + "%");
    });
  }, []);

  const handleSubmit = async () => {
    const inputText = inputRef.current?.value;
    if (!inputText) return;

    setIsLoading(true);
    try {
      const emoji = await analyzeMood(inputText);
      setOutputEmoji(emoji);
    } catch (error) {
      console.error("Error analyzing mood:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranscript = (transcript: string) => {
    if (inputRef.current) {
      inputRef.current.value = transcript;
      handleSubmit();
    }
  };

  // Rest of your component remains the same...
  return (
    <>
      <div className="my-4 flex flex-col items-center gap-4">
        <input
          type="text"
          name="inputText"
          placeholder="Enter text"
          className="border p-2 rounded"
          ref={inputRef}
        />

        <div className="flex gap-2">
          <ListeningButton onTranscript={handleTranscript} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => updateState(CoaiState.HAPPY)}>PET</button>
          <button onClick={() => updateState(CoaiState.MAD)}>SCOLD</button>
        </div>

        <div style={{ height: "50px" }}></div>

        <div>{isLoading && <span>Analyzing mood...</span>}</div>
        <div>{outputEmoji && <h2 className="text-4xl">{outputEmoji}</h2>}</div>
        <h1> {image.url} </h1>
        <p> {image.description} </p>
      </div>
    </>
  );
}

export default App;
