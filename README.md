# InterviewAI
This app is designed to help users prepare for job interviews by providing personalized interview questions and STARR-formatted responses. Users can input a job description and their experiences, and the app will interact with the Gemini API to generate common interview questions along with structured answers. You can then engage in a conversation with the model to refine your responses, simulating a real interview environment and improving your readiness for the big day.


## Setup Instructions
1. Clone the repository:
```
git clone https://github.com/dnovick-byte/InterviewAI.git
```
2. Navigate to the project directory:
```
cd your-project
```
3. Install dependencies: You need to have Node.js installed.  
Run the following command to install the required dependencies:
```
npm install
```
4. Set up environment variables: This project requires a Google Gemini API key for external services. To set it up:
- Create a ```.env.local``` file in the root of the project
- Add your API key to the ```.env.local``` file in the following format:
```
export GEMINI_API_KEY=your-api-key
```
5. Run the development server: Start the server in development mode with
```
npm run dev
```
Now open your browser and visit http://localhost:3000

## Features Implemented
- **Job Description and Experience Input:** Users can input a job description and their relevant experiences into the app.
- **API Integration with Gemini API:** The application then sends the job description and experiences to the Gemini API, which processes the information and returns a set of common interview questions, as well as STARR-formatted responses (Situation, Task, Action, Result, Relate) for each question.
- **Conversational Interface with Model:** After receiving the interview questions and responses, users can engage in a conversation with the model. This allows for further refinement and practice of answers, simulating a real interview environment.
- **STAR Response Format:** The system automatically formats the responses in the STARR method, ensuring the user can provide structured, coherent, and detailed answers.
- Real-time Interaction: Users can ask the model follow-up questions or request clarification on certain responses, enabling a dynamic and interactive practice session.
- **Customizable Experience:** The user can adjust and refine their responses based on feedback from the model or modify the context to focus on specific aspects of the interview.

## Libraries and Tools Used
- Next.js: A React framework that enables server-side rendering, static site generation, and more.  
- React: JavaScript library for building user interfaces.
- Axios: Promise-based HTTP client for making API requests.
- CSS Modules: For scoped styling in React components.
- Lucide React: A set of customizable, lightweight icons for React that you can easily use in your project.

## Known Issues or Limitations
- **No Database Integration:** The application currently does not use a database, meaning user data cannot be stored persistently. Therefore, users cannot log in or save their previous interactions or responses for future sessions.
- **Page Refresh Resets Chat:** When the page is refreshed, the chat history is lost, and any ongoing conversation with the model is reset. The application does not yet save the state or conversation, leading to a poor user experience during page reloads.
- **Limited Authentication:** The application lacks a robust authentication system, so there is no way to create and manage user accounts or securely store user data over time.

## Future Improvements
- **Database Integration:** Implement a database to store user data, chat history, and other relevant information. This would allow users to log in, save their responses, and retrieve previous conversations.
- **Persistent Chat History:** Improve the user experience by saving chat history locally or server-side, so users can continue conversations even after refreshing the page or logging in from another device.
- **User Authentication:** Add a user authentication system to allow users to create accounts, log in, and securely access their personalized data and saved interactions.
- **Error Handling & Feedback:** Improve error handling by providing users with more meaningful feedback when something goes wrong, such as displaying error messages for failed API calls or incomplete inputs.
- **Create an Information Page for STARR Method:** Add a dedicated page to explain the STAR (Situation, Task, Action, Result, Relate) method for answering interview questions.

## Demo
[Check out the live app!](https://interview-ai-git-main-daniel-novicks-projects.vercel.app/)
