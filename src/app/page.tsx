"use client"
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { create } from "domain";
import { Chat } from "./components/chat";
import { Prep } from "./components/prep";
import { Header } from "./components/header";
import axios from 'axios';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [chats, setChats] = useState<ChatMessage[]>([]); // history of messages in conversation
  const [newMsg, setNewMsg] = useState(""); // new message state, passed down to child components
  const [session, setSession] = useState(null); // session id for API calls


  // Initialize chat session on first load
  useEffect(() => {
    const initChatSession = async () => {
      try {
        const response = await axios.get('/api/create'); //call create API route to create session
        
        if (response.data.success && response.data.session) {
          setSession(response.data.session);
          console.log('Chat session created:', response.data.session);
        } else {
          console.error('Failed to create chat session');
        }
      } catch (error) {
        console.error('Error initializing chat session:', error);
      }
    };
    
    initChatSession();
  }, []);

  // when newMsg changes (from child component) it is sent to model
  useEffect(() => {
    if (newMsg !== "") { // prevents empty responses
      sendMessage(newMsg);
    }
  }, [newMsg]);


  // function to send message to model and get response
  const sendMessage = async (message: string) => {
    if (!message || !session) return;
    //setIsLoading(true);
    try {
      // Add user message to chat
      if (chats.length > 0) { // do not set initial input as user chat
        setChats((prev) => [...prev, { role: 'user', content: message }]);
      }
      
      const response = await axios.post('/api/chat', { //call chat API route to send chat and receive chat
        message,
        session
      });
  
      // Add assistant response to chat
      setChats((prev) => [...prev, { role: 'assistant', content: response.data.content }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };



  return (
    <div className={styles.page}>

      <Header />

      <div className={styles.container}>
        {chats.length > 0 ?
          <Chat chats={chats} setNewMsg={setNewMsg}/>    
          :
          <Prep setNewMsg={setNewMsg}/>
        }
      </div>

    </div>
  );
}
