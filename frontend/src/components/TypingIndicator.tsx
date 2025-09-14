import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium bg-gray-500 mr-3">
          AI
        </div>
        
        {/* Typing Animation */}
        <div className="px-4 py-3 rounded-lg bg-white border border-gray-200 rounded-bl-sm shadow-sm">
          <div className="typing-indicator flex space-x-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
