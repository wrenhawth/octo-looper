import { Container, Stage } from '@pixi/react';
// import '@pixi/events';

import { HEIGHT, WIDTH } from './constants';
import { Octo } from './Octo';
import { Chords } from './Chords';
import { ChordSymbol } from '../../utils/basicChords';

type OctoStageProps = {
    chordList: ChordSymbol[]
    setChordList: React.Dispatch<React.SetStateAction<ChordSymbol[]>>
}
export const OctoStage = ({chordList, setChordList}: OctoStageProps) => {

    return (
        <Stage
            width={WIDTH}
            height={HEIGHT}
            options={{ background: 'hsla(220, 100%, 30%, .9)' }}
        >
            <Container sortableChildren>
                <Octo /> 
                <Chords chordList={chordList} setChordList={setChordList} />
            </Container>
        </Stage>
    )
}
