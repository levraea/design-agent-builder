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
          <PromptInput 
            onGenerate={onGenerate}
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
