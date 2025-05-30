import { useState,useEffect,useRef } from "react";
import { useAsyncError } from "react-router-dom";



function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const intervalIdRef = useRef(null);
    const startTimeref = useRef(0);

    useEffect(()=>{

        if(isRunning){
            intervalIdRef.current =  setInterval(() => {
                setElapsedTime(Date.now()-startTimeref.current)
                
            }, 10);
        }

        return()=>{
            clearInterval(intervalIdRef.current);
        }
    },[isRunning]);

    function start(){
        setIsRunning(true);
        startTimeref.current = Date.now() - elapsedTime;
       

    }


    function stop(){
         setIsRunning(false);
        
    }


    function reset(){
        setIsRunning(false);
        setElapsedTime(0);

    }


    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000*60*60));
        let minutes = Math.floor(elapsedTime / (1000*60)%60);
        let second = Math.floor(elapsedTime / (1000)%60);
        let milisecond = Math.floor(elapsedTime % (1000)/10);

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        second = String(second).padStart(2,"0");


        return `${minutes}:${second}:${milisecond}`

    }


  
     return(
        <div className="stopWatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className="start-button">start</button>
                <button onClick={stop} className="stop-button">stop</button>
                <button onClick={reset} className="reset-button">reset</button>                
            </div>


        </div>

     );

}
export default StopWatch