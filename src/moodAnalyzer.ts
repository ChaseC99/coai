// moodAnalyzer.ts
import { BrowserAI } from "@browserai/browserai";

export const MOODS = {
  Happy: { emoji: "😊", description: "Feeling joyful and content" },
  Sad: { emoji: "😢", description: "Feeling down or unhappy" },
  Angry: { emoji: "😠", description: "Feeling frustrated or mad" },
  Excited: { emoji: "🥳", description: "Feeling enthusiastic and energetic" },
  Sick: { emoji: "🥴", description: "Feeling unwell or ill" },
  Poopy: { emoji: "💩", description: "Feeling... well, you know" },
} as const;

export type Mood = keyof typeof MOODS;
export const moodToEmoji = Object.fromEntries(
  Object.entries(MOODS).map(([mood, { emoji }]) => [mood, emoji])
) as Record<Mood, string>;

export const MOOD_LIST = Object.keys(MOODS) as Mood[];

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

export const analyzeMood = async (inputText: string): Promise<string> => {
  if (!browserAI) {
    await initializeMoodAnalyzer();
  }

  const response = await browserAI!.generateText(
    `Your human says "${inputText}". Choose the mood that is MOST appropriate for this: ${MOOD_LIST.join(
      ", "
    )}.`,
    {
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
    }
  );

  const parsedResponse = JSON.parse(response) as MoodAnalyzerResponse;
  return moodToEmoji[parsedResponse.mood];
};
