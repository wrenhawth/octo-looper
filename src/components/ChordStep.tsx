import { ChordSymbol } from "../utils/basicChords"
import { ChordPattern } from "../utils/chordPatterns"
import { OctoStage } from "./canvas/OctoStage"

type ChordStepProps = {
    chordList: ChordSymbol[]
    setChordList: React.Dispatch<React.SetStateAction<ChordSymbol[]>>
    chordPattern: ChordPattern
    setChordPattern: React.Dispatch<React.SetStateAction<ChordPattern>>
}

export const ChordStep = ({ chordList, setChordList }: ChordStepProps) => {
    return (
        <div>
            <h3 className="step-header"><span className="step-num">Step 3</span>: Chords</h3>
            <p>
                Each has a different mood
            </p>
            <OctoStage
                chordList={chordList}
                setChordList={setChordList}
            />
        </div>
    )
}