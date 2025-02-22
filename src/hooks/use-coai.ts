import { useState, useEffect } from "react";
import { Action, CoaiState, stateToImages } from "../coai";

type CoaiImage = {
    url: string;
    description: string;
}

const useCoai = () => {
    const [emotion, setEmotion] = useState<CoaiState>(CoaiState.HAPPY);
    const [image, setImage] = useState<CoaiImage>({url: "", description: ""});

    const triggerAction = (action: Action) => {
        switch (action) {
            case Action.PET:
                setEmotion(CoaiState.HAPPY);
                setImageForState(CoaiState.HAPPY);
                break;
            case Action.SCOLD:
                setEmotion(CoaiState.SAD);
                setImageForState(CoaiState.SAD);
                break;
            default:
                break;
        }
    }

    const setImageForState = (state: CoaiState, frame: number = 0) => {
        const {frames, description} = stateToImages[state];
        setImage({url: frames[frame], description});
    }

    useEffect(() => {
        var frameIndex = 0;
        const {frames} = stateToImages[emotion];

        const interval = setInterval(() => {
            if (frameIndex >= frames.length) {
                frameIndex = 0;
            }
            setImageForState(emotion, frameIndex);
            frameIndex++;
            
        }, 1 * 1000); // Replace x with the desired number of seconds

        return () => clearInterval(interval);
    }, [emotion]);

    return { image, triggerAction }
};

export default useCoai;