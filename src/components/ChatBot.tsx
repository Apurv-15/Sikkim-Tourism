import React, { useState, useRef, useEffect, useCallback } from 'react';

// Add type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
  
  class SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
  }
}
import { gsap } from 'gsap';
import { MessageCircle, X } from 'lucide-react';
import { startChat, sendMessage, type ChatSession } from '../services/chatService';
import { useNavigate } from 'react-router-dom';
import { Message as MessageType, Sender } from '../types';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

type Intent = 'greeting' | 'trekking' | 'accommodation' | 'food' | 'permits' | 'weather' | 'itinerary' | 'unknown';

interface ChatBotProps {
  isAutoOpen?: boolean;
  onClose?: () => void;
  context?: Record<string, unknown>;
  className?: string;
}

interface BotResponse {
  responses: string[];
  questions?: string[];
}

const ITINERARY_SYSTEM_PROMPT = `You are an expert Sikkim travel planner. Create detailed daily itineraries based on the following requirements:
- Include must-see attractions and hidden gems
- Suggest realistic travel times between locations
- Include meal recommendations with local cuisine
- Account for opening hours and best visiting times
- Add travel tips and packing suggestions
- Consider altitude acclimatization if needed
- Include estimated costs where applicable

Format the response in markdown with clear sections for each day.`;

const botResponses: Record<Intent | 'fallback', BotResponse> = {
  greeting: {
    responses: [
      "Namaste! I'm your Sikkim travel assistant. How can I help you explore the Himalayas today?",
      "Hello! Ready to plan your Sikkim adventure? What would you like to know?",
      "Hi there! I'm here to help with your Sikkim travel plans. What can I assist you with?"
    ],
    questions: [
      "What brings you to Sikkim?",
      "Are you interested in trekking, culture, or relaxation?",
      "When are you planning to visit Sikkim?"
    ]
  },
  trekking: {
    responses: [
      "Sikkim offers amazing trekking routes! The Goecha La trek is particularly stunning with views of Kanchenjunga.",
      "For trekking, I recommend the Dzongri-Goecha La trek or the Singalila Ridge trek. Both offer breathtaking views.",
      "The Green Lake trek is a challenging but rewarding experience for seasoned trekkers."
    ],
    questions: [
      "What's your trekking experience level?",
      "Are you looking for a day hike or a multi-day trek?",
      "Would you like information about trekking permits?"
    ]
  },
  accommodation: {
    responses: [
      "Gangtok has a range of accommodations from budget hostels to luxury resorts. What's your preference?",
      "For a unique experience, consider staying in a homestay in Lachen or Lachung.",
      "Many monasteries offer basic accommodation for those seeking a spiritual experience."
    ],
    questions: [
      "What's your accommodation budget?",
      "Do you prefer city center or more remote locations?",
      "Are you traveling with family or solo?"
    ]
  },
  food: {
    responses: [
      "You must try momos, thukpa, and traditional Sikkimese thali when you're here!",
      "Sikkimese cuisine is a blend of Nepalese, Tibetan, and Indian flavors. Don't miss the local cheese called chhurpi!",
      "For authentic Sikkimese food, try the local eateries in Gangtok's MG Marg."
    ],
    questions: [
      "Do you have any dietary restrictions?",
      "Are you interested in cooking classes?",
      "Would you like restaurant recommendations?"
    ]
  },
  permits: {
    responses: [
      "For visiting Nathula Pass and Tsomgo Lake, you'll need a Protected Area Permit (PAP). I can help with that!",
      "Indian nationals need an Inner Line Permit (ILP) to visit certain areas in Sikkim. Foreign nationals need a Restricted Area Permit (RAP).",
      "Permits can be obtained through registered travel agents or the Sikkim Tourism office in Gangtok."
    ],
    questions: [
      "Which restricted areas are you planning to visit?",
      "Are you an Indian national or foreign tourist?",
      "Do you need help with the permit application?"
    ]
  },
  weather: {
    responses: [
      "The best time to visit Sikkim is from March to May and October to December for clear mountain views.",
      "Monsoon season (June-September) brings heavy rainfall, so pack accordingly if visiting then.",
      "Winter (December-February) can be quite cold, especially in higher altitudes, with possible snowfall."
    ],
    questions: [
      "When are you planning to visit?",
      "Are you comfortable with cold weather?",
      "Would you like packing suggestions?"
    ]
  },
  itinerary: {
    responses: [
      "I'd be happy to help you plan your Sikkim itinerary! How many days will you be staying?",
      "Let's create a perfect Sikkim itinerary for you. When are you planning to visit and for how many days?",
      "I can help you plan your Sikkim trip. Could you tell me the duration and your interests?"
    ],
    questions: [
      "What are your main interests? (e.g., trekking, culture, nature)",
      "Are you traveling with family, friends, or solo?",
      "Do you have any specific places in mind?"
    ]
  },
  fallback: {
    responses: [
      "I'm not sure I understand. Could you rephrase that?",
      "I'm still learning about Sikkim. Could you ask me something else?",
      "I don't have information about that yet. Is there something else I can help with?"
    ]
  },
  unknown: {
    responses: [
      "I'm not quite sure how to respond to that. Could you try asking in a different way?",
      "I'm still learning about that topic. Could you ask me something else about Sikkim?",
      "I don't have enough information to answer that. Try asking about Sikkim's attractions, food, or travel tips!"
    ]
  }
};

const trainingData = [
  { input: "hello", output: { intent: 'greeting' } },
  { input: "hi", output: { intent: 'greeting' } },
  { input: "trekking in Sikkim", output: { intent: 'trekking' } },
  { input: "best treks", output: { intent: 'trekking' } },
  { input: "places to stay", output: { intent: 'accommodation' } },
  { input: "hotels in Gangtok", output: { intent: 'accommodation' } },
  { input: "local food", output: { intent: 'food' } },
  { input: "Sikkimese cuisine", output: { intent: 'food' } },
  { input: "permits required", output: { intent: 'permits' } },
  { input: "how to get inner line permit", output: { intent: 'permits' } },
  { input: "best time to visit", output: { intent: 'weather' } },
  { input: "weather in December", output: { intent: 'weather' } },
];


const ChatBot: React.FC<ChatBotProps> = ({
  isAutoOpen = false,
  onClose = () => {},
  context = {},
  className = ''
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(isAutoOpen);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: Date.now().toString(),
      text: "Hello! I'm Sikkim Sage, your friendly Sikkim travel assistant. I can help you plan your perfect trip to Sikkim. What would you like to know?",
      sender: Sender.BOT,
      timestamp: new Date(),
      isItinerary: false
    }
  ]);
  
  const chatSession = useRef<ChatSession | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session on component mount
  useEffect(() => {
    let isMounted = true;
    
    const initChat = async () => {
      try {
        const session = await startChat();
        if (isMounted) {
          chatSession.current = session;
          
          // Add welcome message if no messages yet
          if (messages.length === 0) {
            const welcomeMessage: MessageType = {
              id: Date.now().toString(),
              text: "Namaste! I'm Sikkim Sage, your friendly Sikkim travel assistant. How can I help you plan your trip today?",
              sender: Sender.BOT,
              timestamp: new Date(),
              isItinerary: false
            };
            setMessages([welcomeMessage]);
          }
        }
      } catch (error) {
        console.error('Failed to initialize chat session:', error);
        const errorMessage: MessageType = {
          id: Date.now().toString(),
          text: "I'm having trouble connecting to the chat service. Please try again later.",
          sender: Sender.BOT,
          timestamp: new Date(),
          isItinerary: false
        };
        setMessages([errorMessage]);
      }
    };
    
    initChat();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Save messages to local storage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current, 
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const detectIntent = (text: string): Intent => {
    const input = text.toLowerCase();
    
    if (/hello|hi|hey|greetings?/i.test(input)) return 'greeting';
    if (/trek|hike|trail/i.test(input)) return 'trekking';
    if (/hotel|stay|accommodation|lodging/i.test(input)) return 'accommodation';
    if (/food|eat|restaurant|cuisine|dining|local food/i.test(input)) return 'food';
    if (/permit|permission|document|visa|passport/i.test(input)) return 'permits';
    if (/weather|climate|temperature|season|best time/i.test(input)) return 'weather';
    if (/itinerary|plan|schedule|trip plan|travel plan|things to do|places to visit/i.test(input)) return 'itinerary';

    return 'unknown';
  };

  const formatMessage = (text: string): string => {
    if (!text) return '';
    
    // Preserve newlines and handle basic markdown formatting
    let formattedText = text
      // Convert markdown-style bold **text** to <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert markdown-style italic *text* to <em>text</em>
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Handle code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Handle inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle lists - first markdown-style lists
    formattedText = formattedText
      .replace(/^(\s*[-*+]\s+.*(?:\n\s*[-*+]\s+.*)*)/gm, (match) => {
        const items = match
          .split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\s*[-*+]\s+/, '<li>') + '</li>')
          .join('');
        return `<ul>${items}</ul>`;
      })
      // Handle numbered lists
      .replace(/^(\s*\d+\.\s+.*(?:\n\s*\d+\.\s+.*)*)/gm, (match) => {
        const items = match
          .split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\s*\d+\.\s+/, '<li>') + '</li>')
          .join('');
        return `<ol>${items}</ol>`;
      });

    // Handle paragraphs and line breaks
    formattedText = formattedText
      .split('\n\n')
      .filter(para => para.trim().length > 0)
      .map(para => {
        // Skip if already wrapped in HTML tags
        if (/^<[a-z][\s\S]*>$/i.test(para.trim()) || 
            para.trim().startsWith('<ul>') || 
            para.trim().startsWith('<ol>')) {
          return para;
        }
        // Replace single newlines with <br> within paragraphs
        return `<p>${para.replace(/\n/g, '<br>')}</p>`;
      })
      .join('\n\n');

    return formattedText;
  };

  const generateResponse = (intent: Intent, userMessage: string): string => {
    const responses = botResponses[intent as keyof typeof botResponses] || botResponses.fallback;
    const randomResponse = responses.responses[Math.floor(Math.random() * responses.responses.length)];

    const formattedResponse = formatMessage(randomResponse);

    if (responses.questions && Math.random() > 0.5) {
      const randomQuestion = responses.questions[Math.floor(Math.random() * responses.questions.length)];
      return `<div class="response-content">
        <div class="response-text">${formattedResponse}</div>
        <div class="follow-up">${randomQuestion}</div>
      </div>`;
    }

    return `<div class="response-content">${formattedResponse}</div>`;
  };

  const handleSendMessage = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: trimmedText,
      sender: Sender.USER,
      timestamp: new Date(),
      isItinerary: false
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const intent = detectIntent(trimmedText);

      if (!chatSession.current) {
        chatSession.current = await startChat();
      }

      let prompt = trimmedText;
      if (intent === 'itinerary') {
        prompt = `Create a well-structured travel itinerary for Sikkim based on: ${trimmedText}

        Please format the response with:
        - Clear day-by-day sections
        - Bullet points for activities
        - Proper spacing between sections
        - Include time estimates and travel times
        - Add any important notes or tips

        Keep the language concise but informative.`;
      }

      const response = await sendMessage(chatSession.current, prompt);

      const formattedResponse = formatMessage(response);
      
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: formattedResponse,
        sender: Sender.BOT,
        timestamp: new Date(),
        isItinerary: intent === 'itinerary'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error 
          ? `I'm sorry, I encountered an error: ${error.message}`
          : "I'm sorry, I encountered an error. Please try again.",
        sender: Sender.BOT,
        timestamp: new Date(),
        isItinerary: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };
  
  const toggleFullscreen = useCallback(() => {
    if (!chatRef.current) return;
    
    if (!document.fullscreenElement) {
      chatRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleMicClick = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    if (isListening) {
      // Stop listening
      recognition.stop();
      setIsListening(false);
      return;
    }

    // Start listening
    setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.trim()) {
        handleSendMessage(transcript);
      }
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      
      const errorMessage: MessageType = {
        id: Date.now().toString(),
        text: `Error with speech recognition: ${event.error}. Please try again.`,
        sender: Sender.BOT,
        timestamp: new Date(),
        isItinerary: false
      };
      setMessages(prev => [...prev, errorMessage]);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setIsListening(false);
    }
  }, [isListening, handleSendMessage]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 ${className}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div 
          ref={chatRef} 
          className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden border border-gray-700"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-white rounded-full"></div>
              <h3 className="font-semibold text-lg">Sikkim Travel Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleFullscreen}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 bg-gray-900 ${isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[400px]'}`}>
            <div className="max-w-3xl mx-auto h-full">
              <MessageList 
                messages={messages} 
                isLoading={isLoading} 
              />
            </div>
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <ChatInput 
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              isListening={isListening}
              onMicClick={handleMicClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;