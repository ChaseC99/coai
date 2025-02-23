// moodAnalyzer.ts
import { BrowserAI } from "@browserai/browserai";
import { CoaiAnimation, CoaiState, stateToImages } from "./coai";

export type Mood = CoaiState;

export const MOOD_LIST = Object.keys(stateToImages) as Mood[];

interface MoodAnalyzerResponse {
  mood: Mood;
}

let browserAI: BrowserAI | null = null;

export const initializeMoodAnalyzer = async (
  onProgress?: (progress: { progress: number }) => void
) => {
  browserAI = new BrowserAI();
  console.log("Loading model...");
  await browserAI.loadModel("smollm2-135m-instruct", {
    onProgress:
      onProgress ||
      ((progress) => console.log("Loading:", progress.progress + "%")),
  });
  console.log("Model loaded");
};

export const analyzeMood = async (inputText: string): Promise<CoaiState> => {
  if (!browserAI) {
    await initializeMoodAnalyzer();
  }

  const prompt = `
  "${inputText}".
    Give an explanation of how you feel given the above sentence. How do you feel?
  `;
  console.log(prompt);

  const cotResponse = (await browserAI!.generateText(prompt, {
    max_tokens: 100,
  })) as string;

  console.log(cotResponse);

  const response = await browserAI!.generateText(cotResponse, {
    json_schema: {
      type: "object",
      properties: {
        mood: {
          type: "string",
          enum: MOOD_LIST,
        },
      },
    },
    response_format: {
      type: "json_object",
    },
  });

  const parsedResponse = JSON.parse(response) as MoodAnalyzerResponse;
  console.log(parsedResponse.mood);
  return parsedResponse.mood;
};
