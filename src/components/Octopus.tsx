import React, { SetStateAction, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import {  Time, getContext, getDraw, getTransport } from "tone";
import { PlayButton } from "./PlayButton";
gsap.registerPlugin(useGSAP);

type Props = {
    // isPlaying: boolean;
    isStarted: boolean;
    // setIsPlaying: React.Dispatch<SetStateAction<boolean>>
    setIsStarted: React.Dispatch<SetStateAction<boolean>>
}

export const Octopus = (props: Props) => {
    const { isStarted, setIsStarted } = props
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [lengthOfLoop, setLengthOfLoop] = React.useState<number | null>(null)
    const tl = useRef<ReturnType<typeof gsap.timeline> | null>(null);
    const container = useRef(null);


    const { contextSafe } = useGSAP(() => {
        tl.current = gsap.timeline().fromTo(
            '.octopus',
            { rotation: 0 },
            {
                rotation: 360,
                duration: lengthOfLoop ?? 4,
                ease: 'linear',
                delay: 1.5,
                repeat: -1,
                paused: !isStarted,
            },
        )
    },
        { scope: container, dependencies: [lengthOfLoop, isStarted] },
    );


    return (
        <div>


            <div ref={container}>
                <div className="octopus">
                    <div className='arrow'>⬆</div>
                    <div className="octo">🐙</div>
                    <div className="arrow hidden">⬆</div>
                </div>
            </div>
            <PlayButton isPlaying={isPlaying} onClick={async () => {
                if (isStarted) {
                    // await getContext().resume()
                    if (isPlaying) {
                        setIsPlaying(false)
                        getTransport().pause()
                        contextSafe(() => tl.current?.pause())()
                    } else {
                        setIsPlaying(true)
                        getTransport().toggle()
                    }
                } else {
                    setIsStarted(true)
                    // partRefs.current?.forEach((part) => {
                    //   part.start('0')
                    // })
                    // setContext(new Context({ lookAhead: 0 }))
                    getTransport().start("+0.1")
                    setIsPlaying(true)
                    setLengthOfLoop(Time('4m').toSeconds())

                    getTransport().loop = true
                    getTransport().loopStart = 0
                    getTransport().loopEnd = '4m'
                    await getContext().resume()
                    getTransport().scheduleRepeat((time) => {
                        getDraw().schedule(() => {
                            // const progress = ((Time(time).toSeconds()) / Time('4m').toSeconds())
                            // const progressPercentage = progress - Math.floor(progress)
                            contextSafe(() => {
                                const tween = tl.current?.getTweensOf('.octopus')[0]
                                tween?.pause()
                                tween?.time(0)
                                tween?.invalidate()
                                tween?.play()
                            })()
                        }, time)
                    }, '4m', '0:0')
                }

            }
            } />
        </div>
    )

}