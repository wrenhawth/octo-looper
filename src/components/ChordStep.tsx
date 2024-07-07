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
            <div className="hint">

                <p>
                    Chords are sets of notes played together
                </p>
                <p>
                    Different types have different feelings
                </p>
                <p>
                    Try the arrows
                </p>
            </div>


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