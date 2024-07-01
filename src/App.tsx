import React, { useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { DEFAULT_SCALE_OPTIONS, scaleToTriads } from './utils/chords';
import { Part, PolySynth, Synth } from 'tone';
import { CHORD_TO_INDEX, ChordSymbol } from './utils/basicChords';
import _ from 'lodash';
import { SingleChord } from './components/SingleChord';
import { Octopus } from './components/Octopus';

// import '@shoelace-style/shoelace/dist/themes/light.css';
// import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

// setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/');

const updatePart = (part: Part, i: number, chordNumeral: ChordSymbol) => {
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

type ChordParts = Array<{
  part: Part<[string, string[]]>
  chord: ChordSymbol
}>

const INITIAL_CHORD_LIST: ChordSymbol[] = ['I', 'IV', 'vi', 'V']


function App() {
  const [isStarted, setIsStarted] = React.useState(false)

  const chordSynth = React.useRef<PolySynth | null>(null)
  const [chordList, setChordList] = React.useState<ChordSymbol[]>(INITIAL_CHORD_LIST)
  const chordPartRefs = React.useRef<ChordParts | null>(null)

  // const partRefs = React.useRef<Part<[string, string[]]>[] | null>(null)

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
          part.loopStart = '0'
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
        updatePart(chordPartRefs.current[i].part, i, c)
        chordPartRefs.current[i].chord = c
      }
    })
  }, [chordList])

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
      <header>
        <h1>OctoLooper</h1>
      </header>
      <main className="main">
        <div className='top'>
          <SingleChord chordSymbol={chordList[0]} setChord={getUpdateChordInListFunction(0)} />
        </div>
        <div className='middle'>
          <SingleChord chordSymbol={chordList[3]} setChord={getUpdateChordInListFunction(3)} />

          <div className="octo">
            {/* <SlAnimation
              easing='linear'
              play={isPlaying}
              duration={loopInSeconds * 1000}
              keyframes={[
                {
                  offset: 0,
                  transformOrigin: 'center center',
                  transform: 'rotate(0)'
                },
                {
                  offset: 0.25,
                  transformOrigin: 'center center',
                  transform: 'rotate(90deg)'
                },
                {
                  offset: 0.5,
                  transformOrigin: 'center center',
                  transform: 'rotate(180deg)'
                },
                {
                  offset: 0.75,
                  transformOrigin: 'center center',
                  transform: 'rotate(270deg)'
                }, {
                  offset: 1,
                  transformOrigin: 'center center',
                  transform: 'rotate(360deg)'
                },
              ]}
            > */}
            <Octopus isStarted={isStarted} setIsStarted={setIsStarted} />
            {/* </SlAnimation> */}


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
