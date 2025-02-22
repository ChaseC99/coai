export type CoaiAnimation = {
    description: string;
    frames: string[];
}

export enum CoaiState {
    HAPPY,
    SAD,
    ANGRY,
    SICK,
    POOPY,
}

export const stateToImages: { [key in CoaiState]: CoaiAnimation } = {
    [CoaiState.HAPPY]: { frames: ["😃", "😄"], description: "happy"},
    [CoaiState.SAD]: { frames: ["😢", "😞"], description: "sad"},
    [CoaiState.ANGRY]: { frames: ["😠", "😡"], description: "angry"},
    [CoaiState.SICK]: { frames: ["coi/excited.png"], description: "excited"},
    [CoaiState.POOPY]: { frames: ["coi/anxious.png"], description: "anxious"},
};

export enum Action {
    FEED = "feed",
    PET = "pet",
    FLUSH = "flush",
    SCOLD = "scold",
}