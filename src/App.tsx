import { useBasic, useQuery } from "@basictech/react";
import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import useCoai from "./hooks/use-coai";
import { CoaiState } from "./coai";
import ListeningButton from "./ListeningButton";
import { initializeMoodAnalyzer, analyzeMood } from "./moodAnalyzer";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for theme
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { image, updateState } = useCoai();

  useEffect(() => {
    // Initialize the model when the component mounts
    initializeMoodAnalyzer((progress) => {
      console.log("Loading:", progress.progress + "%");
    });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle theme
  };

  const handleSubmit = async () => {
    const inputText = inputRef.current?.value;
    if (!inputText) return;

    setIsLoading(true);
    try {
      updateState(await analyzeMood(inputText));
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
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <img
        src={image.url}
        alt={image.description}
        style={{ width: "400px", height: "auto", filter: "invert(1)" }}
      />

      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          name="inputText"
          placeholder="Enter text"
          className="border p-2 rounded hidden"
          ref={inputRef}
        />
        <div className="flex gap-2 pt-20">
          <ListeningButton onTranscript={handleTranscript} />
          <button onClick={toggleTheme}>
            <img
              src={isDarkMode ? "/modes/darkMode.svg" : "/modes/lightMode.svg"}
              alt={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{ width: "20px", height: "20px" }} // Adjust size as needed
            />
          </button>
        </div>
        <div>{isLoading && <span>Analyzing mood...</span>}</div>
      </div>
    </div>
  );
}

export default App;
