import React, { useState, useEffect, useRef } from 'react'

function App() {

    let defaultParagraph = "Data Structures and Algorithms are fundamental concepts in computer science that enable efficient data management and problem solving. Data structures, such as arrays, linked lists, trees, and graphs, organize and store data in a way that facilitates access and modification. Algorithms, on the other hand, are step-by-step procedures for performing tasks or solving problems, including sorting and searching. Mastering DSA is crucial for optimizing performance in software development, as it helps in reducing time and space complexity. Understanding these concepts not only enhances coding skills but also prepares individuals for technical interviews and real world applications in various domains."

    const initialTime = 60;
    const [userTypedText, setUserTypedText] = useState("")
    const [startTime, setStartTime] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [inputDisabled, setInputDisabled] = useState(false)
    const [wpm, setWpm] = useState(null)
    const [accuracy, setAccuracy] = useState(null)
    const [timeLeft, setTimeLeft] = useState(initialTime)

    const min = String(Math.floor(timeLeft / 60)).padStart(2, "0")
    const sec = String(Math.floor(timeLeft % 60)).padStart(2, "0")


    const inputRef = useRef(null)
    // const defaultTotalWords = defaultParagraph.split(" ").filter(word => word.length > 0).length

    useEffect(() => {
        inputRef.current.focus()
    }, [inputDisabled])


    const handleInputChange = (e) => {
        setUserTypedText(e.target.value)
        if (!isTyping) {
            setIsTyping(true)
            setStartTime(Date.now())
        }
    }

    const handleReset = () => {
        setTimeLeft(initialTime)
        setInputDisabled(false)
        setUserTypedText("")
        setWpm(null)
        setAccuracy(null)
    }

    const calculateAccuracy = () => {
        const defaultWords = defaultParagraph.split(' ')
        const userWords = userTypedText.split(' ')
        const length = userWords.filter(word => word.length > 0).length;

        let correctWords = 0;

        for (let i = 0; i < length; i++) {
            if (userWords[i] === defaultWords[i]) {
                correctWords++;
            } else {
                userWords[i] = <b key={i}> {userWords[i]} </b>
            }
        }

        const calculatedAccuracy = Math.floor((correctWords / length) * 100)
        setAccuracy(calculatedAccuracy)

        // let words = userWords.map((word, index) => {
        //     const isIncorrect = defaultWords[index] !== word;

        //     return (
        //         <span key={index} style={{ color: isIncorrect ? "red" : "white" }}>
        //             {word}{" "}
        //         </span>
        //     )
        // })
        // console.log(sti)
    }

    const calculateWPM = () => {
        setIsTyping(false)
        setInputDisabled(true)

        const initialTime = startTime;
        const timeElasped = Math.floor((Date.now() - initialTime) / 1000)

        const wordsTyped = userTypedText.split(" ").filter(word => word.length > 0).length

        const speed = Math.floor((wordsTyped / timeElasped) * 60);

        setWpm(speed)
        calculateAccuracy()
    }


    useEffect(() => {
        if (timeLeft == 0) calculateWPM()

        if (timeLeft > 0 && isTyping) {
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000);

            return () => clearTimeout(timer)
        }

    }, [timeLeft, isTyping])

    return (
        <div className='h-screen w-full bg-[#001] text-white flex flex-col items-center py-5 space-y-10'>

            <h1 className='font-[poppins] text-[#64f135] text-[40px]'>SpeedType</h1>

            <div className='w-full leading-5 max-w-3xl text-[18px] text-gray-400 h-auto font-jetbrains text-justify'>
                {defaultParagraph}
            </div>

            <div className='w-full max-w-3xl h-[10rem] space-y-1'>

                <div className='flex w-full justify-between'>
                    <h1 className='text-white font-[poppins]'>Type Here</h1>
                    <div>
                        {
                            timeLeft > 0 ?
                                <h1 className='font-jetbrains text-[#64f135] text-[20px]'> {min}:{sec} </h1> :
                                <h1 className='font-jetbrains text-[#64f135] text-[20px]'> Time's up!</h1>
                        }
                    </div>
                </div>

                <textarea
                    value={userTypedText}
                    onChange={handleInputChange}
                    type="text"
                    ref={inputRef}
                    readOnly={inputDisabled}
                    className='bg-transparent border border-gray-600 w-full h-full rounded-md resize-none outline-none px-3 py-2 font-[poppins] text-[]'
                />

                {/* <button
                    onClick={calculateWPM}
                    className='bg-white font-jetbrains px-2 py-1 text-black font-bold'>
                    Click
                </button> */}

            </div>

            <div className='flex pt-5 items-center justify-between w-full max-w-3xl'>

                <h1 hidden={!wpm} className='text-3xl font-jetbrains text-white font-bold'>{wpm} WPM| {accuracy}%</h1>

                <button onClick={handleReset} className='font-jetbrains text-black font-medium py-1 px-2 bg-[#64f135]'>Reset</button>

            </div>
        </div>
    )
}

export default App