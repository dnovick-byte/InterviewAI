import style from "./Chat.module.css"
import { ChatMessage, ChatProps } from './d'


export const Chat: React.FC<ChatProps> = ({ chats }) => {
    return (
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



    );
}