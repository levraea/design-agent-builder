
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { SandpackExecutor } from './SandpackExecutor';

interface EnhancedCodeExecutorProps {
  code: string;
  enableLiveUpdates?: boolean;
  showPreviewOnly?: boolean;
}

export const EnhancedCodeExecutor = ({ 
  code, 
  enableLiveUpdates = true,
  showPreviewOnly = false
}: EnhancedCodeExecutorProps) => {
  const [currentCode, setCurrentCode] = useState(code);
  const [error, setError] = useState<string | null>(null);

  // Update current code when prop changes
  useEffect(() => {
    setCurrentCode(code);
    setError(null); // Clear any previous errors
  }, [code]);

  if (!currentCode.trim()) {
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

  // If showPreviewOnly is true, only show the Sandpack preview
  if (showPreviewOnly) {
    return (
      <div className="w-full h-full">
        <SandpackExecutor code={currentCode} />
      </div>
    );
  }

  // Original behavior for cases where we want the full interface
  return (
    <div className="w-full h-full flex flex-col">
      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="m-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Execution Error:</strong> {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Sandpack Code Execution */}
      <div className="flex-1 overflow-hidden">
        <SandpackExecutor code={currentCode} />
      </div>
    </div>
  );
};
