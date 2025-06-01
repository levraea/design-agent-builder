
import { Sandpack } from '@codesandbox/sandpack-react';
import { Monitor, Code } from 'lucide-react';
import { generateSandpackFiles } from '@/utils/sandpackFileGenerator';

interface SandpackDisplayProps {
  code: string;
  isGenerating: boolean;
}

export const SandpackDisplay = ({ code, isGenerating }: SandpackDisplayProps) => {
  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">Generating Application...</p>
          <p className="text-sm text-gray-500 mt-2">
            AI is creating your code and preview
          </p>
        </div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Code className="w-12 h-12 text-gray-400" />
            <Monitor className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Code & Preview</h3>
          <p>Your generated code and live preview will appear here</p>
          <p className="text-sm mt-2">Enter a prompt and generate to see the results</p>
        </div>
      </div>
    );
  }

  const files = generateSandpackFiles(code);

  return (
    <div className="h-full w-full">
      <Sandpack
        template="react"
        files={files}
        options={{
          showNavigator: false,
          showTabs: true,
          showLineNumbers: true,
          showInlineErrors: true,
          wrapContent: true,
          autorun: true,
          editorWidthPercentage: 50
        }}
        theme="light"
        customSetup={{
          dependencies: {
            "react": "^18.0.0",
            "react-dom": "^18.0.0",
            "recharts": "^2.12.7"
          }
        }}
      />
    </div>
  );
};
