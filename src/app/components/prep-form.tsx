"use client"
import React, { useState } from "react";
import style from "./prep-form.module.css";
import { createChatSession } from "../api/gemini";


interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export function PrepForm() {
    const [jobDescription, setJobDescription] =  useState("")
    const [experiences, setExperiences] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [chatScreen, setChatScreen] = useState(false)
    const [chats, setChats] = useState<ChatMessage[]>([]);

    const cleanJson = (text: String) => {
        return(text.replace(/^```json\s*|```\s*$/g, ''));

    }

    const handleInitial = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent page refresh on form submit

        //give input to api for output
        console.log(jobDescription)
        console.log(experiences)

        const session = createChatSession()
        const result = await session.sendMessage(`Job Description: ${jobDescription}\nExperiences: ${experiences}`);
        if (result && result.response) {
            const responseText = result.response.text();  // Extract text properly
            const cleaned = cleanJson(responseText);

            setChatScreen(true);
            setChats((prev) => [...prev, { role: 'assistant', content: cleaned }]);
        }
 
    };

    const handleChat = async (e: React.FormEvent) => {

    }


    return (
        
        <div className={style.container}>
            {chatScreen ?
                <div className={style.chatContainer}>
                    <div className={style.activeChat}>
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
                                    console.error("Invalid JSON format:", error);
                                    return (
                                        <div key={index} className={style.assistantMessage}>
                                            Error parsing response
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
                    <form className={style.chatBox}>
                        <input type="text" placeholder="enter query"></input>
                    </form>
                </div>

                
                
                :
                <div>
                    <form onSubmit={handleInitial} className={style.form}>
                        <div className={style.formField}>
                            <label htmlFor="jobDescription" className={style.label}>
                                Job Description
                            </label>
                            <textarea
                                id="jobDescription"
                                placeholder="Paste the job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                rows={6}
                                className={style.textarea}
                            />
                        </div>
                        <div className={style.formField}>
                            <label htmlFor="experiences" className={style.label}>
                                Your Experiences
                            </label>
                            <textarea
                                id="experiences"
                                placeholder="List your relevant experiences, skills, and achievements..."
                                value={experiences}
                                onChange={(e) => setExperiences(e.target.value)}
                                rows={6}
                                className={style.textarea}
                            />
                        </div>
                        
                        <button type="submit" disabled={isLoading}>
                            press
                        </button>
                    </form>
                </div>

            }
            
        </div>
        
    );
}