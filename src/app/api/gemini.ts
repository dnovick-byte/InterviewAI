const {
    GoogleGenerativeAI,
    SchemaType,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
  
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
  

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You will receive a job description and a summary of the user's relevant experiences. Your task is to generate a structured JSON response containing five common interview questions for the given job description. For each question, provide a detailed answer following the STAR-R format:S (Situation): Describe the context or background of the experience.T (Task): Explain the specific challenge or goal.A (Action): Detail the steps taken to address the challenge.R (Result): State the outcome of the actions.R (Relate to Position): Connect the experience and outcome to the job role.The output must be in valid JSON format with the following structure:json{\"interview_questions\": [{\"question\": \"Generated interview question 1\",\"answer\": {\"situation\": \"Brief description of the situation\",\"task\": \"Specific challenge or task faced\",\"action\": \"Actions taken to address the challenge\",\"result\": \"Outcome of the actions\",\"relate\": \"How this experience is relevant to the job\"}},{\"question\": \"Generated interview question 2\",\"answer\": {\"situation\": \"...\",\"task\": \"...\",\"action\": \"...\",\"result\": \"...\",\"relate\": \"...\"}}]}Ensure that all answers are concise, relevant, and tailored to the provided job description and experiences. After this initial call and response, you will just have a conversation with the user. The user may ask questions or ask you to resend the formatted answers.",
});

export const createChatSession = () => {
  return model.startChat({
      generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
      },
      history: [],
  });
}