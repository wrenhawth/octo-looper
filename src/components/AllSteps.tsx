import React, { useContext, useEffect } from "react"


import SlTab from '@shoelace-style/shoelace/dist/react/tab/index.js';
import SlTabGroup from '@shoelace-style/shoelace/dist/react/tab-group/index.js';

import { WorkflowContext, WorkflowDispatchContext } from "./WorkflowContext"
import { WorkflowStep } from "../utils/workflow"
import { DrumStep } from "./DrumStep"
import { DRUM_PRESET_LIST, DRUM_PRESETS, DrumPreset } from "../utils/drumPresets"
import { useDrumPart } from "../hooks/useDrumPart"
import { useDrumSampler } from '../hooks/useDrumSampler';
import { CHORD_SYNTH_PRESETS, ChordSynthPreset, useChordSynth } from "../hooks/useChordSynth"
import { CHORD_SYMBOLS, ChordSymbol, INITIAL_CHORD_LIST } from "../utils/basicChords"
import { ARP_PATTERNS_LIST, ArpPattern, CHORD_PATTERNS_LIST, ChordPattern } from "../utils/chordPatterns"
import { useChordPart } from "../hooks/useChordPart"
import { ChordStep } from "./ChordStep"
import { NewSongStep } from "./NewSongStep"
import { getTransport } from "tone";
import { MelodyStep } from "./MelodyStep";

export type Song = {
    title: string;
    tempo: number;
    drumPreset: DrumPreset;
    chordPreset: ChordSynthPreset;
    chordList: ChordSymbol[];
    arpPattern: ArpPattern;
}

const DEFAULT_TEMPO = 120
const DEFAULT_DRUM_PRESET = DRUM_PRESETS.BOOTS_AND_CATS
const DEFAULT_CHORD_SYNTH_PRESET = ChordSynthPreset.DEFAULT
const DEFAULT_CHORD_PATTERN = 'DDUUDU'
const DEFAULT_ARP_PATTERN = 'none'

const parseDrumPresetParam = (param: string | null) => {
    if (DRUM_PRESET_LIST.includes(param as DRUM_PRESETS)) {
        return param as DrumPreset
    } else {
        return DEFAULT_DRUM_PRESET
    }
}

const parseChordSynthPresetParam = (param: string | null) => {
    if (CHORD_SYNTH_PRESETS.includes(param as ChordSynthPreset)) {
        return param as ChordSynthPreset
    } else {
        return DEFAULT_CHORD_SYNTH_PRESET
    }
}

const parseChordListParam = (param: string[] | null) => {
    if (param && param.length > 0 && param?.every((c) => CHORD_SYMBOLS.includes(c))) {
        return param as ChordSymbol[]
    } else {
        return INITIAL_CHORD_LIST
    }
}

const parseSeventhsParam = (param: string[] | null, length: number) => {
    const sevenths = Array.from({ length: INITIAL_CHORD_LIST.length }, () => false)
    param?.forEach((i) => {
        const num = Number.parseInt(i)
        if (Number.isInteger(num) && num > 0 && num < length) {
            sevenths[num] = true
        }
    })
    return sevenths
}

const parseChordPatternParam = (param: string | null) => {
    if (CHORD_PATTERNS_LIST.includes(param as ChordPattern)) {
        return param as ChordPattern
    } else {
        return DEFAULT_CHORD_PATTERN
    }
}

const parseArpPatternParam = (param: string | null) => {
    if (ARP_PATTERNS_LIST.includes(param as ArpPattern)) {
        return param as ArpPattern
    } else {
        return DEFAULT_ARP_PATTERN
    }
}

export const AllSteps = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const { isStarted, step, areDrumsEnabled, areChordsEnabled, isMelodyEnabled } = useContext(WorkflowContext)
    const dispatch = useContext(WorkflowDispatchContext)
    const [title, setTitle] = React.useState(urlParams.get('title') || '')
    const [tempo, setTempo] = React.useState<number>(Number.parseInt(urlParams.get('tempo') || `${DEFAULT_TEMPO}`) ?? DEFAULT_TEMPO)

    useEffect(() => {
        const transport = getTransport()
        transport.bpm.rampTo(tempo, 2)
    }, [tempo])

    const [drumPreset, setDrumPreset] = React.useState<DrumPreset>(parseDrumPresetParam(urlParams.get('drums')))
    const drumSampler = useDrumSampler(isStarted)

    useDrumPart({ drumPreset, drumSampler, isStarted })

    const [chordPreset, setChordPreset] = React.useState<ChordSynthPreset>(parseChordSynthPresetParam(urlParams.get('chordSound')));

    const chordSynth = useChordSynth(isStarted, chordPreset)
    const [chordList, setChordList] = React.useState<ChordSymbol[]>(parseChordListParam(urlParams.getAll('chords')))

    const [useSeventh, setUseSeventh] = React.useState<boolean[]>(parseSeventhsParam(urlParams.getAll('sev'), chordList.length))
    const [chordPattern, setChordPattern] = React.useState<ChordPattern>(parseChordPatternParam(urlParams.get('chordPattern')))
    const [arpPattern, setArpPattern] = React.useState<ArpPattern>(parseArpPatternParam(urlParams.get('arp')))
    useChordPart({ chordList, chordPattern, arpPattern, chordSynth, isStarted, playChords: areChordsEnabled, useSeventh })

    const [lyrics, setLyrics] = React.useState('')
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
                    {step === WorkflowStep.MELODY &&
                        <MelodyStep
                            title={title}
                            chordList={chordList}
                            lyrics={lyrics}
                            setLyrics={setLyrics}
                        />
                    }
                </main>
                {step === WorkflowStep.CHORDS && <p>
                    <span onClick={() => setChordPreset(ChordSynthPreset.DEFAULT)}>🖥️</span>
                    {/* <span onClick={() => setChordPreset(ChordSynthPreset.PIANO)}>🎹</span> */}
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
                    >
                        1: Name
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
                    <SlTab
                        className="tab melody-tab"
                        slot="nav"
                        active={step === WorkflowStep.MELODY}
                        disabled={!isMelodyEnabled}
                        onClick={() => isMelodyEnabled && dispatch?.({ type: "setStep", step: WorkflowStep.MELODY })}

                    >4: Sing
                    </SlTab>
                </SlTabGroup>
            </div>

        </>
    )
}