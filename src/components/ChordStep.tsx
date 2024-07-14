import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"

import { ChordSymbol } from "../utils/basicChords"
import { ArpPattern, ChordPattern } from "../utils/chordPatterns"
import { OctoStage } from "./canvas/OctoStage"
import { ChordPatternSelector } from "./ChordPatternSelector";
import { ArpPatternSelector } from "./ArpPatternSelector";
import { WorkflowDispatchContext } from "./WorkflowContext";
import { useContext } from "react";
import { WorkflowStep } from "../utils/workflow";

type ChordStepProps = {
    title: string
    chordList: ChordSymbol[]
    setChordList: React.Dispatch<React.SetStateAction<ChordSymbol[]>>
    chordPattern: ChordPattern
    setChordPattern: React.Dispatch<React.SetStateAction<ChordPattern>>
    useSeventh: boolean[]
    setUseSeventh: React.Dispatch<React.SetStateAction<boolean[]>>
    arpPattern: ArpPattern
    setArpPattern: React.Dispatch<React.SetStateAction<ArpPattern>>
}

export const ChordStep = ({ title, chordList, setChordList, chordPattern, setChordPattern, arpPattern, setArpPattern, useSeventh, setUseSeventh }: ChordStepProps) => {
    const dispatch = useContext(WorkflowDispatchContext)
    
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', alignItems: 'center', width: '80%', margin: 'auto'}}>
                <SlButton 
                size="small" 
                style={{justifySelf: 'center'}}
                 onClick={() => {
                    dispatch?.({
                        type: 'setStep',
                        step: WorkflowStep.DRUMS
                    })
                 }}>
                    <SlIcon name="rewind" slot="prefix"></SlIcon>🥁 Drums
                </SlButton>
                <h3 className="step-header">
                    <span className="step-num">Step 3</span>: Chords
                </h3>
            </div>
            <div className="hint">
                <ul className="hint-list">
                    <li>
                        Chords are <em className="emphasize">sets of notes</em> played together
                    </li>
                    <li>
                        Each part of the circle can be a different chord
                    </li>
                    <li>
                        Chords (🪸🐡🐠🐢🐬🪼) have different moods
                    </li>
                    <li><strong>Try the arrows ⇠⇢ and faces 😊🫨</strong>
                        {/* <p>🪸🐡🐠🐢🐬🪼</p> */}
                    </li>
                </ul>
            </div>

            <h4 className="title" style={{ margin: 0 }}>Song: <span className="emphasize">{title}</span></h4>

            <OctoStage
                chordList={chordList}
                setChordList={setChordList}
                useSeventh={useSeventh}
                setUseSeventh={setUseSeventh}
            />
            <div className="hint">
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>

                    <SlButton
                        size="small"
                        onClick={() => {
                            const newList = [...chordList]
                            newList.pop()
                            setChordList(newList)
                        }}
                    >
                        <SlIcon slot="prefix" name="dash-lg"></SlIcon>
                    </SlButton>
                    {chordList.length} Bars
                    <SlButton
                        size="small"
                        onClick={() => {
                            // getTransport().loopEnd = `${chordList.length - 1}m`
                            setChordList([...chordList, 'I'])
                        }}
                    >
                        <SlIcon slot="prefix" name="plus-lg"></SlIcon>
                    </SlButton>

                </div>
            </div>
            <div className="hint">

                <p>These change how the chords are played</p>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                    <ChordPatternSelector
                        selectedPattern={chordPattern}
                        setSelectedPattern={setChordPattern}
                    />
                    <ArpPatternSelector
                        selectedArp={arpPattern}
                        setSelectedArp={setArpPattern}
                    />
                </div>

            </div>
        </div>
    )
}