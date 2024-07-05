import React from "react"

import { PolySynth, Synth } from "tone"

export const useChordSynth = (isStarted: boolean) => {
    const chordSynth = React.useRef<PolySynth | null>(null)
    React.useEffect(() => {
        if (isStarted) {
            chordSynth.current = new PolySynth(Synth, { volume: -10 }).toDestination()
        }
    }, [isStarted])
    return chordSynth
}