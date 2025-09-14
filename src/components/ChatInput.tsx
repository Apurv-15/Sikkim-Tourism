import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isListening: boolean;
  onMicClick: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  isListening,
  onMicClick,
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      adjustTextareaHeight();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full bg-gray-700 text-white rounded-lg py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={onMicClick}
          className={`absolute right-2 bottom-2 p-1 rounded-full ${
            isListening 
              ? 'text-red-500 animate-pulse' 
              : 'text-gray-400 hover:text-white'
          }`}
          disabled={isLoading}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        >
          <Mic size={20} />
        </button>
      </div>
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Send message"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
