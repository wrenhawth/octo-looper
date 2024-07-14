import { getTransport, Part, PolySynth } from "tone"
import { ArpPattern, ChordEvent, ChordPattern, fillChordPattern } from "../utils/chordPatterns"
import { CHORD_TO_INDEX, ChordSymbol, INITIAL_CHORD_LIST } from "../utils/basicChords"
import React from "react"
import { DEFAULT_SCALE_OPTIONS, scaleToSevenths, scaleToTriads } from "../utils/chords"
import _ from "lodash"

type ChordPart = Part<ChordEvent>
type ChordParts = Array<{
    part: ChordPart
    chord: ChordSymbol
}>


const updateChordPart = (part: ChordPart, i: number, chordNumeral: ChordSymbol, chordPattern: ChordPattern, arpPattern: ArpPattern, useSeventh: boolean) => {
    part.clear()
    const triads = scaleToTriads(DEFAULT_SCALE_OPTIONS)
    const seventhChords = scaleToSevenths(DEFAULT_SCALE_OPTIONS)
    const chord = useSeventh ?
        seventhChords[CHORD_TO_INDEX[chordNumeral]]?.notes || ['C4'] :
        triads[CHORD_TO_INDEX[chordNumeral]]?.notes || ['C4']
    const newValue = fillChordPattern(i, chord, chordPattern, arpPattern || undefined)
    newValue.forEach((v) => {
        part.at(v.time, v)
    })
}

type ChordPartOptions = {
    chordList: ChordSymbol[]
    useSeventh: boolean[]
    chordPattern: ChordPattern
    arpPattern: ArpPattern
    chordSynth: React.MutableRefObject<PolySynth | null>
    isStarted: boolean
    playChords: boolean
}

export const useChordPart = (options: ChordPartOptions) => {
    const { chordList, chordPattern, arpPattern, chordSynth, isStarted, playChords, useSeventh } = options
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

                    const initialPartValue = fillChordPattern(i, initialChord, 'DDUUDU', arpPattern)

                    const part = new Part((time, value) => {
                        chordSynth.current?.triggerAttackRelease(value.notes || ['C4'], value.duration || '8n', time, value.velocity)
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
    }, [chordSynth, playChords, isStarted, arpPattern])


    React.useEffect(() => {
        const l = chordList.length
        const transport = getTransport()
        transport.loopEnd = `${l}m`
        chordPartRefs.current?.forEach(({ part }, i) => {
            part.loopEnd = `${l}m`
            if (i >= l) {
                part.clear()
            }
        })
    }, [chordList.length])

    React.useEffect(() => {
        const l = chordList.length
        chordList.forEach((c, i) => {
            if (chordPartRefs.current) {
                if (chordPartRefs.current[i] == undefined) {
                    const initialTriads = scaleToTriads(DEFAULT_SCALE_OPTIONS)

                    const initialChord = initialTriads[CHORD_TO_INDEX[c]]?.notes || ['C5']

                    const initialPartValue = fillChordPattern(i, initialChord, 'DDUUDU')
                    const part = new Part((time, value) => {
                        chordSynth.current?.triggerAttackRelease(value.notes || ['C4'], value.duration || '8n', time, value.velocity)
                    },
                        initialPartValue
                    ).start(0)

                    part.loop = true
                    part.humanize = true
                    part.loopStart = '0:0'
                    part.loopEnd = `${l}m`
                    chordPartRefs.current[i] = ({
                        part,
                        chord: c
                    })
                    part.start(0)
                }

                updateChordPart(chordPartRefs.current[i].part, i, c, chordPattern, arpPattern, useSeventh[i])
                chordPartRefs.current[i].chord = c
                return
            }
        })
    }, [chordSynth, chordList, chordPattern, arpPattern, useSeventh])
}