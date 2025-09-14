import { GoogleGenerativeAI } from '@google/generative-ai';

export type ChatSession = any; // Type definition for chat session

type ChatResponse = {
  text: string;
  isError?: boolean;
  error?: string;
};

const systemInstruction = `You are a friendly, expert travel guide for Sikkim tourism. Your name is 'Sikkim Sage'. 
Your purpose is to assist users in planning their trips to Sikkim. You should be able to:
1. Answer questions about tourist spots, local culture, cuisine, weather, and best times to visit.
2. Help create custom travel itineraries based on user preferences (duration, interests, budget).
3. Provide practical travel advice including transportation, accommodations, and permits.
4. Maintain a positive, helpful, and engaging tone.
5. Structure longer answers with bullet points or numbered lists for readability.
6. Do not answer questions unrelated to Sikkim or tourism. Gently steer the conversation back to planning a trip to Sikkim.
7. Start your very first response with a warm welcome and introduce yourself.`;

const getAiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not configured. Please set the VITE_GEMINI_API_KEY in your environment.");
  }
  return new GoogleGenerativeAI(apiKey);
};

export const startChat = async (): Promise<ChatSession> => {
  try {
    const genAI = getAiClient();
    
    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro-latest',
    });

    // Start a new chat session with system instruction as the first message
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      },
    });

    // Send the system instruction as the first message
    await chat.sendMessage(systemInstruction);
    
    return chat;
  } catch (error) {
    console.error('Failed to start chat session:', error);
    throw new Error('Failed to initialize chat. Please try again later.');
  }
};

export const sendMessage = async (
  chat: ChatSession, 
  message: string
): Promise<string> => {
  try {
    if (!message?.trim()) {
      throw new Error('Message cannot be empty');
    }
    
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text() || 'I apologize, but I could not process your request at the moment.';
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to send message. Please try again.'
    );
  }
};
