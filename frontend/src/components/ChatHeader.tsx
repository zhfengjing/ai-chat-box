import React from 'react';
import { TrashIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ChatHeaderProps {
  onClearChat: () => void;
  messageCount: number;
  isLoading: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat, messageCount, isLoading }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">AI 聊天助手</h1>
          <p className="text-sm text-gray-500">
            {messageCount > 0 ? `${messageCount} 条消息` : '准备就绪'}
            {isLoading && (
              <span className="ml-2 inline-flex items-center">
                <span className="animate-pulse text-primary-500">正在思考...</span>
              </span>
            )}
          </p>
        </div>
      </div>
      
      {messageCount > 0 && (
        <button
          onClick={onClearChat}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          清空对话
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
