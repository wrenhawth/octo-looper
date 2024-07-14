import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon/index.js"
import { getTransport } from "tone";

const PB = () => {
    const [isPlaying, setIsPlaying] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            const transport = getTransport()
            if (transport.state === 'started') {
                setIsPlaying(true)
            } else {
                setIsPlaying(false)
            }
        }, 250)
    }, [])

    const onClick = () => {
        const transport = getTransport()
        if (transport.state === 'started') {
            setIsPlaying(false)
            transport.pause()
        } else {
            setIsPlaying(true)
            transport.start()
        }
    }

    return (
        <SlButton onClick={onClick} variant="default" size="large" style={{ padding: 12 }}>
            {isPlaying ? <SlIcon slot="prefix" name="pause-fill"></SlIcon> : <SlIcon slot="prefix" name="play-fill"></SlIcon>}
            {isPlaying ? `Pause` : `Play`}
        </SlButton>
    )
    // </div>

}

export const PlayButton = React.memo(PB)