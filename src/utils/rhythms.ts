import { Time } from "tone"
import { DRUM_PRESETS_LOOPS, DrumLoop, DrumPreset } from "./drumPresets"

export const fillDrumPreset = (preset: DrumPreset): DrumLoop => {
    const presetLoop = [...DRUM_PRESETS_LOOPS[preset]]
    const filledLoop: DrumLoop = []

    let currentEvent = presetLoop.shift()
    for (let q = 0; q < 4; q += 1) {
        for (let s = 0; s < 4; s += 1) {
            if (currentEvent && `0:${q}:${s}` === Time(currentEvent?.time).toBarsBeatsSixteenths()) {
                filledLoop.push(currentEvent)
                currentEvent = presetLoop.shift()
            } else {
                filledLoop.push({
                    time: `0:${q}:${s}`,
                    notes: [],
                    velocity: 0
                })
            }
        }
    }

    return filledLoop

}