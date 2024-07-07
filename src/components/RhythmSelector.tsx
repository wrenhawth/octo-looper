import React from "react";
import SlOption from '@shoelace-style/shoelace/dist/react/option/index.js';
import SlSelect from '@shoelace-style/shoelace/dist/react/select/index.js';
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"

import { DRUM_LABELS, DRUM_PRESET_LIST, DrumPreset } from "../utils/drumPresets";

type Props = {
    selectedRhythm: DrumPreset

    // drumPartRef: React.Ref<Part | null>

    setSelectedRhythm: React.Dispatch<React.SetStateAction<DrumPreset>>
}

export const RhythmSelector = (props: Props) => {
    const { selectedRhythm, setSelectedRhythm } = props

    return <div className="rhythm-preset-select">
        <SlSelect
            label="🥁↓ Pick a Beat ↓🥁"
            value={selectedRhythm}
            className="preset-select"
            placement="bottom"
            size="medium"
        >
            <SlIcon name="music-note" slot="prefix"></SlIcon>
            {DRUM_PRESET_LIST.map((d) => {
                const isSelected = d === selectedRhythm
                return (
                    <SlOption
                        key={d}
                        value={d}
                        selected={isSelected}
                        onClick={() => {
                            setSelectedRhythm(d)
                        }}
                    >
                        {DRUM_LABELS[d]}
                    </SlOption>
                )
            })}
        </SlSelect>
    </div>

}