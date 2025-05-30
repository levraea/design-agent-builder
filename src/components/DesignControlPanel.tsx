
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConversationHistory } from '@/components/ConversationHistory';
import { PromptInput } from '@/components/PromptInput';
import { APIRegistry } from '@/components/APIRegistry';
import { ComponentLibrary } from '@/components/ComponentLibrary';
import { ConversationMessage } from '@/types/conversation';

interface DesignControlPanelProps {
  selectedAPIs: string[];
  onAPISelectionChange: (apis: string[]) => void;
  selectedComponents: string[];
  onComponentSelectionChange: (components: string[]) => void;
  conversationHistory: ConversationMessage[];
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export const DesignControlPanel = ({
  selectedAPIs,
  onAPISelectionChange,
  selectedComponents,
  onComponentSelectionChange,
  conversationHistory,
  onGenerate,
  isGenerating
}: DesignControlPanelProps) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = (promptText: string) => {
    onGenerate(promptText);
    setPrompt(''); // Clear prompt after submission
  };

  // Show info about API usage when generating
  const getAPIUsageInfo = () => {
    if (selectedAPIs.length === 0) {
      return "APIs will be automatically selected based on your prompt";
    }
    return `Using ${selectedAPIs.length} selected API${selectedAPIs.length === 1 ? '' : 's'}`;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-4 space-y-4">
          <ConversationHistory messages={conversationHistory} />
          {isGenerating && (
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border">
              <p>🤖 {getAPIUsageInfo()}</p>
            </div>
          )}
          <PromptInput 
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            conversationHistory={conversationHistory}
          />
        </TabsContent>
        
        <TabsContent value="apis" className="mt-4">
          <APIRegistry 
            selectedAPIs={selectedAPIs}
            onSelectionChange={onAPISelectionChange}
          />
        </TabsContent>
        
        <TabsContent value="components" className="mt-4">
          <ComponentLibrary
            selectedComponents={selectedComponents}
            onSelectionChange={onComponentSelectionChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
