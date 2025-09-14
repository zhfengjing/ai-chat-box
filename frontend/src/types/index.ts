export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface SendMessageInput {
  message: string;
}

export interface SendMessageResponse {
  sendMessage: Message;
}

export interface GetChatHistoryResponse {
  chatHistory: Message[];
}

export interface ClearChatResponse {
  clearChat: boolean;
}
