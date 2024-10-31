import { useState, useEffect } from "react"
import styles from "./Timer.module.css"

interface TimerProps{title:string, endTime:number, elapsedTime?:number}

const Timer = ({title, endTime, elapsedTime}: TimerProps)=>{

    const difference = elapsedTime!=null ? endTime-elapsedTime : endTime
    
    const [timeLeft, setTimeLeft] = useState<number>(difference)
    const [elapsed, setElapsed] = useState<number>(elapsedTime!=null?elapsedTime:0)
    const [isStarted, setIsStarted] = useState<boolean>(false)

    const elapsedTimeMinutes = Math.floor(elapsed/60).toString().padStart(2, "0")
    const elapsedTimeSeconds = (elapsed%60).toString().padStart(2, "0")
    const minutesLeft = Math.floor(timeLeft/60).toString().padStart(2, "0")
    const secondsLeft = (timeLeft%60).toString().padStart(2, "0")

    useEffect(()=>{
        let interval:NodeJS.Timeout
        if(isStarted && timeLeft>0){
            interval = setInterval(()=>{
                setTimeLeft((time)=>{
                    if(time<=1){
                        clearInterval(interval);
                        setIsStarted(false);
                        return 0;
                    }
                    return time-1
                })
                setElapsed((time)=>time+1)
            }, 1000)
        }
        else if(timeLeft==0){
            setIsStarted(false)
        }
        return ()=>clearInterval(interval)
    }, [isStarted])

    function startHandle(){
        setIsStarted(true)
    }
    function resetHandle(){
        setIsStarted(false)
        setTimeLeft(endTime)
        setElapsed(0)
    }
    function pauseHandle(){
        setIsStarted(false)
    }

    return <div className={styles.timer}>
        <circle cx="125" cy="125" r="80" fill="#67cb88">
            <circle cx="125" cy="125" r="75">
                <div>
                    <p className={styles.subtext}>{title}</p>
                    <p className={styles.maintext}>{elapsedTimeMinutes}:{elapsedTimeSeconds}</p>
                    <p className={styles.subtext}>{minutesLeft}:{secondsLeft}</p>
                </div>
            </circle>
        </circle>
        <button onClick={startHandle} className={styles.button}>Start</button>
        <button onClick={pauseHandle} className={styles.button}>Pause</button>
        <button onClick={resetHandle} className={styles.button}>Reset</button>
    </div>
}
export default Timer