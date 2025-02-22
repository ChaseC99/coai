export type CoaiAnimation = {
    description: string;
    frames: string[];
}

export enum CoaiState {
    HAPPY = "happy",
    MAD = "mad",
    POOPY = "poopy",
    SICK = "sick",
    SHY = "shy",
}

export const mapStringToCoaiState = (str: string | undefined): CoaiState | undefined => {
    if (!str) return undefined;

    const lowerStr = str.toLowerCase();
    return Object.values(CoaiState).find(state => state === lowerStr);
};


export const stateToImages: { [key in CoaiState]: CoaiAnimation } = {
    [CoaiState.HAPPY]: { frames: ["😃", "😄"], description: "happy"},
    [CoaiState.SHY]: { frames: ["😢", "😞"], description: "shy"},
    [CoaiState.MAD]: { frames: ["😠", "😡"], description: "angry"},
    [CoaiState.SICK]: { frames: ["coi/excited.png"], description: "excited"},
    [CoaiState.POOPY]: { frames: ["coi/anxious.png"], description: "anxious"},
};
