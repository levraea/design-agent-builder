
import { useState } from 'react';
import { Code } from 'lucide-react';
import { useCodeGeneration } from '@/hooks/useCodeGeneration';
import { DesignControlPanel } from '@/components/DesignControlPanel';
import { PreviewPanel } from '@/components/PreviewPanel';

interface DesignToCodeProps {
  onModuleComplete?: (moduleUrl: string) => void;
}

const DesignToCode = ({ onModuleComplete }: DesignToCodeProps) => {
  const [selectedAPIs, setSelectedAPIs] = useState<string[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  
  const {
    generatedCode,
    isGenerating,
    conversationHistory,
    handleGenerateApp
  } = useCodeGeneration();

  const onGenerate = (prompt: string) => {
    handleGenerateApp(prompt, selectedAPIs, selectedComponents, onModuleComplete);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
            <Code className="w-8 h-8 text-blue-600" />
            <span>Design-to-Code Generation</span>
          </h1>
          <p className="text-gray-600">Generate front end code, aligned to Bayer Design Principles using preferred tech stack and headless architecture</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)]">
          {/* Left Panel - Controls */}
          <DesignControlPanel
            selectedAPIs={selectedAPIs}
            onAPISelectionChange={setSelectedAPIs}
            selectedComponents={selectedComponents}
            onComponentSelectionChange={setSelectedComponents}
            conversationHistory={conversationHistory}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
          />

          {/* Right Panel - Live Preview and Generated Code */}
          <PreviewPanel
            generatedCode={generatedCode}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignToCode;
