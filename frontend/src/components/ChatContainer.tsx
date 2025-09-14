import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_MESSAGE, GET_CHAT_HISTORY, CLEAR_CHAT } from '../graphql/queries';
import { Message, SendMessageResponse, GetChatHistoryResponse, ClearChatResponse } from '../types';
import ChatHeader from '../components/ChatHeader';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // GraphQL 查询和变更
  const { data: historyData, loading: historyLoading, refetch: refetchHistory } = useQuery<GetChatHistoryResponse>(
    GET_CHAT_HISTORY,
    {
      variables: { limit: 50 },
      onCompleted: (data) => {
        if (data.chatHistory) {
          setMessages(data.chatHistory);
        }
      }
    }
  );

  const [sendMessage, { loading: sendingMessage }] = useMutation<SendMessageResponse>(
    SEND_MESSAGE,
    {
      onCompleted: (data) => {
        if (data.sendMessage) {
          setMessages(prev => [...prev, data.sendMessage]);
          refetchHistory();
        }
      },
      onError: (error) => {
        console.error('发送消息失败:', error);
        // 可以在这里添加错误提示
      }
    }
  );

  const [clearChat] = useMutation<ClearChatResponse>(
    CLEAR_CHAT,
    {
      onCompleted: () => {
        setMessages([]);
        refetchHistory();
      },
      onError: (error) => {
        console.error('清空对话失败:', error);
      }
    }
  );

  const handleSendMessage = async (content: string) => {
    // 立即添加用户消息到界面
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      await sendMessage({
        variables: { message: content }
      });
    } catch (error) {
      // 如果发送失败，移除临时消息
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
      console.error('发送消息失败:', error);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('确定要清空所有对话记录吗？')) {
      clearChat();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-xl">
      <ChatHeader 
        onClearChat={handleClearChat}
        messageCount={messages.length}
        isLoading={sendingMessage || historyLoading}
      />
      
      <ChatWindow 
        messages={messages}
        isLoading={sendingMessage}
      />
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={sendingMessage}
      />
    </div>
  );
};

export default ChatContainer;
