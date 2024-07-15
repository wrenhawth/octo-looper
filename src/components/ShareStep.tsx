import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"


import { WorkflowDispatchContext } from "./WorkflowContext";
import { useContext } from "react";
import { WorkflowStep } from "../utils/workflow";
import { PlayButton } from "./PlayButton";

type ShareStepProps = {
    title: string
    shareUrl: string
}

export const ShareStep = (props: ShareStepProps) => {
    const { title, shareUrl } = props
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
                            step: WorkflowStep.MELODY
                        })
                    }}>
                    <SlIcon name="rewind" slot="prefix"></SlIcon>🎙️ Sing
                </SlButton>
                <h3 className="step-header">
                    <span className="step-num">Step 5</span>: Share
                </h3>
            </div>
            <div className="hint">
                <ul className="hint-list">
                    <li>
                        If you click the button below, you can send your song to someone else
                    </li>
                </ul>
            </div>

            <h4 className="title" style={{ margin: 0 }}>Song: <span className="emphasize">{title}</span></h4>
            <div className="step">
                <div>
                    <PlayButton />
                </div>
                <SlButton
                    size="medium"
                    variant="success"
                    style={{ justifySelf: 'center' }}
                    onClick={async () => {
                        const shareData = {
                            url: shareUrl,
                            text: "Check out my song!",
                            title
                        }
                        if (navigator?.canShare?.(shareData)) {
                            await navigator.share(shareData)
                        } else {
                            navigator.clipboard.writeText(shareUrl)
                        }
                    }}>
                    <SlIcon name="send" slot="prefix"></SlIcon>Share
                </SlButton>
            </div>
        </div>
    )
}