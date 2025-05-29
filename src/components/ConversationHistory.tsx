
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Bot, Clock } from 'lucide-react';

interface ConversationMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ConversationHistoryProps {
  messages: ConversationMessage[];
}

export const ConversationHistory = ({ messages }: ConversationHistoryProps) => {
  if (messages.length === 0) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Clock className="w-5 h-5 text-gray-600" />
          <span>Conversation History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row' : 'flex-row'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {message.type === 'user' ? 'You' : 'AI Agent'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className={`text-sm p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-50 text-blue-900'
                      : 'bg-gray-50 text-gray-900'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
