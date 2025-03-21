import style from "./chat.module.css";
import { useState, useEffect, useRef } from "react";
import { ChatMessage } from '../page';
import { ArrowUpFromDot } from 'lucide-react';


export interface ChatProps {
    chats: ChatMessage[]; // to display chats
    setNewMsg: React.Dispatch<React.SetStateAction<string>>; // to set new message to send in chat
}

export const Chat: React.FC<ChatProps> = ({ chats, setNewMsg }) => {
    const [msg, setMsg] = useState(""); // message state for text input

    // Create a ref to the chat container that holds the messages
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // Function to scroll the chat container to the bottom
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    // Use the effect to scroll to the bottom whenever chats are updated
    useEffect(() => {
        scrollToBottom();
    }, [chats]); // This will run every time the chats array changes

    // when chat form os submitted, setNewMsg() is set with the new message which changes state in parent component, which calls the API route
    const handleChat = (e: React.FormEvent) => {
        e.preventDefault();  // Prevent page refresh on form submit
        setNewMsg(msg);
        setMsg(""); // set input text message back to ""
    }
     
    // handle input change in textbox
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value);
    }


    return (
        <div className={style.chatContainer}>
            <div className={style.activeChat} ref={chatContainerRef}>
                {chats.map((chat, index) => {
                    if (index === 0 && chat.role === "assistant") {
                        try {
                            const data = JSON.parse(chat.content); // Ensure content is valid JSON
                            return (
                                <div key={index} className={style.assistantMessage}>
                                    {data.interview_questions.map((item: any, idx: number) => (
                                    <div key={idx} className="mb-4">
                                        <h3 className="font-bold">Question {idx + 1}: {item.question}</h3>
                                        <p><strong>Situation:</strong> {item.answer.situation}</p>
                                        <p><strong>Task:</strong> {item.answer.task}</p>
                                        <p><strong>Action:</strong> {item.answer.action}</p>
                                        <p><strong>Result:</strong> {item.answer.result}</p>
                                        <p><strong>Relate to Position:</strong> {item.answer.relate}</p>
                                    </div>
                                     ))}
                                </div>
                            );
                        } catch (error) {
                            return (
                                <div key={index} className={style.assistantMessage}>
                                    Error developing interview questions and STARR responses
                                </div>
                            );
                        }
                    } else {
                        return (
                            <div key={index} className={chat.role === "user" ? style.userMessage : style.assistantMessage}>
                                {chat.content}
                            </div>
                        );
                    }
                })}
            </div> 

            <form className={style.chatBox} onSubmit={handleChat}>
                <input 
                    type="text" 
                    placeholder="Ask questions or clarifications..." 
                    value={msg}
                    onChange={handleInputChange} // Update state on input change
                    className={style.textIn}
                />

                <button type="submit" className={style.btn}>
                    <ArrowUpFromDot />
                </button>
            </form>
        </div>
    );
}