import React from "react"
// @ts-expect-error no types
import PianoMp3 from 'tonejs-instrument-piano-mp3';

import { FMSynth, PolySynth, Synth } from "tone"
import { KALIMBA } from "../utils/synthPresets";

export enum ChordSynthPreset {
    DEFAULT = "default",
    PIANO = "piano",
    KALIMBA = "kalimba"
}

export const useChordSynth = (isStarted: boolean, preset: ChordSynthPreset) => {
    const chordSynth = React.useRef<PolySynth | null>(null)
    React.useEffect(() => {
        if (isStarted) {
            chordSynth.current?.disconnect()
            if (preset === ChordSynthPreset.DEFAULT) {
                chordSynth.current = new PolySynth(Synth, { volume: -10 }).toDestination()
            } else if (preset === ChordSynthPreset.PIANO) {
                chordSynth.current = new PianoMp3({ minify: true }).toDestination()
            } else if (preset === ChordSynthPreset.KALIMBA) {
                chordSynth.current = new PolySynth({
                    maxPolyphony: 100,
                    voice: FMSynth,
                    options: KALIMBA.fmOptions,
                }).toDestination()
            }
        }
    }, [isStarted, preset])
    return chordSynth
}