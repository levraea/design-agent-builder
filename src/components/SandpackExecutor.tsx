
import { Sandpack } from '@codesandbox/sandpack-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { generateSandpackFiles } from '@/utils/sandpackFileGenerator';

interface SandpackExecutorProps {
  code: string;
}

export const SandpackExecutor = ({ code }: SandpackExecutorProps) => {
  if (!code.trim()) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No code to execute</p>
          <p className="text-sm mt-1">Generate an application to see the preview</p>
        </div>
      </div>
    );
  }

  const files = generateSandpackFiles(code);

  return (
    <div className="h-full">
      <Sandpack
        template="react"
        files={files}
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: true,
          showInlineErrors: true,
          wrapContent: true,
          editorHeight: 400,
          autorun: true,
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
