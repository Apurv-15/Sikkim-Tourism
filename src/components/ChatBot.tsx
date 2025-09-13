import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MessageCircle, X, Send, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isAutoOpen?: boolean;
  onClose?: () => void;
  context?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ 
  isAutoOpen = false, 
  onClose,
  context 
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(isAutoOpen);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Sikkim travel assistant. How can I help you plan your adventure?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const botResponses = [
    "Sikkim offers amazing trekking routes! The Goecha La trek is particularly stunning.",
    "Best time to visit Sikkim is March-May and October-December for clear mountain views.",
    "Don't miss trying momos, thukpa, and traditional Sikkimese tea!",
    "Tsomgo Lake and Nathula Pass require special permits. I can help you with that.",
    "The Rumtek Monastery is a must-visit for spiritual experiences.",
    "Yumthang Valley is called the 'Valley of Flowers' - perfect for nature lovers!",
    "For accommodation, I recommend staying in Gangtok for easy access to major attractions."
  ];

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current, 
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isAutoOpen) {
      setIsOpen(true);
      if (context) {
        const contextMessage: Message = {
          id: Date.now(),
          text: `I'd love to help you plan your trip to ${context}! What specific information would you like to know?`,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, contextMessage]);
      }
    }
  }, [isAutoOpen, context]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleMapClick = () => {
    navigate('/map');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Map Button */}
      <button
        onClick={handleMapClick}
        className="mb-3 w-14 h-14 bg-gradient-sunset text-white rounded-full shadow-large hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
        title="View Monasteries Map"
      >
        <Map className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="mb-4 w-80 h-96 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-large overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-mountain p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">Sikkim Travel Bot</h3>
                <p className="text-xs opacity-80">Online</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setIsOpen(false);
                onClose?.();
              }}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={messagesRef}
            className="flex-1 p-4 space-y-3 overflow-y-auto h-64 bg-gradient-to-b from-card to-card/80"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                    message.isBot
                      ? 'bg-white/95 text-gray-900 shadow-soft'
                      : 'bg-blue-600 text-white shadow-soft'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card/90 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Sikkim..."
                className="flex-1 px-3 py-2 bg-white/95 border border-gray-200 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                onClick={handleSendMessage}
                className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-mountain text-white rounded-full shadow-large hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default ChatBot;