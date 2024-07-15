import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"
import SlInput from "@shoelace-style/shoelace/dist/react/input/index.js"

import React, { useContext } from "react";
import { WorkflowDispatchContext } from "./WorkflowContext";
import { WorkflowStep } from "../utils/workflow";
import { getContext, getTransport } from "tone";
import { generateTitleOptions } from "../utils/title";

type NewSongProps = {
    title: string
    persistTitle: React.Dispatch<React.SetStateAction<string>>
    isLoadedSong: boolean
}

export const NewSongStep = (props: NewSongProps) => {
    const { title, isLoadedSong, persistTitle } = props
    const dispatch = useContext(WorkflowDispatchContext)
    const [options, setOptions] = React.useState(generateTitleOptions())
    // const [title, setTitle] = React.useState('')
    return <div className="step">
        <h2 style={{ margin: 0 }}>
            ✨Help the Octopus Make A New Song✨
        </h2>
        <h2 className="octo" style={{ margin: 0 }}>🐙</h2>
        <div className="tempo-selector">
            <h3 className="step-header"><span className="step-num">Step 1</span>: Song Name</h3>
            {!isLoadedSong && <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' }}>
                    <p className="hint" style={{ gridColumn: 2 }}>Pick a silly one ↓</p>
                    <div>
                        <SlButton
                            // size="small"
                            // style={{ margin: 16 }}
                            onClick={() => setOptions(generateTitleOptions())}
                        >
                            🎲Random🎲
                        </SlButton>
                    </div>
                </div>
                <div className="name-options">
                    {options.map((o) => (
                        <p
                            key={o}
                            className={o === title ? "selected" : undefined}
                            onClick={() => {
                                // setTitle(o)
                                persistTitle(o)
                            }}
                        >
                            {o}
                        </p>
                    ))}
                </div>
            </>}

            <div>
                {!isLoadedSong && <div className="hint">Or make your own ↓</div>}
                <SlInput
                    value={title}
                    onSlChange={(e) => {
                        const t = e.currentTarget as EventTarget & { value?: string }
                        t?.value && persistTitle(t?.value)
                    }}
                ></SlInput>
            </div>
        </div>

        <SlButton
            variant="success"
            size="large"
            onClick={async () => {
                if (title == '') {
                    persistTitle(options[0])
                } else {
                    persistTitle(title)
                }
                dispatch?.({ type: "start" })
                dispatch?.({ type: "setStep", step: WorkflowStep.DRUMS })
                const transport = getTransport()
                transport.loop = true
                transport.loopStart = 0
                transport.loopEnd = '4m'
                transport.start("+0.1")
                await getContext().resume()

            }}
        >
            <SlIcon slot="prefix" name="caret-right-fill" style={{ fontWeight: 'bold' }} />
            {isLoadedSong ? "Start Song" : "New Song"}
        </SlButton>
    </div>
}