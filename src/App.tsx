import React, { useEffect } from 'react';
import BassDrumUrl from './assets/sounds/Boom-Bap-Kick.wav'
import CymbalUrl from './assets/sounds/drum_cymbal_hard.flac'
import SnareDrumUrl from './assets/sounds/drum_snare_hard.flac'
import ClosedHiHatUrl from './assets/sounds/drum_cymbal_closed.flac'
import OpenHiHatUrl from './assets/sounds/drum_cymbal_open.flac'
import PedalHiHatUrl from './assets/sounds/Boom-Bap-Pedal-Hat.wav'

import './App.css'

import { DEFAULT_SCALE_OPTIONS, scaleToTriads } from './utils/chords';
import { Part, PolySynth, Sampler, Synth } from 'tone';
import { CHORD_TO_INDEX, ChordSymbol } from './utils/basicChords';
import _ from 'lodash';
import { SingleChord } from './components/SingleChord';
import { Octopus } from './components/Octopus';
import { DRUM_PRESETS, DRUM_PRESETS_LOOPS, DrumEvent, DrumPreset } from './utils/drumPresets';
import { RhythmSelector } from './components/RhythmSelector';
import { fillDrumPreset } from './utils/rhythms';

// import '@shoelace-style/shoelace/dist/themes/light.css';
// import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

// setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/');

const updateChordPart = (part: ChordPart, i: number, chordNumeral: ChordSymbol) => {
  part.clear()
  const triads = scaleToTriads(DEFAULT_SCALE_OPTIONS)
  const chord = triads[CHORD_TO_INDEX[chordNumeral]]?.notes || ['C4']
  const newValue: [string, string[]][] = [
    [`${i}:0`, chord],
    [`${i}:1`, chord],
    [`${i}:2`, chord],
    [`${i}:3`, chord],
    [`${i}:3:2`, chord]
  ]
  newValue.forEach((v) => {
    const [time, chord] = v
    part.at(time, chord)
  })
}

const updateRhythmPart = (part: DrumPart, drumPreset: DrumPreset) => {
  const newValue = fillDrumPreset(drumPreset)
  console.log(newValue)
  newValue.forEach((v) => {
    const { time } = v
    part.at(time, v)
  })
}

type ChordPart = Part<[string, string[]]>

type ChordParts = Array<{
  part: ChordPart
  chord: ChordSymbol
}>

type DrumPart = Part<DrumEvent>

const INITIAL_CHORD_LIST: ChordSymbol[] = ['I', 'I', 'I', 'I']


function App() {
  const [isStarted, setIsStarted] = React.useState(false)

  const chordSynth = React.useRef<PolySynth | null>(null)
  const [chordList, setChordList] = React.useState<ChordSymbol[]>(INITIAL_CHORD_LIST)
  const chordPartRefs = React.useRef<ChordParts | null>(null)

  const drumSampler = React.useRef<Sampler | null>(null)
  const [drumPreset, setDrumPreset] = React.useState<DrumPreset>(DRUM_PRESETS.BOOTS_AND_CATS)
  const drumPartRef = React.useRef<Part | null>(null)

  useEffect(() => {
    if (isStarted) {
      drumSampler.current = new Sampler({
        'B0': BassDrumUrl,
        'C1': BassDrumUrl,
        // 'C1': BassDrumUrl,
        'D1': SnareDrumUrl,
        'Ab1': PedalHiHatUrl,
        'F#1': ClosedHiHatUrl,
        'Bb1': OpenHiHatUrl,
        'C#2': CymbalUrl
      },
        {
          onload: () => {
            console.log('loaded')
          },
        }
      ).toDestination()

      const drumPart = new Part<DrumEvent>((time, value) => {
        drumSampler.current?.triggerAttackRelease(value.notes, 1, time, value.velocity)
      },
        DRUM_PRESETS_LOOPS.BOOTS_AND_CATS
      ).start('0:0')
      drumPart.loop = true;
      drumPart.loopStart = '0:0'
      drumPart.loopEnd = '1m'
      drumPartRef.current = drumPart
    }
  }, [isStarted])


  useEffect(() => {
    if (isStarted) {
      chordSynth.current = new PolySynth(Synth).toDestination()
      if (chordPartRefs.current == null) {
        const initialTriads = scaleToTriads(DEFAULT_SCALE_OPTIONS)
        // chordPartRefs.current = []
        _.times(4, (i) => {
          if (chordPartRefs.current == null) {
            chordPartRefs.current = []
          }

          const initialRomanNumeral = INITIAL_CHORD_LIST[i]

          const initialChord = initialTriads[CHORD_TO_INDEX[initialRomanNumeral]]?.notes || ['C5']

          const initialPartValue: [string, string[]][] = [
            [`${i}:0`, initialChord],
            [`${i}:1`, initialChord],
            [`${i}:2`, initialChord],
            [`${i}:3`, initialChord],
            [`${i}:3:2`, initialChord],
          ]

          const part = new Part((time, pitch) => {
            chordSynth.current?.triggerAttackRelease(pitch || ['C4'], '8n', time)
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
  }, [isStarted])

  useEffect(() => {
    chordList.forEach((c, i) => {
      if (chordPartRefs.current && chordPartRefs.current[i].chord !== c) {
        updateChordPart(chordPartRefs.current[i].part, i, c)
        chordPartRefs.current[i].chord = c
      }
    })
  }, [chordList])

  useEffect(() => {
    console.log(drumPreset)
    if (isStarted && drumPartRef.current) {
      updateRhythmPart(drumPartRef.current, drumPreset)
    }
  }, [drumPreset, isStarted])

  const getUpdateChordInListFunction = (i: number) => {
    return (c: ChordSymbol) => {
      setChordList((prevList) => {
        const newList = [...prevList]
        newList[i] = c
        return newList
      })
    }
  }

  return (
    <>
      <header className='app-header'>
        <h1>OctoLooper</h1>
        <RhythmSelector setSelectedRhythm={setDrumPreset} selectedRhythm={drumPreset} />
      </header>
      <main className="main">
        <div className='top'>
          <SingleChord chordSymbol={chordList[0]} setChord={getUpdateChordInListFunction(0)} />
        </div>
        <div className='middle'>
          <SingleChord chordSymbol={chordList[3]} setChord={getUpdateChordInListFunction(3)} />

          <div className="octo">

            <Octopus isStarted={isStarted} setIsStarted={setIsStarted} />


          </div>
          <SingleChord chordSymbol={chordList[1]} setChord={getUpdateChordInListFunction(1)} />

        </div>
        <div>
          <SingleChord chordSymbol={chordList[2]} setChord={getUpdateChordInListFunction(2)} />

        </div>

      </main >
    </>
  )
}

export default App
