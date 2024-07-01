import { Time } from "tone"

export type ChordEvent = {
    time: string,
    notes: string[],
    velocity: number
}

export const generateChordProgression = (chords: string[][], chordPattern: ChordPattern): ChordEvent[] => {
    return chords.map((notes, index) => fillChordPattern(index, notes, chordPattern)).flat()
}

export const fillChordPattern = (bar: number, chord: string[], chordPattern: ChordPattern): ChordEvent[] => {
    const timeEvents = CHORD_PATTERNS[chordPattern]
    const patternTimes = [...timeEvents]
    const filledPattern: ChordEvent[] = []

    let currentTime = patternTimes.shift()
    for (let q = 0; q < 4; q += 1) {
        for (let s = 0; s < 4; s += 1) {
            if (currentTime && `${0}:${q}:${s}` === Time(currentTime).toBarsBeatsSixteenths()) {
                filledPattern.push({
                    time: `${bar}:${q}:${s}`,
                    notes: chord,
                    velocity: .7
                })
                currentTime = patternTimes.shift()
            } else {
                filledPattern.push({
                    time: `${bar}:${q}:${s}`,
                    notes: [],
                    velocity: 0
                })
            }
        }
    }
    return filledPattern

}

export type ChordPattern = 'DDDD' | 'DDUUDU' | 'DDDDU'
export const CHORD_PATTERNS_LIST = [
    'DDDD',
    'DDUUDU',
    'DDDDU'
] as const

export const CHORD_PATTERN_LABELS = {
    DDDD: 'xoxoxoxo',
    DDUUDU: 'xoxxoxxx',
    DDDDU: 'xoxoxoxx'
}

const DDDD = [
    '0:0',
    '0:1',
    '0:2',
    '0:3'
]

const DDUUDU = [
    '0:0',
    '0:1',
    '0:1:2',
    '0:2:2',
    '0:3:0',
    '0:3:2'
]

const DDDDU = [
    '0:0',
    '0:1',
    '0:2',
    '0:3',
    '0:3:2',
]


export const CHORD_PATTERNS = {
    DDDD,
    DDUUDU,
    DDDDU,
}