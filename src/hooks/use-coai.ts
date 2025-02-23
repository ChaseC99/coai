import { useState, useEffect, use } from "react";
import { CoaiState, stateToImages } from "../coai";
import { useBasic, useQuery } from "@basictech/react";

type CoaiImage = {
    url: string;
    description: string;
}

const useCoai = () => {
    const {db} = useBasic();

    // Example 1: Use useQuery to "subscribe" to data from the database
    const coais = useQuery(() => db.collection('coais').getAll());

    const [emotion, setEmotion] = useState<CoaiState>(CoaiState.NEUTRAL);
    const [image, setImage] = useState<CoaiImage>({url: "/states/neutral/neutral1.svg", description: "neutral"});

    useEffect(() => {
        if (coais?.length > 0) {
            const coai = coais[0];
            const state = coai.state as CoaiState;
            setEmotion(state);
            setImageForState(state);
        }
    }, [coais]);

    // Private Functions
    const setImageForState = (state: CoaiState, frame: number = 0) => {
        const {frames, description} = stateToImages[state];
        setImage({url: frames[frame], description});
    }

    const updateState = (state: CoaiState) => {
        setEmotion(state);
        setImageForState(state);

        if (!coais || coais.length === 0) {
            db.collection('coais').add({state});
            return;
        } 

        db.collection('coais').update(coais[0].id, {state});
    }

    // State Management
    useEffect(() => {
        var frameIndex = 0;
        const {frames} = stateToImages[emotion];

        const interval = setInterval(() => {
            frameIndex++;
            if (frameIndex >= frames.length) {
                frameIndex = 0;
            }
            setImageForState(emotion, frameIndex);
            
        }, 1 * 1000); // Replace x with the desired number of seconds

        return () => clearInterval(interval);
    }, [emotion]);

    return { image, updateState }
};

export default useCoai;