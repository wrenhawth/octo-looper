import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"
import { setBasePath } from "@shoelace-style/shoelace";


type Props = {
    isPlaying: boolean
    onClick: React.MouseEventHandler
}

const PB = (props: Props) => {
    const { isPlaying, onClick } = props

    return <div className="play-button">
        <SlButton onClick={onClick} variant="default">
            {isPlaying ? <SlIcon slot="prefix" name="pause-fill"></SlIcon> : <SlIcon slot="prefix" name="play-fill"></SlIcon>}
            {isPlaying ? `Pause` : `Play`}
        </SlButton>
    </div>

}

export const PlayButton = React.memo(PB)