import React from "react"
import { Sampler } from "tone"

import BassDrumUrl from '../assets/sounds/Boom-Bap-Kick.wav'
import CymbalUrl from '../assets/sounds/drum_cymbal_hard.flac'
import SnareDrumUrl from '../assets/sounds/drum_snare_hard.flac'
import ClosedHiHatUrl from '../assets/sounds/drum_cymbal_closed.flac'
import OpenHiHatUrl from '../assets/sounds/drum_cymbal_open.flac'
import PedalHiHatUrl from '../assets/sounds/Boom-Bap-Pedal-Hat.wav'

export const useDrumSampler = (isStarted: boolean) => {
    const drumSampler = React.useRef<Sampler | null>(null)

    React.useEffect(() => {
        if (isStarted) {
            drumSampler.current = new Sampler({
                'B0': BassDrumUrl,
                'C1': BassDrumUrl,
                // 'C1': BassDrumUrl,
                'D1': SnareDrumUrl,
                'Ab1': PedalHiHatUrl,
                'F#1': ClosedHiHatUrl,
                'Bb1': OpenHiHatUrl,
                'C#2': CymbalUrl
            },
                {
                    volume: -10
                }
            ).toDestination()

        }
    }, [isStarted])

    return drumSampler
}