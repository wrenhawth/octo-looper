import { Part, PolySynth } from "tone"
import { ChordEvent, ChordPattern, fillChordPattern } from "../utils/chordPatterns"
import { CHORD_TO_INDEX, ChordSymbol, INITIAL_CHORD_LIST } from "../utils/basicChords"
import React from "react"
import { DEFAULT_SCALE_OPTIONS, scaleToTriads } from "../utils/chords"
import _ from "lodash"

type ChordPart = Part<ChordEvent>
type ChordParts = Array<{
    part: ChordPart
    chord: ChordSymbol
}>


const updateChordPart = (part: ChordPart, i: number, chordNumeral: ChordSymbol, chordPattern: ChordPattern) => {
    part.clear()
    const triads = scaleToTriads(DEFAULT_SCALE_OPTIONS)
    const chord = triads[CHORD_TO_INDEX[chordNumeral]]?.notes || ['C4']
    const newValue = fillChordPattern(i, chord, chordPattern)
    newValue.forEach((v) => {
        part.at(v.time, v)
    })
}

type ChordPartOptions = {
    chordList: ChordSymbol[]
    chordPattern: ChordPattern
    chordSynth: React.MutableRefObject<PolySynth | null>
    isStarted: boolean
    playChords: boolean
}

export const useChordPart = (options: ChordPartOptions) => {
    const { chordList, chordPattern, chordSynth, isStarted, playChords } = options
    const chordPartRefs = React.useRef<ChordParts | null>(null)


    React.useEffect(() => {
        if (isStarted && playChords) {
            if (chordPartRefs.current == null) {
                const initialTriads = scaleToTriads(DEFAULT_SCALE_OPTIONS)
                _.times(4, (i) => {
                    if (chordPartRefs.current == null) {
                        chordPartRefs.current = []
                    }

                    const initialRomanNumeral = INITIAL_CHORD_LIST[i]

                    const initialChord = initialTriads[CHORD_TO_INDEX[initialRomanNumeral]]?.notes || ['C5']

                    const initialPartValue = fillChordPattern(i, initialChord, 'DDDD')

                    const part = new Part((time, value) => {
                        chordSynth.current?.triggerAttackRelease(value.notes || ['C4'], '8n', time, value.velocity)
                    },
                        initialPartValue
                    ).start(0)

                    part.loop = true
                    part.humanize = true
                    part.loopStart = '0:0'
                    part.loopEnd = '4m'
                    chordPartRefs.current.push({
                        part,
                        chord: initialRomanNumeral
                    })
                })
            }
        }
    }, [chordSynth, playChords, isStarted])


    React.useEffect(() => {
        chordList.forEach((c, i) => {
            if (chordPartRefs.current) { // && chordPartRefs.current[i].chord !== c) {
                updateChordPart(chordPartRefs.current[i].part, i, c, chordPattern)
                chordPartRefs.current[i].chord = c
                return
            }
        })
    }, [chordList, chordPattern])
}