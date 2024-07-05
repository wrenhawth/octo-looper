import { Container, Text, useTick } from "@pixi/react"
import { ComponentProps, useState } from "react"
import { getTransport } from "tone"

import { HEIGHT, WIDTH } from "./constants"
import { ZINDEX } from "../../utils/zIndex"

export const Octo = () => {
    const [octoAngle, setOctoAngle] = useState(0)
    useTick(() => {
        const transport = getTransport()
        if (transport.state === 'started') {
            setOctoAngle(transport.progress * 360)
        }
    })

    return (
        <Container
            x={WIDTH / 2}
            y={HEIGHT / 2}
            anchor={0.5}
            angle={octoAngle}
            zIndex={ZINDEX.OCTOPUS}
            >
            <Text
                text="⬆"
                // y={HEIGHT / 2 - 50}
                y={-75}
                anchor={0.5}
                eventMode='static'
                style={{
                    fontSize: 48,
                    stroke: '#ffffff',
                    fill: ['#ffffff', '#eeeeee']
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