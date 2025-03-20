import style from "./Prep.module.css";
export const Prep = ({/* get setChat sent into here as a prop, on handlesubmit change setchat, and then in parent function, check chats to determine what component to show*/}) => {
   return (
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
   ); 
}