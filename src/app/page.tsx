import Image from "next/image";
import { PrepForm } from "./components/prep-form";
import styles from "./page.module.css";

export default function Home() {
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
