import { useState } from "react";
import style from "./prep.module.css";
import { ChatMessage } from '../page'

interface PrepProps {
    setChats: React.Dispatch<React.SetStateAction<ChatMessage[]>>; // Type for the setter function
    setNewMsg: React.Dispatch<React.SetStateAction<string>>;
}

export const Prep: React.FC<PrepProps> = ({ setChats, setNewMsg }) => {
    const [jobDescription, setJobDescription] =  useState("")
    const [experiences, setExperiences] = useState("")
    const [isLoading, setIsLoading] = useState(false)
/*
    


    const handleInitial = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent page refresh on form submit

        //give input to api for output
        // create apis in api folder, one for initializing chat, one for sending chat (when you send you receive as well)
        //const session = createChatSession()
        
 
    };
   */

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Check if jobDescription or experiences are empty
        if (jobDescription === "" || experiences === "") {
            setIsLoading(false);
            // Display an error message for empty fields
            document.getElementById("name-error")!.style.display = "block"; // Show error message
        } else {

            setNewMsg(`Job Description: ${jobDescription}\nExperiences: ${experiences}`);
        }
    }
   
    return (
        <div>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formsContainer}>
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
                </div>
                <span className={style.errorMessage} id="name-error" style={{ display: 'none' }}>Please fill out both fields.</span>

                    {!isLoading && 
                    <button type="submit" disabled={isLoading} className={style.generateBtn}>
                        Generate Interview Prep
                    </button>}
                    {isLoading && 
                    <div className={style.load}>
                        <div className={style.spinner}></div>
                    </div>
                    }

            </form>
        </div>
   ); 
}