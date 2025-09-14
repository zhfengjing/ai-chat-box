import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!) {
    sendMessage(message: $message) {
      id
      content
      role
      timestamp
    }
  }
`;

export const GET_CHAT_HISTORY = gql`
  query GetChatHistory($limit: Int) {
    chatHistory(limit: $limit) {
      id
      content
      role
      timestamp
    }
  }
`;

export const CLEAR_CHAT = gql`
  mutation ClearChat {
    clearChat
  }
`;
