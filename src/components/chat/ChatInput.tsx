import React, { useState } from 'react';
import { SendIcon, MicrophoneIcon } from '../icons';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isListening: boolean;
  onMicClick: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  isListening, 
  onMicClick 
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isListening ? "Listening..." : "Ask about your Sikkim trip..."}
          disabled={isLoading || isListening}
          className="w-full bg-white/20 dark:bg-gray-700/50 text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50 transition-all duration-300"
        />
        <button
          type="button"
          onClick={onMicClick}
          disabled={isLoading}
          className={`absolute right-14 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 ${
            isListening ? 'text-red-500 animate-pulse' : 'text-white hover:bg-white/20'
          }`}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          <MicrophoneIcon className="h-6 w-6" />
        </button>
      </div>
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Send message"
      >
        <SendIcon className="h-6 w-6" />
      </button>
    </form>
  );
};

export default ChatInput;
