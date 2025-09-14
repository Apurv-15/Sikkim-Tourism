import React from 'react';
import { Message as MessageType, Sender } from '../../types';
import { UserIcon, BotIcon } from '../icons';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  // Simple markdown-to-html conversion for bold and lists
  const formatText = (text: string) => {
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italics

    // Handle lists
    formattedText = formattedText.replace(/^\* (.*$)/gm, '<li class="ml-4 list-disc">$1</li>');
    formattedText = formattedText.replace(/(\<li.*\>.*<\/li\>)+/g, '<ul>$&</ul>');

    return { __html: formattedText.replace(/\n/g, '<br />') };
  };

  if (isUser) {
    return (
      <div className="flex justify-end items-end space-x-3 mb-4">
        <div className="bg-teal-500 text-white rounded-2xl rounded-br-none p-4 max-w-3xl shadow-md">
          <p className="text-sm">{message.text}</p>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
          <UserIcon className="h-6 w-6 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 mb-4">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
        <BotIcon className="h-6 w-6 text-teal-300" />
      </div>
      <div className="bg-gray-700/50 text-white rounded-2xl rounded-bl-none p-4 max-w-3xl shadow-md">
        {message.text ? (
          <div 
            className="text-sm space-y-2 prose prose-invert prose-sm" 
            dangerouslySetInnerHTML={formatText(message.text)} 
          />
        ) : (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
