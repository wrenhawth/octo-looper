import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"

import { ChordSymbol } from "../utils/basicChords"
import { ArpPattern, ChordPattern } from "../utils/chordPatterns"
import { OctoStage } from "./canvas/OctoStage"
import { ChordPatternSelector } from "./ChordPatternSelector";
import { ArpPatternSelector } from "./ArpPatternSelector";

type ChordStepProps = {
    chordList: ChordSymbol[]
    setChordList: React.Dispatch<React.SetStateAction<ChordSymbol[]>>
    chordPattern: ChordPattern
    setChordPattern: React.Dispatch<React.SetStateAction<ChordPattern>>
    useSeventh: boolean[]
    setUseSeventh: React.Dispatch<React.SetStateAction<boolean[]>>
    arpPattern: ArpPattern
    setArpPattern: React.Dispatch<React.SetStateAction<ArpPattern>>
}

export const ChordStep = ({ chordList, setChordList, chordPattern, setChordPattern, arpPattern, setArpPattern, useSeventh, setUseSeventh }: ChordStepProps) => {
    return (
        <div>
            <h3 className="step-header"><span className="step-num">Step 3</span>: Chords</h3>
            <ul className="hint hint-list">
                <li>
                    Chords are <em className="emphasize">sets of notes</em> played together
                </li>
                <li>
                    Each part of the circle can be a different chord
                </li>
                <li>
                    They all have different moods, try the arrows
                </li>
            </ul>


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