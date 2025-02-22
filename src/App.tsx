import { useBasic, useQuery } from "@basictech/react";
import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import ListeningButton from "./ListeningButton";
import { initializeMoodAnalyzer, analyzeMood } from "./moodAnalyzer";

const deleteCursorIcon = `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MEE1RkEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIzIDYgNSA2IDIxIDYiPjwvcG9seWxpbmU+PHBhdGggZD0iTTE5IDZ2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNm0zIDBWNGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYyIj48L3BhdGg+PC9zdmc+),auto`;

function App() {
  const { db } = useBasic();
  const emojis = useQuery(() => db.collection("emojis").getAll());
  const [outputEmoji, setOutputEmoji] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      {/* ... existing JSX ... */}
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
      </div>

      <div>{isLoading && <span>Analyzing mood...</span>}</div>
      <div>{outputEmoji && <h2 className="text-4xl">{outputEmoji}</h2>}</div>
    </>
  );
}

export default App;
