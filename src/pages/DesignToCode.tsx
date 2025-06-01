
import { useState } from 'react';
import { Code } from 'lucide-react';
import { useCodeGeneration } from '@/hooks/useCodeGeneration';
import { DesignControlPanel } from '@/components/DesignControlPanel';
import { SandpackDisplay } from '@/components/SandpackDisplay';
import { Persona } from '@/types/persona';

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

  const onGenerate = (prompt: string, persona?: Persona | null) => {
    handleGenerateApp(prompt, selectedAPIs, selectedComponents, onModuleComplete, persona);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/5 via-brand-green/5 to-brand-red/5">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
            <Code className="w-8 h-8 text-brand-blue" />
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">Design-to-Code Generation</span>
          </h1>
          <p className="text-gray-600">Generate front end code, aligned to Bayer Design Principles using preferred tech stack and headless architecture</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Left Panel - Controls (1/3 width) */}
          <div className="lg:col-span-1">
            <DesignControlPanel
              selectedAPIs={selectedAPIs}
              onAPISelectionChange={setSelectedAPIs}
              selectedComponents={selectedComponents}
              onComponentSelectionChange={setSelectedComponents}
              conversationHistory={conversationHistory}
              onGenerate={onGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Panel - Sandpack Code & Preview (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
              <SandpackDisplay
                code={generatedCode}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignToCode;
