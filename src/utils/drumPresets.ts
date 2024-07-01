export type DrumLoop = Array<{
    time: string,
    pitch: string[],
    velocity: number
}>

const bootsAndCats: DrumLoop = [
    { time: '0:0', pitch: ['C1', 'F#1'], velocity: .8 },
    { time: '0:0:2', pitch: ['F#1'], velocity: .3 },
    { time: '0:1', pitch: ['D1', 'F#1'], velocity: .4 },
    { time: '0:1:2', pitch: ['F#1'], velocity: .3 },
    { time: '0:2', pitch: ['C1', 'F#1'], velocity: .6 },
    { time: '0:2:2', pitch: ['F#1'], velocity: .3 },
    { time: '0:3', pitch: ['D1', 'F#1'], velocity: .4 },
    { time: '0:3:2', pitch: ['F#1'], velocity: .3 },
]

const hipHop: DrumLoop = [
    { time: '0:0', pitch: ['B0', 'F#1'], velocity: .8 },
    { time: '0:0:2', pitch: ['B0', 'F#1'], velocity: .5 },
    { time: '0:1', pitch: ['D1', 'F#1'], velocity: .6 },
    { time: '0:1:2', pitch: ['B0', 'F#1'], velocity: .4 },
    { time: '0:1:3', pitch: ['B0'], velocity: .5 },
    { time: '0:2', pitch: ['F#1'], velocity: .6 },
    { time: '0:2:2', pitch: ['F#1'], velocity: .3 },
    { time: '0:3', pitch: ['D1', 'F#1'], velocity: .4 },
    { time: '0:3:2', pitch: ['B0', 'F#1'], velocity: .3 },
]

const funk: DrumLoop = [
    { time: '0:0', pitch: ['B0', 'F#1'], velocity: .8 },
    { time: '0:0:1', pitch: ['F#1'], velocity: .3 },
    { time: '0:0:2', pitch: ['B0', 'F#1'], velocity: .4 },
    { time: '0:0:3', pitch: ['F#1'], velocity: .3 },
    { time: '0:1', pitch: ['D1', 'F#1'], velocity: .5 },
    { time: '0:1:1', pitch: ['F#1'], velocity: .3 },
    { time: '0:1:2', pitch: ['B0', 'F#1'], velocity: .4 },
    { time: '0:1:3', pitch: ['D1', 'Bb1'], velocity: .3 },
    { time: '0:2', pitch: ['F#1'], velocity: .7 },
    { time: '0:2:1', pitch: ['D1', 'F#1'], velocity: .3 },
    { time: '0:2:2', pitch: ['B0', 'F#1'], velocity: .4 },
    { time: '0:2:3', pitch: ['D1', 'F#1'], velocity: .3 },
    { time: '0:3', pitch: ['D1', 'F#1'], velocity: .5 },
    { time: '0:3:1', pitch: ['B0', 'F#1'], velocity: .3 },
    { time: '0:3:2', pitch: ['F#1'], velocity: .4 },
    { time: '0:3:3', pitch: ['D1', 'F#1'], velocity: .3 },
]

const rock: DrumLoop = [
    { time: '0:0', pitch: ['C1', 'F#1'], velocity: .8 },
    { time: '0:0:2', pitch: ['F#1'], velocity: .3 },
    { time: '0:1', pitch: ['D1', 'F#1'], velocity: .4 },
    { time: '0:1:2', pitch: ['F#1'], velocity: .3 },
    { time: '0:1:3', pitch: ['C1'], velocity: .3 },
    { time: '0:2', pitch: ['C1', 'F#1'], velocity: .6 },
    { time: '0:2:2', pitch: ['C1', 'F#1'], velocity: .3 },
    { time: '0:3', pitch: ['D1', 'F#1'], velocity: .4 },
    { time: '0:3:2', pitch: ['F#1'], velocity: .3 },
]


export const DRUM_PRESETS = {
    BOOTS_AND_CATS: bootsAndCats,
    HIP_HOP: hipHop,
    FUNK: funk,
    ROCK: rock,
}