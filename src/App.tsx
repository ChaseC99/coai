import { useBasic, useQuery } from "@basictech/react";
import "./App.css";
import { BrowserAI } from "@browserai/browserai";
import React from "react";

const deleteCursorIcon = `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MEE1RkEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIzIDYgNSA2IDIxIDYiPjwvcG9seWxpbmU+PHBhdGggZD0iTTE5IDZ2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNm0zIDBWNGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYyIj48L3BhdGg+PC9zdmc+),auto`;

function App() {
  const { db } = useBasic();
  const emojis = useQuery(() => db.collection("emojis").getAll());
  const [outputEmoji, setOutputEmoji] = React.useState<string | null>(null);

  const moodToEmoji: { [key: string]: string } = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😠",
    Excited: "😃",
    Bored: "😐",
    Sleepy: "😴",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputText = formData.get("inputText") as string;

    const browserAI = new BrowserAI();
    console.log("Loading model...");
    await browserAI.loadModel("smollm2-135m-instruct", {
      onProgress: (progress) =>
        console.log("Loading:", progress.progress + "%"),
    });
    console.log("Model loaded");
    const response = await browserAI.generateText(
      `Your human says "${inputText}". What is your mood now?`,
      {
        json_schema: {
          type: "object",
          properties: {
            mood: {
              type: "string",
              enum: ["Happy", "Sad", "Angry", "Excited", "Bored", "Sleepy"],
            },
          },
        },
        response_format: {
          type: "json_object",
        },
      }
    );
    const parsedResponse = JSON.parse(response);
    console.log(parsedResponse);
    setOutputEmoji(moodToEmoji[parsedResponse.mood]);
  };

  return (
    <>
      <h1 className="text-4xl font-bold font-mono">create-lofi-app</h1>
      <div className="card">
        <button
          onClick={() =>
            db.collection("emojis").add({
              value: `${
                [
                  "✨",
                  "🌟",
                  "💫",
                  "⭐",
                  "🌠",
                  "🎇",
                  "🎆",
                  "🌈",
                  "🌸",
                  "🌺",
                  "🍀",
                  "🎨",
                  "🎭",
                  "🎪",
                  "🎡",
                  "🎢",
                  "🎠",
                ][Math.floor(Math.random() * 17)]
              }`,
            })
          }
        >
          new ✨
        </button>
        <div className="flex flex-row gap-4 justify-center min-h-[60px] ">
          {emojis?.map((e: { id: string; value: string }) => (
            <div
              key={e.id}
              className="rounded-md m-2 p-2"
              style={{ cursor: deleteCursorIcon }}
              onClick={() => db.collection("emojis").delete(e.id)}
            >
              {e.value}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="my-4">
        <input
          type="text"
          name="inputText"
          placeholder="Enter text"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Generate
        </button>
      </form>

      <div>{outputEmoji && <h2 className="text-4xl">{outputEmoji}</h2>}</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto px-4">
        <a
          href="https://docs.basic.tech"
          target="_blank"
          className="card-link group"
        >
          <h2 className="card-title">Basic Docs</h2>
          <p className="card-description">Auth, sync, and database</p>
        </a>

        <a
          href="https://vite-pwa-org.netlify.app/"
          target="_blank"
          className="card-link group"
        >
          <h2 className="card-title">PWA Reference</h2>
          <p className="card-description">Enable offline capabilities</p>
        </a>

        <a
          href="https://tailwindcss.com/docs"
          target="_blank"
          className="card-link group"
        >
          <h2 className="card-title">Tailwind</h2>
          <p className="card-description">Styling framework</p>
        </a>
      </div>
    </>
  );
}

export default App;
