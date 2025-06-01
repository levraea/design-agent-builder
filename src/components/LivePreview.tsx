
import { Monitor, Loader2 } from 'lucide-react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { generateSandpackFiles } from '@/utils/sandpackFileGenerator';

interface LivePreviewProps {
  code: string;
  isGenerating: boolean;
}

export const LivePreview = ({ code, isGenerating }: LivePreviewProps) => {
  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
          <p className="text-lg font-medium text-gray-700">Generating Application...</p>
          <p className="text-sm text-gray-500 mt-2">
            AI is analyzing your prompt and selecting the best APIs and components
          </p>
        </div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">Live Preview</h3>
          <p>Your generated application will appear here</p>
          <p className="text-sm mt-2">Enter a prompt and generate to see the live preview</p>
        </div>
      </div>
    );
  }

  const files = generateSandpackFiles(code);

  return (
    <div className="h-full w-full bg-white">
      <Sandpack
        template="react"
        files={files}
        options={{
          layout: 'preview',
          showNavigator: false,
          showTabs: false,
          showLineNumbers: false,
          showInlineErrors: false,
          showConsole: false,
          showConsoleButton: false,
          autorun: true,
          editorHeight: 0,
          editorWidthPercentage: 0,
        }}
        theme="light"
        customSetup={{
          dependencies: {
            "react": "^18.0.0",
            "react-dom": "^18.0.0"
          }
        }}
      />
    </div>
  );
};
