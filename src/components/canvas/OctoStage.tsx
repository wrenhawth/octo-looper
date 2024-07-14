import { Container, Stage } from '@pixi/react';
// import '@pixi/events';

// import { HEIGHT, WIDTH } from './constants';
import { Octo } from './Octo';
import { Chords } from './Chords';
import { ChordSymbol } from '../../utils/basicChords';
import { useCanvasWidth } from './utils';
import { PlayPause } from './PlayPause';

type OctoStageProps = {
    chordList: ChordSymbol[]
    setChordList: React.Dispatch<React.SetStateAction<ChordSymbol[]>>

    useSeventh: boolean[]
    setUseSeventh: React.Dispatch<React.SetStateAction<boolean[]>>
}
export const OctoStage = ({ chordList, setChordList, useSeventh, setUseSeventh }: OctoStageProps) => {
    // const scale = window.innerHeight < 900 ? 0.75 : 1;
    // const width = Math.min(window.innerHeight, 500)
    const width = useCanvasWidth()
    return (
        <Stage
            width={width}
            height={width}
            options={{ background: 'transparent', backgroundAlpha: 0, width, height: width }}
        >
            <Container sortableChildren>
                {/* <Container anchor={0.5} x={(WIDTH * scale) / 2} y={(HEIGHT * scale) / 2}> */}
                <Octo />
                <PlayPause />
                <Chords chordList={chordList} setChordList={setChordList} useSeventh={useSeventh} setUseSeventh={setUseSeventh} />
                {/* </Container> */}

            </Container>
        </Stage>
    )
}
