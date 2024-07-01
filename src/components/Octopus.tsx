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

    // useEffect(() => {
    //     if (isStarted) {
    //         getTransport().scheduleRepeat((time) => {
    //             getDraw().schedule(() => {
    //                 const progress = ((Time(time).toSeconds()) / Time('4m').toSeconds())
    //                 const progressPercentage = progress - Math.floor(progress)
    //                 contextSafe(() => {
    //                     console.log(tl.current?.getTweensOf('.octopus')[0])
    //                     console.log(tl.current?.getChildren()[0])

    //                     tl.current?.getChildren()[0].progress(progressPercentage)
    //                 })
    //             }, 1)
    //         }, '16n')
    //     }

    //     // rotationLoop.current?.start(0)
    // }, [contextSafe, isStarted])


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
                        contextSafe(() => {
                            // tl.current?.progress(currentTime.current)
                            tl.current?.resume()
                        })()
                    }
                } else {
                    setIsStarted(true)
                    // partRefs.current?.forEach((part) => {
                    //   part.start('0')
                    // })
                    // setContext(new Context({ lookAhead: 0 }))
                    getTransport().start(1)
                    setIsPlaying(true)
                    setLengthOfLoop(Time('4m').toSeconds())


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