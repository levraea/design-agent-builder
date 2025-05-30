
import { useState } from 'react';
import { ConversationMessage } from '@/types/conversation';

export const useConversationHistory = () => {
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

  const addToConversationHistory = (type: 'user' | 'ai', content: string) => {
    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, newMessage]);
  };

  return {
    conversationHistory,
    addToConversationHistory
  };
};
