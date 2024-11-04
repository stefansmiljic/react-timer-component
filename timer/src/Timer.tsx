import { useState, useEffect } from "react"
import styles from "./Timer.module.css"
import { time } from "console"

interface TimerProps{title:string, endTime:number, elapsedTime?:number}

const Timer = ({title, endTime, elapsedTime}: TimerProps)=>{

    if(endTime>3599){
        throw new Error("Maximum allowed time is 1 hour.")
    }
    if(elapsedTime && elapsedTime>endTime){ throw new Error("Elapsed time must be shorter than end time!")}
    const difference = elapsedTime!=null ? endTime-elapsedTime : endTime
    
    const [timeLeft, setTimeLeft] = useState<number>(difference)
    const [elapsed, setElapsed] = useState<number>(elapsedTime!=null?elapsedTime:0)
    const [isStarted, setIsStarted] = useState<boolean>(false)
    const [isComplete, setIsComplete] = useState<boolean>(false)

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
            setIsComplete(true)
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
        setIsComplete(false)
    }
    function pauseHandle(){
        setIsStarted(false)
    }

    const radius=110
    const circumference=2*Math.PI*radius
    const strokeWidth=10

    return <div className={styles.timer_container}>
        <div className={styles.timer_content}>
            <p className={styles.other_text}>{title}</p>
            <p className={styles.timer_text}>{elapsedTimeMinutes}:{elapsedTimeSeconds}</p>
            <p className={styles.other_text}>{minutesLeft}:{secondsLeft} left</p>
        </div>
        <svg height="250px" width="250px" className={styles.svg_circle}>
            <circle cx="125" cy="125" r={radius} fillOpacity={0} fill="#26273d" stroke="#545576" strokeWidth={strokeWidth}></circle>
            <circle cx="125" 
                    cy="125" 
                    r={radius} 
                    fillOpacity={0}
                    stroke="#67cb88" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={circumference-((endTime-timeLeft)/endTime)*circumference}
                    strokeWidth={strokeWidth}
                    className={`${isComplete?`${styles.timer_complete}`:" "}`}
            />
        </svg>
         <div className={styles.timer_controls}>              
            <button onClick={startHandle}>Start</button>
            <button onClick={pauseHandle}>Pause</button>
            <button onClick={resetHandle}>Reset</button>
        </div> 
    </div>
}
export default Timer