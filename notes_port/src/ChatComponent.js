import React, { useState } from 'react';
import './ChatComponent.css';

const OPENAI_API_KEY = 'sk-proj-t6TjJLZcL4OtvUoTwUXvT3BlbkFJvveemTlNN2qodZzG0ddj';

const queryChatGPT = async (message) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // or the model you are using
            messages: [{ role: 'user', content: message }],
        }),
    });

    if (!response.ok) {
        throw new Error('Error querying OpenAI API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
};

const ChatComponent = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = async () => {
        if (userInput.trim() === '') return;

        // Add user input to chat history
        setChatHistory([...chatHistory, { sender: 'user', message: userInput }]);

        try {
            // Send query to ChatGPT API
            const response = await queryChatGPT(userInput);

            // Add ChatGPT response to chat history
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'chatgpt', message: response }
            ]);
        } catch (error) {
            console.error('Error querying ChatGPT:', error);
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'chatgpt', message: 'Error querying ChatGPT. Please try again.' }
            ]);
        }

        // Clear user input
        setUserInput('');
    };

    return (
        <div>
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-message ${chat.sender}`}>
                        <p>{chat.message}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;