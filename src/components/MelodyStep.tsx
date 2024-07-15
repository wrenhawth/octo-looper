import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"

import SlTextArea from "@shoelace-style/shoelace/dist/react/textarea/index.js"

import { ChordSymbol } from "../utils/basicChords"
import { WorkflowDispatchContext } from "./WorkflowContext";
import { useContext } from "react";
import { WorkflowStep } from "../utils/workflow";
import { PlayButton } from "./PlayButton";

type MelodyStepProps = {
    title: string
    chordList: ChordSymbol[]
    lyrics: string
    setLyrics: React.Dispatch<React.SetStateAction<string>>
}

export const MelodyStep = (props: MelodyStepProps) => {
    const { title, lyrics, setLyrics } = props
    const dispatch = useContext(WorkflowDispatchContext)

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', alignItems: 'center', width: '80%', margin: 'auto' }}>
                <SlButton
                    size="small"
                    style={{ justifySelf: 'center' }}
                    onClick={() => {
                        dispatch?.({
                            type: 'setStep',
                            step: WorkflowStep.CHORDS
                        })
                    }}>
                    <SlIcon name="rewind" slot="prefix"></SlIcon>🎹 Chords
                </SlButton>
                <h3 className="step-header">
                    <span className="step-num">Step 4</span>: Sing
                </h3>
            </div>
            <div className="hint">
                <ul className="hint-list">
                    <li>
                        Let's try <span className="emphasize">adding words</span> to your song
                    </li>
                    <li>
                        You can sing soft, loud, or any way you want 💖
                    </li>
                    <li>
                        Start by trying to sing or hum close to the sounds you hear
                    </li>
                </ul>
            </div>

            <h4 className="title" style={{ margin: 0 }}>Song: <span className="emphasize">{title}</span></h4>
            <PlayButton
            />
            <div className="hint">
                <SlTextArea
                    label="↓You can use this space to write your lyrics↓"
                    style={{ padding: 16 }}
                    value={lyrics}
                    onSlChange={(e) => {
                        const t = e.currentTarget as EventTarget & { value?: string }
                        t?.value && setLyrics(t?.value)
                    }}
                ></SlTextArea>
            </div>

            <SlButton
                variant="success"
                size="large"
                onClick={() => {
                    dispatch?.({ type: "setStep", step: WorkflowStep.SHARE })
                }}
                
            >
                <SlIcon slot="prefix" name="caret-right-fill" style={{ fontWeight: 'bold' }} />
                Next Step
            </SlButton>
        </div>
    )
}