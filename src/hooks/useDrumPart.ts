import React from "react"
import { Part, Sampler } from "tone"
import { DRUM_PRESETS_LOOPS, DrumEvent, DrumPreset } from "../utils/drumPresets"
import { fillDrumPreset } from "../utils/rhythms"

type DrumPart = Part<DrumEvent>

const updateRhythmPart = (part: DrumPart, drumPreset: DrumPreset) => {
    const newValue = fillDrumPreset(drumPreset)
    newValue.forEach((v) => {
        const { time } = v
        part.at(time, v)
    })
}

type DrumPartOptions = {
    drumPreset: DrumPreset
    drumSampler: React.MutableRefObject<Sampler | null>
    isStarted: boolean
}

export const useDrumPart = (options: DrumPartOptions) => {
    const { drumPreset, drumSampler, isStarted } = options
    const drumPartRef = React.useRef<Part | null>(null)

    React.useEffect(() => {
        if (isStarted) {
            const drumPart = new Part<DrumEvent>((time, value) => {
                drumSampler.current?.triggerAttackRelease(value.notes, 1, time, value.velocity)
            },
                DRUM_PRESETS_LOOPS.BOOTS_AND_CATS
            ).start('0:0')
            drumPart.loop = true;
            drumPart.loopStart = '0:0'
            drumPart.loopEnd = '1m'
            drumPartRef.current = drumPart
        }

    }, [drumSampler, isStarted])

    React.useEffect(() => {
        if (isStarted && drumPartRef.current) {
            updateRhythmPart(drumPartRef.current, drumPreset)
        }
    }, [drumPreset, isStarted])

    return drumPartRef
}