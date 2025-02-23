import React, { useMemo, useRef } from "react";

interface ListeningButtonProps {
  onTranscript: (transcript: string) => void;
}

const ListeningButton: React.FC<ListeningButtonProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = React.useState(false);
  const recognitionRef = useRef<any>(null);

  useMemo(() => {
    // Initialize speech recognition
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Speech recognition service has started.");
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log("Speech recognition service has stopped.");
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error detected: " + event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-2 rounded ${isListening ? "text-black" : "text-black"}`}
    >
      {isListening ? "🚫" : "🎤"}
    </button>
  );
};

export default ListeningButton;
