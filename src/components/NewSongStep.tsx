import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"

import { useContext } from "react";
import { WorkflowDispatchContext } from "./WorkflowContext";
import { WorkflowStep } from "../utils/workflow";
import { getContext, getTransport } from "tone";

// type NewSongProps = {
//     tempo: number
//     setTempo: React.Dispatch<React.SetStateAction<number>>
// }

export const NewSongStep = () => {
    const dispatch = useContext(WorkflowDispatchContext)

    return <div className="step">
        <h2 style={{ margin: 0 }}>
            ✨Help the Octopus Make A New Song✨
        </h2>
        <h2 className="octo" style={{ margin: 0 }}>🐙</h2>
        <div className="tempo-selector">
            <h3 className="step-header"><span className="step-num">Step 1</span>: Tempo</h3>
            {/* <div style={{ fontWeight: 'bold' }}>
                How Fast Should The Music Go?
            </div>
            <div style={{ display: 'flex' }}>
                Slow🐢
                <SlRange min={30} max={175} value={tempo} onChange={(event) => { setTempo(event.currentTarget.value) }}>
                </SlRange>
                🐇Fast
            </div> */}
        </div>

        <SlButton
            variant="success"
            size="large"
            onClick={async () => {
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
            <SlIcon slot="prefix" name="plus-lg" style={{ fontWeight: 'bold' }} />
            New Song
        </SlButton>
    </div>
}