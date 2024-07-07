import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";

import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"

import { ARP_PATTERN_LABELS, ARP_PATTERNS_LIST, ArpPattern } from "../utils/chordPatterns";

type Props = {
    selectedArp: ArpPattern | false
    setSelectedArp: React.Dispatch<React.SetStateAction<ArpPattern | false>>
}

const PATTERN_TO_ICON = {
    'up': 'arrow-up',
    'downUp': 'arrow-down-up',
    'alternateDown': 'arrow-down',
    'random': 'dice-5',
    'randomWalk': 'person-walking',
} as const

export const ArpPatternSelector = (props: Props) => {
    const { selectedArp, setSelectedArp } = props

    const iconName = selectedArp ? PATTERN_TO_ICON[selectedArp] : 'music-note-beamed'
    return <div className="rhythm-preset-select">
        {/* <h3 style={{ marginBottom: 0 }}>❔↓ Mix It Up ↓❔</h3> */}
        <SlButton size="small" onClick={() => {
            setSelectedArp((prevArp) => {
                const prevIndex = ARP_PATTERNS_LIST.indexOf(prevArp)
                const nextIndex = prevIndex + 1 < ARP_PATTERNS_LIST.length ? prevIndex + 1 : 0
                return ARP_PATTERNS_LIST[nextIndex]
            })
        }}>
            <SlIcon name={iconName} style={{ fontSize: 24, paddingRight: 8 }}></SlIcon>{selectedArp ? ARP_PATTERN_LABELS[selectedArp] : ""}
        </SlButton>

    </div>

}