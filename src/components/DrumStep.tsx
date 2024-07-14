import React, { useContext, useState } from "react"

import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"
import SlRange from '@shoelace-style/shoelace/dist/react/range/index.js';

import { RhythmSelector } from "./RhythmSelector"
import { DrumPreset } from "../utils/drumPresets"
import { WorkflowStep } from "../utils/workflow";
import { WorkflowDispatchContext } from "./WorkflowContext";
import { PlayButton } from "./PlayButton";
import { getTransport } from "tone";

type DrumStepProps = {
    drumPreset: DrumPreset,
    setDrumPreset: React.Dispatch<React.SetStateAction<DrumPreset>>
    tempo: number,
    setTempo: React.Dispatch<React.SetStateAction<number>>
    title: string,
}

export const DrumStep = (props: DrumStepProps) => {
    const { drumPreset, setDrumPreset, title, tempo, setTempo } = props
    const [isPlaying, setIsPlaying] = useState(true)
    const dispatch = useContext(WorkflowDispatchContext)


    return (
        <div className="step">
            <h3 className="step-header"><span className="step-num">Step 2</span>: Rhythm</h3>
            <h2 className="title" style={{ margin: 12 }}>Song: <span className="emphasize">{title}</span></h2>
            {/* <div> */}
            <PlayButton
                isPlaying={isPlaying}
                onClick={() => {
                    const transport = getTransport()
                    if (transport.state === 'started') {
                        setIsPlaying(false)
                        transport.pause()
                    } else {
                        setIsPlaying(true)
                        transport.start()
                    }
                }} /
            >
            {/* </div> */}

            <div className="beat-select">
                {/* <div style={{ display: 'flex' }}> */}
                <div className="tempo-selector">

                    <div style={{ fontWeight: 'bold' }}>
                        How Fast Should The Music Go?
                    </div>
                    <div style={{ display: 'flex' }}>
                        Slow🐢
                        <SlRange
                            min={30}
                            max={175}
                            value={tempo}
                            onSlChange={
                                (event) => {
                                    setTempo((event.target as unknown as { value: number }).value ?? 100)
                                }
                            }
                        >
                        </SlRange>
                        🐇Fast
                    </div>
                </div>

                <RhythmSelector setSelectedRhythm={setDrumPreset} selectedRhythm={drumPreset} />
            </div>

            <SlButton
                variant="success"
                size="large"
                onClick={() => {
                    dispatch?.({ type: "setStep", step: WorkflowStep.CHORDS })
                }}
            >
                <SlIcon slot="prefix" name="caret-right-fill" style={{ fontWeight: 'bold' }} />
                Next Step
            </SlButton>
        </div>
    )
}