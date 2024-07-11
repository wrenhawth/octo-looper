import { Container, Graphics, Text } from "@pixi/react"
import { ComponentProps, useCallback, useState } from "react"

import '@pixi/events'
import { CHORD_TO_EMOJI, CHORD_TO_EMOJI_SIZE, CHORD_TO_HUE, CHORD_TO_MOOD_IMAGE, ChordSymbol, MOVE_CHORD_LEFT, MOVE_CHORD_MOOD, MOVE_CHORD_RIGHT } from "../../utils/basicChords"
import { Arc, Point } from "@flatten-js/core"
import { TextStyle } from "pixi.js"
import { useCanvasWidth } from "./utils"

type ChordSetProps = {
    chordList: ChordSymbol[]
    setChordList: React.Dispatch<React.SetStateAction<ChordSymbol[]>>

    useSeventh: boolean[]
    setUseSeventh: React.Dispatch<React.SetStateAction<boolean[]>>
}

export const Chords = (props: ChordSetProps) => {
    const { chordList, setChordList, useSeventh, setUseSeventh } = props
    const width = useCanvasWidth()

    const totalChords = chordList.length

    const getUpdateChordInListFunction = (i: number) => {
        return (c: ChordSymbol) => {
            setChordList((prevList) => {
                const newList = [...prevList]
                newList[i] = c
                return newList
            })
        }
    }

    const getUpdateSeventhInListFunction = (i: number) => {
        return () => {
            setUseSeventh((prevList) => {
                const newList = [...prevList]
                newList[i] = !newList[i]
                return newList
            })
        }
    }

    return (
        <Container
            x={width / 2}
            y={width / 2}
            anchor={0.5}
        >
            {chordList.map((c, i) =>
                <Chord
                    index={i}
                    key={`${c}-${i}`}
                    chord={c}
                    useSeventh={useSeventh[i]}
                    totalChords={totalChords}
                    setChord={getUpdateChordInListFunction(i)}
                    setSeventh={getUpdateSeventhInListFunction(i)}
                />
            )}
            {/* {_.times(totalChords, (i) => <Chord index={i} key={i} totalChords={totalChords} />)} */}
        </Container>
    )
}

const RADIUS = 175

type ChordProps = {
    chord: ChordSymbol
    useSeventh: boolean
    setChord: (c: ChordSymbol) => void;
    setSeventh: () => void;
    index: number
    totalChords: number
}

type GraphicsArg = Parameters<NonNullable<React.ComponentProps<typeof Graphics>["draw"]>>[0]
export const Chord = ({ chord, useSeventh, setChord, setSeventh, index, totalChords }: ChordProps) => {
    // const progressThrough = index / totalChords
    const width = useCanvasWidth()
    const radius = RADIUS * (width / 500)
    const ellipsisRatio = Math.min(width, width) / Math.max(width, width)
    const xRatio = width > width ? 1 : ellipsisRatio
    const yRatio = width < width ? 1 : ellipsisRatio

    const halfAngle = (1 / totalChords) * Math.PI
    const startOffset = Math.PI / 4
    const startAngle = ((index / totalChords) * Math.PI * 2) - halfAngle - startOffset
    const endAngle = (((index + 1) / totalChords) * Math.PI * 2) - halfAngle - startOffset
    const centerPoint = new Point(0, 0)
    const chordArc = new Arc(centerPoint, radius, startAngle, endAngle)
    const { x, y } = chordArc.middle()
    const a = x * xRatio
    const b = y * yRatio
    // const a = Math.sin(Math.PI * progressThrough * 2) * (RADIUS * xRatio)
    // const b = Math.cos(Math.PI * progressThrough * 2) * (RADIUS * -1 * yRatio)

    const draw = useCallback((g: GraphicsArg) => {
        const hue = CHORD_TO_HUE[chord]
        const halfAngle = (1 / totalChords) * Math.PI
        const startOffset = Math.PI / 4
        const startAngle = ((index / totalChords) * Math.PI * 2) - halfAngle - startOffset
        const endAngle = (((index + 1) / totalChords) * Math.PI * 2) - halfAngle - startOffset

        // console.log(`Start: ${startAngle}, End: ${endAngle}`)
        g.clear()
        g.lineStyle(1, "white")
        g.alpha = .7
        g.arc(0, 0, radius / 2, startAngle, endAngle)

        g.beginFill(`hsl(${hue}deg 90% 60%)`)

        g.arc(0, 0, radius + 50, endAngle, startAngle, true)
        g.arc(0, 0, radius / 2, startAngle, endAngle)
        g.endFill()
    }, [chord, index, radius, totalChords])

    const [hoverLeft, setHoverLeft] = useState(false)
    const [hoverRight, setHoverRight] = useState(false)
    const [hoverMood, setHoverMood] = useState(false)


    const shiftLeft = () => {
        setChord(MOVE_CHORD_LEFT[chord as keyof typeof MOVE_CHORD_LEFT])
    }

    const shiftRight = () => {
        setChord(MOVE_CHORD_RIGHT[chord as keyof typeof MOVE_CHORD_RIGHT])
    }

    // const isMajorChord = chord.toUpperCase() === chord

    const shiftMood = () => {
        setChord(MOVE_CHORD_MOOD[chord])
    }

    const emojiSize = CHORD_TO_EMOJI_SIZE[chord]
    return (
        <>
            <Graphics draw={draw} />

            <Container
                x={a}
                y={b}
                anchor={0.5}
            >


                {/* <Text
                    text={chord}
                    x={0}
                    y={-50}
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
                /> */}
                <Text
                    text={CHORD_TO_EMOJI[chord]}
                    x={0}
                    y={0}
                    anchor={0.5}
                    angle={useSeventh ? 15 : 0}
                    eventMode='static'
                    pointerdown={() => {
                        setSeventh()
                    }}

                    style={{
                        fontSize: emojiSize,
                        align: 'center'
                    } as ComponentProps<typeof Text>['style']}
                />
                <Text
                    text={`⇠`}
                    x={-35}
                    y={0}
                    anchor={0.5}
                    eventMode="static"
                    pointerover={() => {
                        setHoverLeft(true)
                    }}
                    pointerout={() => {
                        setHoverLeft(false)
                    }}
                    pointertap={() => {
                        shiftLeft()
                    }}
                    style={new TextStyle({
                        fontSize: 24,
                        lineHeight: 32,
                        stroke: '#ffffff',
                        fill: hoverLeft ? ['#22ddff', '#22aaff'] : ['#ffffff', '#eeeeee'],
                        fillGradientType: 1,
                    }) as ComponentProps<typeof Text>['style']}
                />
                <Text
                    text={`⇢`}
                    x={30}
                    y={0}
                    anchor={0.5}
                    pointerover={() => {
                        setHoverRight(true)
                    }}
                    pointerout={() => {
                        setHoverRight(false)
                    }}
                    pointertap={() => {
                        shiftRight()
                    }}
                    eventMode='static'
                    style={{
                        fontSize: 24,
                        lineHeight: 32,
                        stroke: '#ffffff',
                        fill: hoverRight ? ['#22aaff', '#22ddff'] : ['#ffffff', '#eeeeee'],
                        fillGradientType: 1
                    } as ComponentProps<typeof Text>['style']}
                />
                {hoverMood &&
                    <Text text="◯" x={-2} y={32} anchor={0.5}
                        style={new TextStyle({
                            fontSize: 22,
                            lineHeight: 28,
                            align: "center",
                            // strokeThickness: 1,
                            fontWeight: 'normal',
                            stroke: 'white',
                            fill: 'white'
                        }) as ComponentProps<typeof Text>['style']}
                    />}
                <Text
                    text={CHORD_TO_MOOD_IMAGE[chord]}
                    x={0}
                    y={35}
                    anchor={0.5}
                    pointerover={() => {
                        setHoverMood(true)
                    }}
                    pointerout={() => {
                        setHoverMood(false)
                    }}
                    pointertap={() => {
                        shiftMood()
                    }}
                    eventMode='static'
                    style={new TextStyle({
                        fontSize: 18,
                        align: "center",

                    }) as ComponentProps<typeof Text>['style']}
                />

            </Container>

        </>
    )
}