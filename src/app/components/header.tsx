import styles from './header.module.css';
export const Header = () => {
    return (
       <div className={styles.container}>
            <h1 className={styles.title}> AI Interview Prep Assistant </h1>
            <p className={styles.description}>
                Generate interview questions and STARR-formatted answers based on job descriptions and your experiences
            </p>
       </div> 
    );
}