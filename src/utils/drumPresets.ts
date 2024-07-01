export type DrumEvent = {
    time: string,
    notes: string[],
    velocity: number
}

export type DrumLoop = DrumEvent[]

const bootsAndCats: DrumLoop = [
    { time: '0:0', notes: ['C1', 'F#1'], velocity: .8 },
    { time: '0:0:2', notes: ['F#1'], velocity: .3 },
    { time: '0:1', notes: ['D1', 'F#1'], velocity: .4 },
    { time: '0:1:2', notes: ['F#1'], velocity: .3 },
    { time: '0:2', notes: ['C1', 'F#1'], velocity: .6 },
    { time: '0:2:2', notes: ['F#1'], velocity: .3 },
    { time: '0:3', notes: ['D1', 'F#1'], velocity: .4 },
    { time: '0:3:2', notes: ['F#1'], velocity: .3 },
]

const hipHop: DrumLoop = [
    { time: '0:0', notes: ['B0', 'F#1'], velocity: .8 },
    { time: '0:0:2', notes: ['B0', 'F#1'], velocity: .5 },
    { time: '0:1', notes: ['D1', 'F#1'], velocity: .6 },
    { time: '0:1:2', notes: ['B0', 'F#1'], velocity: .4 },
    { time: '0:1:3', notes: ['B0'], velocity: .5 },
    { time: '0:2', notes: ['F#1'], velocity: .6 },
    { time: '0:2:2', notes: ['F#1'], velocity: .3 },
    { time: '0:3', notes: ['D1', 'F#1'], velocity: .4 },
    { time: '0:3:2', notes: ['B0', 'F#1'], velocity: .3 },
]

const funk: DrumLoop = [
    { time: '0:0', notes: ['B0', 'F#1'], velocity: .8 },
    { time: '0:0:1', notes: ['F#1'], velocity: .3 },
    { time: '0:0:2', notes: ['B0', 'F#1'], velocity: .4 },
    { time: '0:0:3', notes: ['F#1'], velocity: .3 },
    { time: '0:1', notes: ['D1', 'F#1'], velocity: .5 },
    { time: '0:1:1', notes: ['F#1'], velocity: .3 },
    { time: '0:1:2', notes: ['B0', 'F#1'], velocity: .4 },
    { time: '0:1:3', notes: ['D1', 'Bb1'], velocity: .3 },
    { time: '0:2', notes: ['F#1'], velocity: .7 },
    { time: '0:2:1', notes: ['D1', 'F#1'], velocity: .3 },
    { time: '0:2:2', notes: ['B0', 'F#1'], velocity: .4 },
    { time: '0:2:3', notes: ['D1', 'F#1'], velocity: .3 },
    { time: '0:3', notes: ['D1', 'F#1'], velocity: .5 },
    { time: '0:3:1', notes: ['B0', 'F#1'], velocity: .3 },
    { time: '0:3:2', notes: ['F#1'], velocity: .4 },
    { time: '0:3:3', notes: ['D1', 'F#1'], velocity: .3 },
]

const rock: DrumLoop = [
    { time: '0:0', notes: ['C1', 'F#1'], velocity: .8 },
    { time: '0:0:2', notes: ['F#1'], velocity: .3 },
    { time: '0:1', notes: ['D1', 'F#1'], velocity: .4 },
    { time: '0:1:2', notes: ['F#1'], velocity: .3 },
    { time: '0:1:3', notes: ['C1'], velocity: .3 },
    { time: '0:2', notes: ['C1', 'F#1'], velocity: .6 },
    { time: '0:2:2', notes: ['C1', 'F#1'], velocity: .3 },
    { time: '0:3', notes: ['D1', 'F#1'], velocity: .4 },
    { time: '0:3:2', notes: ['F#1'], velocity: .3 },
]

export type DrumPreset = "BOOTS_AND_CATS" | "HIP_HOP" | "FUNK" | "ROCK"

export const enum DRUM_PRESETS {
    BOOTS_AND_CATS="BOOTS_AND_CATS",
    HIP_HOP="HIP_HOP",
    FUNK="FUNK",
    ROCK="ROCK"
}

export const DRUM_PRESET_LIST = [
    DRUM_PRESETS.BOOTS_AND_CATS,
    DRUM_PRESETS.HIP_HOP,
    DRUM_PRESETS.FUNK,
    DRUM_PRESETS.ROCK,
]

export const DRUM_LABELS = {
    BOOTS_AND_CATS: "🥾🥾Boots and Cats😸🐱",
    HIP_HOP: "🎤👑Hip Hop🐸🐸",
    FUNK: "🪩💃🏾Funk 🕺🏾🥁",
    ROCK: "🧑🏽‍🎤🎸Rock🪨👩🏻‍🎤"
} as const

export const DRUM_PRESETS_LOOPS = {
    BOOTS_AND_CATS: bootsAndCats,
    HIP_HOP: hipHop,
    FUNK: funk,
    ROCK: rock,
}