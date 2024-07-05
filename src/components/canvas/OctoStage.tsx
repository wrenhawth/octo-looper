import { Container, Stage } from '@pixi/react';
// import '@pixi/events';

import { HEIGHT, WIDTH } from './constants';
import { Octo } from './Octo';
import { Chords } from './Chords';



export const OctoStage = () => {

    return (
        <Stage
            width={WIDTH}
            height={HEIGHT}
            options={{ background: 'hsla(220, 100%, 30%, .9)' }}
        >
            <Container>
                <Octo />
                <Chords totalChords={6} />
            </Container>
        </Stage>
    )
}
