import './App.css'

import { WorkflowProvider } from './components/WorkflowContext';
import { AllSteps } from './components/AllSteps';


function App() {



  // const getUpdateChordInListFunction = (i: number) => {
  //   return (c: ChordSymbol) => {
  //     setChordList((prevList) => {
  //       const newList = [...prevList]
  //       newList[i] = c
  //       return newList
  //     })
  //   }
  // }

  return (
    <WorkflowProvider>
      <header className='app-header'>
        <h1 style={{ margin: 0 }}>OctoLooper</h1>
      </header>


      {/* <main className="main"> */}
        <AllSteps />
        {/* <div className='top'>
          <h3 style={{ margin: 0 }}>
            <span className='curve-arrow'> ⤹ </span> Mix It Up <span className='curve-arrow'> ⤸ </span>

          </h3>

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
          <ChordPatternSelector setSelectedPattern={setChordPattern} selectedPattern={chordPattern} />

        </div>
*/}
      {/* </main > */}
    </WorkflowProvider>
  )
}

export default App
