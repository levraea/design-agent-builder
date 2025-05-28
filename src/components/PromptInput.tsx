
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';

interface ConversationMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  conversationHistory?: ConversationMessage[];
}

export const PromptInput = ({ onGenerate, isGenerating, conversationHistory = [] }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const hasConversationHistory = conversationHistory.length > 0;

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      {!hasConversationHistory && (
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            <span>Describe Your Application</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={`space-y-4 ${hasConversationHistory ? 'pt-6' : ''}`}>
        <Textarea
          placeholder="Describe the application you want to build in plain English. Powered by Google Gemini 2.0 Flash for fast, intelligent code generation..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] resize-none border-gray-200 focus:border-purple-300 focus:ring-purple-200"
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating with Gemini 2.0 Flash...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              {hasConversationHistory ? 'Submit' : 'Generate Application'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
