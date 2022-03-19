import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './timer.scss'

const Timer = ({duration, stopFunc, index, isStoped, time, setTime}) => {

    const {results} = useSelector(state=>state.quiz)
    const dispatch = useDispatch()

    useEffect(() => {

        if(time === 0) return stopFunc(null)

        const interval = setInterval(()=>{
            setTime(time - 1)
        }, 1000)

        if(isStoped === true){
            return clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [time,isStoped])

    useEffect(() => {
        setTime(duration / 1000)
    }, [index,duration]);

    return (
        <div className={`timer ${time < duration / 1000 / 4? "min": time < duration / 1000 / 3? "middle" : ""}`}>
            <span>{(time >= 10)? time : "0"+ time}</span> 
        </div>
    );
}

export default Timer;
