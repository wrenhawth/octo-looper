import React, { useContext, useEffect } from "react"


import SlTab from '@shoelace-style/shoelace/dist/react/tab/index.js';
import SlTabGroup from '@shoelace-style/shoelace/dist/react/tab-group/index.js';

import { WorkflowContext, WorkflowDispatchContext } from "./WorkflowContext"
import { WorkflowStep } from "../utils/workflow"
import { DrumStep } from "./DrumStep"
import { DRUM_PRESETS, DrumPreset } from "../utils/drumPresets"
import { useDrumPart } from "../hooks/useDrumPart"
import { useDrumSampler } from '../hooks/useDrumSampler';
import { ChordSynthPreset, useChordSynth } from "../hooks/useChordSynth"
import { ChordSymbol, INITIAL_CHORD_LIST } from "../utils/basicChords"
import { ArpPattern, ChordPattern } from "../utils/chordPatterns"
import { useChordPart } from "../hooks/useChordPart"
import { ChordStep } from "./ChordStep"
import { NewSongStep } from "./NewSongStep"
import { getTransport } from "tone";

export const AllSteps = () => {
    const { isStarted, step, areDrumsEnabled, areChordsEnabled } = useContext(WorkflowContext)
    const dispatch = useContext(WorkflowDispatchContext)
    const [title, setTitle] = React.useState('')
    const [tempo, setTempo] = React.useState<number>(120)

    useEffect(() => {
        const transport = getTransport()
        transport.bpm.rampTo(tempo, 2)
    }, [tempo])

    const [drumPreset, setDrumPreset] = React.useState<DrumPreset>(DRUM_PRESETS.BOOTS_AND_CATS)
    const drumSampler = useDrumSampler(isStarted)

    useDrumPart({ drumPreset, drumSampler, isStarted })

    const [chordPreset, setChordPreset] = React.useState<ChordSynthPreset>(ChordSynthPreset.DEFAULT);

    const chordSynth = useChordSynth(isStarted, chordPreset)
    const [chordList, setChordList] = React.useState<ChordSymbol[]>(INITIAL_CHORD_LIST)
    const [useSeventh, setUseSeventh] = React.useState<boolean[]>(Array.from({ length: INITIAL_CHORD_LIST.length }, () => false))
    const [chordPattern, setChordPattern] = React.useState<ChordPattern>('DDUUDU')
    const [arpPattern, setArpPattern] = React.useState<ArpPattern>('none')
    useChordPart({ chordList, chordPattern, arpPattern, chordSynth, isStarted, playChords: areChordsEnabled, useSeventh })

    return (
        <>
            {/* <nav> */}
            <div>
                <main className="main">
                    {step === WorkflowStep.NEW_SONG &&
                        <NewSongStep title={title} persistTitle={setTitle} />
                    }
                    {step === WorkflowStep.DRUMS &&
                        <DrumStep
                            title={title}
                            drumPreset={drumPreset}
                            setDrumPreset={setDrumPreset}
                            tempo={tempo}
                            setTempo={setTempo}
                        />
                    }
                    {step === WorkflowStep.CHORDS &&
                        <ChordStep
                            title={title}

                            chordList={chordList}
                            setChordList={setChordList}
                            chordPattern={chordPattern}
                            setChordPattern={setChordPattern}
                            arpPattern={arpPattern}
                            setArpPattern={setArpPattern}
                            useSeventh={useSeventh}
                            setUseSeventh={setUseSeventh}
                        />
                    }
                </main>
                {step === WorkflowStep.CHORDS && <p>
                    <span onClick={() => setChordPreset(ChordSynthPreset.DEFAULT)}>🖥️</span>
                    <span onClick={() => setChordPreset(ChordSynthPreset.PIANO)}>🎹</span>
                    <span onClick={() => setChordPreset(ChordSynthPreset.KALIMBA)}>🔔</span>
                </p>}
                <SlTabGroup
                    className="top-tabs"
                    noScrollControls
                    placement="bottom"
                >
                    <SlTab
                        className="tab start-tab"
                        slot="nav"
                        active={step === WorkflowStep.NEW_SONG}
                        onClick={() => dispatch?.({ type: "setStep", step: WorkflowStep.NEW_SONG })}
                    // onShow={(e) => console.log(e)}
                    >
                        1: Start
                    </SlTab>
                    <SlTab
                        className="tab drums-tab"
                        slot="nav"
                        active={step === WorkflowStep.DRUMS}
                        disabled={!areDrumsEnabled}
                        onClick={() => areDrumsEnabled && dispatch?.({ type: "setStep", step: WorkflowStep.DRUMS })}

                    >
                        2: Drums
                    </SlTab>
                    <SlTab
                        className="tab chords-tab"
                        slot="nav"
                        active={step === WorkflowStep.CHORDS}
                        disabled={!areChordsEnabled}
                        onClick={() => areChordsEnabled && dispatch?.({ type: "setStep", step: WorkflowStep.CHORDS })}

                    >3: Chords
                    </SlTab>
                </SlTabGroup>
            </div>

        </>
    )
}