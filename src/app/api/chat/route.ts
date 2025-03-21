// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { chatSessions } from '../chatSessions';

const cleanJson = (text: string): string => {
  return text.replace(/^```json\s*|```\s*$/g, '');
};

interface ChatRequestBody {
  message: string;
  session: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ChatRequestBody = await request.json();
    const { message, session } = body;
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }


    
    // Get the chat session
    const chatSession = chatSessions.get(session);

    if (!chatSession) {
      return NextResponse.json(
        { success: false, error: 'Chat session not found or expired' },
        { status: 404 }
      );
    }

    // Send the message to the existing chat session
    const result = await chatSession.sendMessage(message);

    let responseText = '';
    if (result && result.response) {
      responseText = await result.response.text();
      // Clean JSON if needed
      responseText = cleanJson(responseText);
    }
    
    return NextResponse.json({
      success: true,
      content: responseText
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 }
    );
  }
}
