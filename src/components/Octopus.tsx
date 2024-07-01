import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Context, Loop, Time, getContext, getDraw, getTransport, setContext } from "tone";
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

    const [loopInMilliSeconds, setLoopInMilliSeconds] = React.useState(10)


    useEffect(() => {
        getTransport().scheduleRepeat((time) => {
            getDraw().schedule(() => {
                const progress = ((Time(time).toSeconds()) / Time('4m').toSeconds())
                const progressPercentage = progress - Math.floor(progress)
                contextSafe(() => tl.current?.getChildren()[0].progress(progressPercentage))
            }, 1)
            // const lookAhead = getContext().lookAhead
            // const progress = ((Time(getTransport().now()).toSeconds()) / Time('4m').toSeconds())
            // const progressPercentage = progress - Math.floor(progress)
            // console.log(progressPercentage)
            // currentTime.current = progressPercentage
            // contextSafe(() => tl.current?.getChildren()[0].progress(progressPercentage))
            // getDraw().schedule(() => {
            //     console.log(Time(time).toTicks())

            // }, time)
        }, '4n')
        // rotationLoop.current?.start(0)
    })

    const { contextSafe } = useGSAP(() => {
        tl.current = gsap.timeline().fromTo('.octopus', { rotation: 0 }, { rotation: 360, duration: lengthOfLoop ?? 4, delay: .2, ease: 'linear', repeat: -1, paused: !isStarted })
        // gsap.to(".box", { rotation: "+=360", duration: 3 });

        // or refs...
        // gsap.to(circle.current, { rotation: "-=360", duration: 3 });
    },
        { scope: container, dependencies: [lengthOfLoop, isStarted] },
    );
    return (
        <div>


            <div ref={container}> <div className="octopus">🐙</div></div>
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

                    contextSafe(() => {
                        tl.current?.getChildren()[0].play(0)
                    })()
                    setLoopInMilliSeconds(Time('4m').toMilliseconds())
                    // await start()
                    await getContext().resume()
                }

            }
            } />
        </div>
    )

}