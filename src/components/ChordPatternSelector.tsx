import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";

import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index"

import { CHORD_PATTERNS_LIST, CHORD_PATTERN_LABELS, ChordPattern } from "../utils/chordPatterns";

type Props = {
    selectedPattern: ChordPattern
    setSelectedPattern: React.Dispatch<React.SetStateAction<ChordPattern>>
}

export const ChordPatternSelector = (props: Props) => {
    const { selectedPattern, setSelectedPattern } = props
    const iconList = Array.from(CHORD_PATTERN_LABELS[selectedPattern]).map((c, i) => {
        return <SlIcon key={`${selectedPattern}-${i}`} name={c === 'x' ? "music-note" : "circle"}></SlIcon>
    })
    return <div className="rhythm-preset-select">
        <h3 style={{ marginBottom: 0 }}>❔↓ Mix It Up ↓❔</h3>
        <SlButton onClick={() => {
            setSelectedPattern((prevPattern) => {
                const prevIndex = CHORD_PATTERNS_LIST.indexOf(prevPattern)
                const nextIndex = prevIndex + 1 < CHORD_PATTERNS_LIST.length ? prevIndex + 1 : 0
                return CHORD_PATTERNS_LIST[nextIndex]
            })
        }}>
            <SlIcon name="shuffle" style={{ fontSize: 24, paddingRight: 8 }}></SlIcon>{iconList}
        </SlButton>

    </div>

}