export type CoaiAnimation = {
  description: string;
  frames: string[];
};

export enum CoaiState {
  HAPPY = "happy",
  EXCITED = "excited",
  ANGRY = "angry",
  POOPY = "needtopoo",
  SICK = "sick",
  SHY = "shy",
}

export const mapStringToCoaiState = (
  str: string | undefined
): CoaiState | undefined => {
  if (!str) return undefined;

  const lowerStr = str.toLowerCase();
  return Object.values(CoaiState).find((state) => state === lowerStr);
};

const generateFrameFiles = (filename: string, count: number) => {
  return Array.from({ length: count }, (_, i) => `${filename}${i + 1}.svg`);
};

export const stateToImages: { [key in CoaiState]: CoaiAnimation } = {
  [CoaiState.HAPPY]: {
    frames: generateFrameFiles("/states/happy/happy", 2),
    description: "happy",
  },
  [CoaiState.EXCITED]: {
    frames: generateFrameFiles("/states/excited/excited", 3),
    description: "excited",
  },
  [CoaiState.SHY]: {
    frames: generateFrameFiles("/states/shy/shy", 10),
    description: "shy",
  },
  [CoaiState.ANGRY]: {
    frames: generateFrameFiles("/states/angry/angry", 2),
    description: "angry",
  },
  [CoaiState.SICK]: {
    frames: generateFrameFiles("/states/sick/sick", 2),
    description: "excited",
  },
  [CoaiState.POOPY]: {
    frames: generateFrameFiles("/states/poopy/poopy", 3),
    description: "anxious",
  },
};
