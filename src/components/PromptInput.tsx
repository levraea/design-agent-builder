
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { ConversationMessage } from '@/types/conversation';

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
      setPrompt(''); // Clear the prompt after submission
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      {!hasConversationHistory && (
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-brand-blue" />
            <span>Describe Your Application</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={`space-y-4 ${hasConversationHistory ? 'pt-6' : ''}`}>
        <Textarea
          placeholder="Ask the agent..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] resize-none border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-blue/90 hover:to-brand-green/90 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating with AI...
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
