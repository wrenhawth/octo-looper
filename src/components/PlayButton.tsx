import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"


type Props = {
    isPlaying: boolean
    onClick: React.MouseEventHandler
}

const PB = (props: Props) => {
    const { isPlaying, onClick } = props

    return (
        <SlButton onClick={onClick} variant="default" size="large" style={{padding: 12}}>
            {isPlaying ? <SlIcon slot="prefix" name="pause-fill"></SlIcon> : <SlIcon slot="prefix" name="play-fill"></SlIcon>}
            {isPlaying ? `Pause` : `Play`}
        </SlButton>
    )
    // </div>

}

export const PlayButton = React.memo(PB)