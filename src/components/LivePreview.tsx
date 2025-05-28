
import { Monitor, Loader2 } from 'lucide-react';
import { CodeExecutor } from './CodeExecutor';

interface LivePreviewProps {
  code: string;
  isGenerating: boolean;
}

export const LivePreview = ({ code, isGenerating }: LivePreviewProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-white overflow-auto">
        {isGenerating ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
              <p className="text-lg font-medium text-gray-700">Generating Application...</p>
              <p className="text-sm text-gray-500 mt-2">
                AI is analyzing your prompt and selecting the best APIs and components
              </p>
            </div>
          </div>
        ) : code ? (
          <CodeExecutor code={code} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Live Preview</h3>
              <p>Your generated application will appear here</p>
              <p className="text-sm mt-2">Enter a prompt to start building</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
