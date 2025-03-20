"use client"
import { useState } from "react";
import { PrepForm } from "./components/d";
import styles from "./page.module.css";
import { create } from "domain";

export default function Home() {
  const [chatScreen, setChatScreen] = useState(false)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}> AI Interview Prep Assistant </h1>
      <p className={styles.description}>
        Generate interview questions and STARR-formatted answers based on job descriptions and your experiences
      </p>
      
      <PrepForm />
    </div>
  );
}
