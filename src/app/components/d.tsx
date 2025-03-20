"use client"
import React, { useState } from "react";
import style from "./prep-form.module.css";
import { createChatSession } from "../api/gemini";
import { Chat } from './chat';
import { Prep } from './prep';
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatProps {
    chats: ChatMessage[];
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
                <Chat chats={chats}/>

                
                
                :
                <Prep setChats={setChats}/>

            }
            
        </div>
        
    );
}