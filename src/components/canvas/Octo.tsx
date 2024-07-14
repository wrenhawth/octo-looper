import { Container, Text, useTick } from "@pixi/react"
import { ComponentProps, useState } from "react"
import { getTransport } from "tone"

import { ZINDEX } from "../../utils/zIndex"
import { useCanvasWidth } from "./utils"

export const Octo = () => {
    const [octoAngle, setOctoAngle] = useState(0)
    const width = useCanvasWidth()
    useTick(() => {
        const transport = getTransport()
        if (transport.state === 'started') {
            setOctoAngle(transport.progress * 360)
        }
    })

    return (
        <Container
            x={width / 2}
            y={width / 2}
            anchor={0.5}
            angle={octoAngle}
            zIndex={ZINDEX.OCTOPUS}
        >
            <Text
                text="▲"
                // y={HEIGHT / 2 - 50}
                y={-50}
                anchor={0.5}
                eventMode='static'
                style={{
                    fontSize: 32,
                    stroke: '#ffffff',
                    fill: '#ffffff',
                    // fill: ['#ffffff', '#eeeeee']
                } as ComponentProps<typeof Text>['style']}
            />
            <Text
                text="🐙"
                x={0}
                y={0}
                anchor={0.5}
                eventMode='static'
                pointerdown={() => {
                    const transport = getTransport()
                    if (transport.state === 'started') {
                        transport.pause()
                    } else {
                        transport.start()
                    }
                }}
                style={{
                    fontSize: 82,
                    stroke: 'white',
                    dropShadowColor: '#cccccc'
                } as ComponentProps<typeof Text>['style']}
            />

        </Container>
    )

}