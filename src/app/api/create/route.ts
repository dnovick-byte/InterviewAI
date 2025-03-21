// app/api/createChatSession/route.ts
import { chatSessions } from '../chatSessions';
import { NextResponse } from 'next/server';
const {
  GoogleGenerativeAI,
  SchemaType,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");


export async function GET() {
  try {
    // Use server-side environment variable
    const apiKey = process.env.GEMINI_API_KEY; 
    if (!apiKey) {
      throw new Error('Missing Gemini API key');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ // generate model
      model: "gemini-2.0-flash",
      systemInstruction: "You will receive a job description and a summary of the user's relevant experiences. Your task is to generate a structured JSON response containing five common interview questions for the given job description. For each question, provide a detailed answer following the STAR-R format:S (Situation): Describe the context or background of the experience.T (Task): Explain the specific challenge or goal.A (Action): Detail the steps taken to address the challenge.R (Result): State the outcome of the actions.R (Relate to Position): Connect the experience and outcome to the job role.The output must be in valid JSON format with the following structure:json{\"interview_questions\": [{\"question\": \"Generated interview question 1\",\"answer\": {\"situation\": \"Brief description of the situation\",\"task\": \"Specific challenge or task faced\",\"action\": \"Actions taken to address the challenge\",\"result\": \"Outcome of the actions\",\"relate\": \"How this experience is relevant to the job\"}},{\"question\": \"Generated interview question 2\",\"answer\": {\"situation\": \"...\",\"task\": \"...\",\"action\": \"...\",\"result\": \"...\",\"relate\": \"...\"}}]}Ensure that all answers are concise, relevant, and tailored to the provided job description and experiences. After this initial call and response, you will just have a conversation with the user. The user may ask questions or ask you to resend the formatted answers.",
    });
    
    // Create the chat session
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
      history: [],
    });
    
    // Generate a session ID to reference this session later
    const session = crypto.randomUUID();
    chatSessions.set(session, chatSession);
    
    // Important: We can't actually return the chat session object directly
    // as it can't be serialized to JSON and sent over HTTP
    // Instead, we need to return the session ID and keep track of the actual session on the server
    
    return NextResponse.json({ 
      success: true, 
      session: session,
      message: "Chat session created successfully"
    });
  } catch (error) {
    console.error('Error creating chat session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create chat session' },
      { status: 500 }
    );
  }
}
