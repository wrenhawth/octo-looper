import { Container, Text, useTick } from "@pixi/react"
import { ComponentProps, useState } from "react"
import { getTransport } from "tone"

import { ZINDEX } from "../../utils/zIndex"
import { useCanvasWidth } from "./utils"

export const PlayPause = () => {
    const [isHovering, setIsHovering] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const width = useCanvasWidth()
    useTick(() => {
        const transport = getTransport()
        if (transport.state === 'started') {
            if (!isPlaying) {
                setIsPlaying(true)
            }
        } else {
            if (isPlaying) {
                setIsPlaying(false)
            }
        }
    })


    const iconFill = isHovering ? ['hsl(20deg 100% 60%)', 'hsl(40deg 100% 60%)'] : ['hsl(20deg 100% 80%)', 'hsl(40deg 100% 80%)']
    return (
        <Container
            x={width / 2}
            y={width / 2}
            anchor={0.5}
            zIndex={ZINDEX.OCTOPUS + 1}
        >
            <Text
                text={isPlaying ? "⏸" : "⏵"}
                // y={HEIGHT / 2 - 50}
                y={50}
                anchor={0.5}
                eventMode='static'
                pointerover={() => {
                    setIsHovering(true)
                }}
                pointerout={() => {
                    setIsHovering(false)
                }}
                pointertap={() => {
                    const transport = getTransport()
                    if (transport.state === 'started') {
                        transport.pause()
                    } else {
                        transport.start()
                    }
                }}
                style={{
                    fontSize: 32,
                    stroke: '#ffffff',
                    fill: iconFill,
                    // fill: iconFill,
                    fillGradientType: 0
                    // fill: ['#ffffff', '#eeeeee']
                } as ComponentProps<typeof Text>['style']}
            />

        </Container>
    )

}