
export interface ConversationMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}
