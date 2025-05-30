
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConversationHistory } from '@/components/ConversationHistory';
import { PromptInput } from '@/components/PromptInput';
import { APIRegistry } from '@/components/APIRegistry';
import { ComponentLibrary } from '@/components/ComponentLibrary';
import { PersonaSelector } from '@/components/PersonaSelector';
import { ConversationMessage } from '@/types/conversation';
import { Persona } from '@/types/persona';

interface DesignControlPanelProps {
  selectedAPIs: string[];
  onAPISelectionChange: (apis: string[]) => void;
  selectedComponents: string[];
  onComponentSelectionChange: (components: string[]) => void;
  conversationHistory: ConversationMessage[];
  onGenerate: (prompt: string, persona?: Persona | null) => void;
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
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const handleGenerate = (promptText: string) => {
    onGenerate(promptText, selectedPersona);
    setPrompt(''); // Clear prompt after submission
  };

  // Show info about API usage when generating
  const getAPIUsageInfo = () => {
    if (selectedAPIs.length === 0) {
      return "APIs will be automatically selected based on your prompt";
    }
    return `Using ${selectedAPIs.length} selected API${selectedAPIs.length === 1 ? '' : 's'}`;
  };

  const getPersonaInfo = () => {
    if (selectedPersona) {
      return `🎯 Generating for: ${selectedPersona.name}`;
    }
    return "💡 No persona selected - generating generic code";
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="persona">Persona</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-4 space-y-4">
          <ConversationHistory messages={conversationHistory} />
          {isGenerating && (
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border space-y-1">
              <p>🤖 {getAPIUsageInfo()}</p>
              <p>{getPersonaInfo()}</p>
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

        <TabsContent value="persona" className="mt-4">
          <PersonaSelector
            selectedPersona={selectedPersona}
            onPersonaSelect={setSelectedPersona}
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
