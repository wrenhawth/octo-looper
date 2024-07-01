import { Chord, Mode, Scale } from "tonal";

const DEFAULT_TONIC = "C"
const DEFAULT_MODE = "major"
const DEFAULT_OCTAVE = 4

type Scale = {
    tonic: string,
    mode: string,
    octave: number
}

export const DEFAULT_SCALE_OPTIONS: Scale = {
    tonic: DEFAULT_TONIC,
    mode: DEFAULT_MODE,
    octave: DEFAULT_OCTAVE
}

type ChordWithOctaves = {
    chordName: string
    tonicNote: string
    notes: string[]
}

const findChordThatStartsWithNote = (chordList: string[], note: string): string | null => {
    const noteName = Number.isNaN(note.at(1)) ? note.substring(0, 2) : note.substring(0, 1)
    for (const chord of chordList) {
        if (chord.startsWith(noteName)) {
            return chord
        }
    }
    return null
}

export const scaleToTriads = (scaleOptions?: Partial<Scale>) => {
    const scale = {
        ...DEFAULT_SCALE_OPTIONS,
        ...scaleOptions
    }
    const scaleName = toScaleName(scale)
    const triadNames = getTriadsForKey(scale)
    const scaleNotes = Scale.rangeOf(scaleName)(`${scale.tonic}${scale.octave}`, `${scale.tonic}${scale.octave + 1}`)
    const chordMap = scaleNotes.map(
        (note) => {
            if (note !== undefined) {
                const chordName = findChordThatStartsWithNote(triadNames, note)
                if (chordName != null) {
                    const notes = Chord.notes(chordName, note)
                    return {
                        chordName,
                        tonicNote: note,
                        notes
                    }
                }
            }
        },
        new Map<string, ChordWithOctaves>()
    )
    return chordMap
}

const toScaleName = (scale: Scale) => {
    const { tonic, mode, octave } = scale
    return `${tonic}${octave} ${mode}`
}
// const getScaleDegrees = (scale: Scale) => {
//     return Scale.degrees(toScaleName(tonic, mode, octave))
// }

export const getTriadsForKey = (scale: Scale) => {
    const { mode, tonic } = scale
    return Mode.triads(mode, tonic)
}

// export const scaleToNotes = (tonic = DEFAULT_TONIC, mode = DEFAULT_MODE, tonicOctave = 4) => {
//     return Scale.rangeOf(toScaleName(tonic, mode, tonicOctave))(`${tonic}${tonicOctave}`, `${tonic}${tonicOctave + 1}`)
// }

// export const chordToNotes = (chord: ChordWithTonic) => {
//     return Chord.notes(chord.chordName, chord.tonicNote)
// }

// export const getTriadNotesForKey = (tonic = DEFAULT_TONIC, mode = DEFAULT_MODE, octave = 4) => {
//     const triads = Mode.triads(mode, tonic)
//     const scaleDegrees = getScaleDegrees(tonic, mode, octave)

//     return triads.map((chordName, index) => {
//         console.log(chordName)
//         return Chord.notes(chordName, scaleDegrees(index + 1))
//     })
// }

// export const getSeventhChordNotesForKey = (tonic = DEFAULT_TONIC, mode = DEFAULT_MODE, octave = 4) => {
//     const triads = Mode.seventhChords(mode, tonic)
//     const scaleDegrees = getScaleDegrees(tonic, mode, octave)

//     return triads.map((chordName, index) => {
//         console.log(chordName)
//         return Chord.notes(chordName, scaleDegrees(index + 1))
//     })
// }