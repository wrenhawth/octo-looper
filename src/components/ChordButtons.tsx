import React from "react";
import { scaleToTriads } from "../utils/chords";
import SlButton from "@shoelace-style/shoelace/dist/react/button";

type Props = {
    setChordNotes: React.Dispatch<React.SetStateAction<string[]>>
}

export const ChordButtons = (props: Props) => {
    const chords = Array.from(scaleToTriads().values())

    return <div>
        {/* {chords.map((c) => <SlButton onClick={() => {
            props.setChordNotes(c.notes)
        }}>{c.chordName}</SlButton>)} */}
    </div>

}