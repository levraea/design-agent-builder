
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export const PromptInput = ({ onGenerate, isGenerating }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const samplePrompts = [
    "Create a user dashboard with recent activity and notifications",
    "Build a product catalog with search and filtering",
    "Generate a customer feedback form with ratings",
    "Design a team collaboration workspace"
  ];

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wand2 className="w-5 h-5 text-purple-600" />
          <span>Describe Your Application</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe the application you want to build in plain English. For example: 'Create a dashboard that shows sales metrics and allows users to filter by date range...'"
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
              Generating Application...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Application
            </>
          )}
        </Button>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Sample Prompts:</p>
          <div className="space-y-1">
            {samplePrompts.map((sample, index) => (
              <button
                key={index}
                onClick={() => setPrompt(sample)}
                className="text-left text-sm text-blue-600 hover:text-blue-800 hover:underline block w-full"
              >
                "{sample}"
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
