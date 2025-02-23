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
      <div style={{ position: "relative", width: "500px", height: "auto" }}>
        <img
          src="/egg/egg-30.svg"
          alt="Large Image"
          style={{ width: "100%", height: "auto", opacity: "0.65" }}
        />
        <img
          src={image.url}
          alt={image.description}
          style={{
            position: "absolute",
            top: "48%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "250px",
            height: "auto",
            filter: "invert(1)",
          }}
        />
      </div>

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

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => updateState(CoaiState.HAPPY)}>HAPPY</button>
        <button onClick={() => updateState(CoaiState.ANGRY)}>ANGRY</button>
        <button onClick={() => updateState(CoaiState.SICK)}>SICK</button>
        <button onClick={() => updateState(CoaiState.POOPY)}>POOPY</button>
        <button onClick={() => updateState(CoaiState.EXCITED)}>EXCITED</button>
        <button onClick={() => updateState(CoaiState.SHY)}>SHY</button>
      </div>
    </div>
  );
}

export default App;
