import React, { useState, useEffect, useRef } from 'react';

const Typing = () => {
    const referenceText = "The quick brown fox jumps over the lazy dog";
    const [userInput, setUserInput] = useState('');
    const inputRef = useRef(null);

    const handleInput = (event) => {
        const inputText = event.target.innerText;
        setUserInput(inputText);
    };

    const getHighlightedText = () => {
        const words = referenceText.split('');
        const inputWords = userInput.split('');

        return inputWords.map((char, index) => {
            const isError = words[index] !== char;
            return (
                <span
                    key={index}
                    style={{
                        color: isError ? 'red' : 'black',
                        textDecoration: isError && inputWords[index] ? 'underline' : 'none',
                        backgroundColor: isError ? 'orange' : null
                    }}
                >
                    {char}
                </span>
            );
        });
    };

    useEffect(() => {
        // Set the cursor position to the end of the input
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(inputRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }, [userInput]);

    return (
        <div className='h-screen bg-[#111] text-white'>
            <div className='fixed text-gray-600'>
                {referenceText}
            </div>
            <div
                className='z-10 relative h-auto w-auto'
                ref={inputRef}
                contentEditable
                onInput={handleInput}
                placeholder="Start typing here..."
            >
                {getHighlightedText()}
            </div>
        </div>
    );
};

export default Typing;
