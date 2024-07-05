import { Container, Text } from "@pixi/react"
import { HEIGHT, WIDTH } from "./constants"
import { ComponentProps, useState } from "react"
import _ from "lodash"

import '@pixi/events'

type ChordSetProps = {
    totalChords: number
}

export const Chords = (props: ChordSetProps) => {
    const { totalChords } = props
    return (
        <Container
            x={WIDTH / 2}
            y={HEIGHT / 2}
            anchor={0.5}
        >
            {_.times(totalChords, (i) => <Chord index={i} key={i} totalChords={totalChords} />)}
        </Container>
    )
}

const RADIUS = 250


type ChordProps = {
    index: number
    totalChords: number
}

export const Chord = ({ index, totalChords }: ChordProps) => {
    const progressThrough = index / totalChords
    const ellipsisRatio = Math.min(WIDTH, HEIGHT) / Math.max(WIDTH, HEIGHT)
    const xRatio = WIDTH > HEIGHT ? 1 : ellipsisRatio
    const yRatio = WIDTH < HEIGHT ? 1 : ellipsisRatio
    const a = Math.sin(Math.PI * progressThrough * 2) * (RADIUS * xRatio)
    const b = Math.cos(Math.PI * progressThrough * 2) * (RADIUS * -1 * yRatio)

    const [hoverLeft, setHoverLeft] = useState(false)
    const [hoverRight, setHoverRight] = useState(false)
    return (
        <Container
            x={a}
            y={b}
            anchor={0.5}
        >
            <Text
                text={`⇠`}
                x={-40}
                y={0}
                anchor={0.5}
                eventMode="static"
                pointerover={() => {
                    setHoverLeft(true)
                }}
                pointerout={() => {
                    setHoverLeft(false)
                }}
                style={{
                    fontSize: 32,
                    stroke: '#ffffff',
                    fill: hoverLeft ? ['#22ddff', '#22aaff'] : ['#ffffff', '#eeeeee'],
                    fillGradientType: 1
                } as ComponentProps<typeof Text>['style']}
            />
            <Text
                text={`🪸`}
                x={0}
                y={0}
                anchor={0.5}
                eventMode='static'
                pointerdown={() => {
                    console.log(index)
                }}
                style={{
                    fontSize: 42,
                    stroke: '#ffffff',
                    fill: ['#ffffff', '#eeeeee']
                } as ComponentProps<typeof Text>['style']}
            />
            <Text
                text={`⇢`}
                x={40}
                y={0}
                anchor={0.5}
                pointerover={() => {
                    setHoverRight(true)
                }}
                pointerout={() => {
                    setHoverRight(false)
                }}
                eventMode='static'
                style={{
                    fontSize: 32,
                    stroke: '#ffffff',
                    fill: hoverRight ? ['#22aaff', '#22ddff'] : ['#ffffff', '#eeeeee'],
                    fillGradientType: 1
                } as ComponentProps<typeof Text>['style']}
            />
        </Container>
    )
}