"use client"
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { create } from "domain";
import { Chat } from "./components/chat";
import { Prep } from "./components/prep";
import { createChatSession } from "./api/gemini";
import { Header } from "./components/header";


export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [newMsg, setNewMsg] = useState("");


  const session = createChatSession();

  const cleanJson = (text: String) => {
    return(text.replace(/^```json\s*|```\s*$/g, ''));
  }
  const checkJson = (text: String) => {
   
  }

  useEffect(() => {

    console.log(newMsg)
    const send = async () => {
      if (chats.length > 0) { // do not set initial input as chat
        setChats((prev) => [...prev, { role: 'user', content: newMsg}]);
      }
      const result = await session.sendMessage(newMsg);
      if (result && result.response) {
          const responseText = result.response.text();  // Extract text properly
          console.log(responseText);
          const cleaned = cleanJson(responseText);
          console.log(cleaned);

          setChats((prev) => [...prev, { role: 'assistant', content: cleaned }]);
        }
    }


    if (newMsg !== "") { // prevents empty responses
      send();
    }
  }, [newMsg]);



  return (
    <div className={styles.page}>

      <Header />

      
      <div className={styles.container}>
        {chats.length > 0 ?
          <Chat chats={chats} setChats={setChats} setNewMsg={setNewMsg}/>    
          :
          <Prep setChats={setChats} setNewMsg={setNewMsg}/>
        }
      </div>

    </div>
  );
}
