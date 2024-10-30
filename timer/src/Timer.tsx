import { useState, useEffect } from "react"
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

    return <div>
        <p>{title}</p>
        <p>{elapsedTimeMinutes}:{elapsedTimeSeconds}</p>
        <p>{minutesLeft}:{secondsLeft}</p>
        <button onClick={startHandle}>Start</button>
        <button onClick={pauseHandle}>Pause</button>
        <button onClick={resetHandle}>Reset</button>
    </div>
}
export default Timer