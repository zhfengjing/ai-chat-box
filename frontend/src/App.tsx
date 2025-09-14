import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import ChatContainer from './components/ChatContainer';
import './index.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50">
        <ChatContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;
