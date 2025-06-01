
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { SandpackExecutor } from './SandpackExecutor';
import { LiveUpdateManager } from './LiveUpdateManager';

interface EnhancedCodeExecutorProps {
  code: string;
  enableLiveUpdates?: boolean;
}

export const EnhancedCodeExecutor = ({ 
  code, 
  enableLiveUpdates = true 
}: EnhancedCodeExecutorProps) => {
  const [currentCode, setCurrentCode] = useState(code);
  const [error, setError] = useState<string | null>(null);

  // Update current code when prop changes
  useEffect(() => {
    setCurrentCode(code);
    setError(null); // Clear any previous errors
  }, [code]);

  const handleCodeChange = (newCode: string) => {
    setCurrentCode(newCode);
    setError(null);
  };

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

      {/* Live Update Manager */}
      {enableLiveUpdates && (
        <LiveUpdateManager
          code={currentCode}
          onCodeChange={handleCodeChange}
        />
      )}

      {/* Sandpack Code Execution */}
      <div className="flex-1 overflow-hidden">
        <SandpackExecutor code={currentCode} />
      </div>
    </div>
  );
};
