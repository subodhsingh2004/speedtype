import React, { useEffect, useState } from 'react'

function Timer({ time, typingStatus, speedCalculator }) {

    
    const [timeLeft, setTimeLeft] = useState(time)

    useEffect(() => {
        setTimeLeft(time);
    }, [time, typingStatus]);

    useEffect(() => {
        if(timeLeft == 0) speedCalculator()

        if(timeLeft > 0 && typingStatus){
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000);
    
            return () => clearTimeout(timer)
        }

    }, [timeLeft, typingStatus])

    const min = String(Math.floor(timeLeft / 60)).padStart(2, "0")
    const sec = String(Math.floor(timeLeft % 60)).padStart(2, "0")

    return (
        <div>
            <h1 className='font-jetbrains text-[#64f135] text-[20px]'> {min}:{sec} </h1>
        </div>
    )
}

export default Timer