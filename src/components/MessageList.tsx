import React, { useState, useEffect, useRef } from 'react';
import { Sender } from '../types';
import { Message as MessageType } from '../types';
import './chat.css';

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const MESSAGE_LIMIT = 200; // Character limit before showing expand button

  const toggleExpand = (messageId: string) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const formatMessage = (message: MessageType) => {
    if (message.sender === Sender.USER) {
      return message.text;
    }

    // For bot messages, we'll handle HTML content
    return message.text;
  };

  const shouldShowExpand = (text: string) => {
    return text.length > MESSAGE_LIMIT;
  };

  const getTruncatedText = (text: string) => {
    return text.length > MESSAGE_LIMIT ? text.substring(0, MESSAGE_LIMIT) + '...' : text;
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isExpanded = expandedMessages.has(message.id);
        const formattedMessage = formatMessage(message);
        const showExpand = shouldShowExpand(message.text) && !isExpanded;
        
        return (
          <div
            key={message.id}
            className={`message ${message.sender === Sender.USER ? 'user' : 'bot'}`}
          >
            <div className="response-content">
              {isExpanded || !shouldShowExpand(message.text) ? (
                <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: getTruncatedText(formattedMessage) }} />
              )}
              
              {showExpand && (
                <button 
                  className="expand-btn" 
                  onClick={() => toggleExpand(message.id)}
                >
                  Read more
                </button>
              )}
              {isExpanded && (
                <button 
                  className="expand-btn" 
                  onClick={() => toggleExpand(message.id)}
                >
                  Show less
                </button>
              )}
            </div>
            
            {message.isItinerary && (
              <div className="follow-up">
                Would you like me to help you customize this itinerary?
              </div>
            )}
          </div>
        );
      })}
      
      {isLoading && (
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
