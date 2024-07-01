import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"
import { CHORD_TO_EMOJI, ChordSymbol, MOVE_CHORD_LEFT, MOVE_CHORD_MOOD, MOVE_CHORD_RIGHT } from "../utils/basicChords";

type Props = {
    chordSymbol: ChordSymbol
    setChord: (c: ChordSymbol) => void
}

export const SingleChord = (props: Props) => {
    const { chordSymbol, setChord } = props
    const hasLeftChord = MOVE_CHORD_LEFT[chordSymbol] != chordSymbol

    const shiftLeft = () => {
        if (hasLeftChord) {
            setChord(MOVE_CHORD_LEFT[chordSymbol as keyof typeof MOVE_CHORD_LEFT])
        }
    }

    const hasRightChord = MOVE_CHORD_RIGHT[chordSymbol] != chordSymbol

    const shiftRight = () => {
        if (hasRightChord) {
            setChord(MOVE_CHORD_RIGHT[chordSymbol as keyof typeof MOVE_CHORD_RIGHT])
        }
    }

    const isMajorChord = chordSymbol.toUpperCase() === chordSymbol

    const shiftMood = () => {
        setChord(MOVE_CHORD_MOOD[chordSymbol])
    }
    return <div className="chord-section">
        <div className="row">
            <SlButton variant="default" size="small" circle style={{ visibility: hasLeftChord ? "visible" : "hidden" }} onClick={shiftLeft}>
                <SlIcon name="arrow-left" />
            </SlButton>
            <span className="chord-emoji">{CHORD_TO_EMOJI[chordSymbol]}</span>
            <SlButton variant="default" size="small" circle style={{ visibility: hasRightChord ? "visible" : "hidden" }} onClick={shiftRight}>
                <SlIcon name="arrow-right" />
            </SlButton>
        </div>
        <SlButton variant="default" size="small" circle onClick={shiftMood}>
                {isMajorChord && <SlIcon name="emoji-smile" />}
                {!isMajorChord && <SlIcon name="emoji-smile-upside-down" />}
        </SlButton>
    </div>

}