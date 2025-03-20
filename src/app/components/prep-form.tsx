"use client"
import React, { useState } from "react";
import style from "./prep-form.module.css";

export function PrepForm() {
    const [jobDescription, setJobDescription] =  useState("")
    const [experiences, setExperiences] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = () => {
        //give input to api for output
        console.log(jobDescription)
        console.log(experiences)
    };


    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.form}>
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
    );
}