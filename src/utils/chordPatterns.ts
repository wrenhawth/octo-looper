import { Time } from "tone"
import { PatternGenerator, PatternName } from "tone/build/esm/event/PatternGenerator"

export type ChordEvent = {
    time: string,
    duration: string,
    notes: string[],
    velocity: number
}

export const generateChordProgression = (chords: string[][], chordPattern: ChordPattern): ChordEvent[] => {
    return chords.map((notes, index) => fillChordPattern(index, notes, chordPattern)).flat()
}

export const fillChordPattern = (
    bar: number,
    chord: string[],
    chordPattern: ChordPattern,
    patternName: PatternName | 'none' = 'none'
): ChordEvent[] => {
    const timeEvents = CHORD_PATTERNS[chordPattern]
    const duration = chordPattern === 'SIXTEENTH_NOTES' ? '32n' : '8n'
    const patternTimes = [...timeEvents]
    const filledPattern: ChordEvent[] = []

    let currentTime = patternTimes.shift()
    const generator = patternName !== 'none' ? PatternGenerator(chord.length, patternName) : null
    for (let q = 0; q < 4; q += 1) {
        for (let s = 0; s < 4; s += 1) {

            if (currentTime && `${0}:${q}:${s}` === Time(currentTime).toBarsBeatsSixteenths()) {
                const notes = generator ? [chord[generator.next().value]] : chord

                filledPattern.push({
                    time: `${bar}:${q}:${s}`,
                    duration,
                    notes,
                    velocity: .7
                })
                currentTime = patternTimes.shift()
            } else {
                filledPattern.push({
                    time: `${bar}:${q}:${s}`,
                    duration,
                    notes: [],
                    velocity: 0
                })
            }
        }
    }
    return filledPattern

}

export type ChordPattern =
    // 'DDDD' |
    'DDUUDU' |
    // 'DDDDU' |
    'DUDUDUDU' |
    'SIXTEENTH_NOTES'

export const CHORD_PATTERNS_LIST = [
    // 'DDDD',
    'DDUUDU',
    // 'DDDDU',
    'DUDUDUDU',
    'SIXTEENTH_NOTES'
] as const

export const CHORD_PATTERN_LABELS = {
    // DDDD: 'xoxoxoxo',
    DDUUDU: 'xoxxoxxx',
    DDDDU: 'xoxoxoxx',
    DUDUDUDU: 'xxxxxxxx',
    SIXTEENTH_NOTES: '🐇'
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

// const DDDDU = [
//     '0:0',
//     '0:1',
//     '0:2',
//     '0:3',
//     '0:3:2',
// ]

const DUDUDUDU = [
    '0:0',
    '0:0:2',
    '0:1',
    '0:1:2',
    '0:2:0',
    '0:2:2',
    '0:3:0',
    '0:3:2'
]

const SIXTEENTH_NOTES = [
    '0:0',
    '0:0:1',
    '0:0:2',
    '0:0:3',
    '0:1',
    '0:1:1',
    '0:1:2',
    '0:1:3',
    '0:2:0',
    '0:2:1',
    '0:2:2',
    '0:2:3',
    '0:3:0',
    '0:3:1',
    '0:3:2',
    '0:3:3',
]

export const CHORD_PATTERNS = {
    DDDD,
    DDUUDU,
    // DDDDU,
    DUDUDUDU,
    SIXTEENTH_NOTES
}

export const ARP_PATTERNS_LIST = [
    "none",
    "up",
    "downUp",
    // "alternateDown",
    "random",
    "randomWalk"
] as const

export const ARP_PATTERN_LABELS = {
    "none": 'All At Once',
    "up": 'Going Up',
    "downUp": "Going Down & Up",
    // "alternateDown": 'Down',
    "random": 'Randomly',
    "randomWalk": 'Walk Around'
}

export type ArpPattern =
    "none" |
    "up" |
    "downUp" |
    // "alternateDown" |
    "random" |
    "randomWalk"
