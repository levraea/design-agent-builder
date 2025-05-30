
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Wifi, WifiOff, History } from 'lucide-react';
import { IframeSandbox } from './IframeSandbox';
import { ModuleLoader } from './ModuleLoader';
import { WebSocketManager } from './WebSocketManager';
import { CodeTransformer } from './CodeTransformer';
import { PreviewStateManager } from './PreviewStateManager';

interface AdvancedCodeExecutorProps {
  code: string;
  enableLiveUpdates?: boolean;
  enableWebSocket?: boolean;
  enableTransformation?: boolean;
}

export const AdvancedCodeExecutor = ({ 
  code, 
  enableLiveUpdates = true,
  enableWebSocket = false,
  enableTransformation = false
}: AdvancedCodeExecutorProps) => {
  const [currentCode, setCurrentCode] = useState(code);
  const [transformedCode, setTransformedCode] = useState(code);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [modules, setModules] = useState<string[]>([]);
  const [previewState, setPreviewState] = useState<any>(null);

  // Update current code when prop changes
  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  // Extract required modules from code
  useEffect(() => {
    const extractModules = (codeString: string): string[] => {
      const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
      const modules: string[] = [];
      let match;
      while ((match = importRegex.exec(codeString)) !== null) {
        modules.push(match[1]);
      }
      return [...new Set(modules)];
    };

    const requiredModules = extractModules(currentCode);
    setModules(requiredModules);
  }, [currentCode]);

  const handleCodeUpdate = (newCode: string) => {
    setCurrentCode(newCode);
    setError(null);
  };

  const handleTransformed = (transformed: string) => {
    setTransformedCode(transformed);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
  };

  const handleStateChange = (state: any) => {
    setPreviewState(state);
  };

  const displayCode = enableTransformation ? transformedCode : currentCode;

  if (!currentCode.trim()) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No code to execute</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 border-b bg-gray-50">
        <div className="flex items-center space-x-3">
          {enableWebSocket && (
            <div className="flex items-center space-x-1">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-600" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-600" />
              )}
              <span className="text-xs text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          )}
          
          {modules.length > 0 && (
            <span className="text-xs text-gray-600">
              Modules: {modules.slice(0, 3).join(', ')}{modules.length > 3 ? '...' : ''}
            </span>
          )}
          
          {previewState && (
            <div className="flex items-center space-x-1">
              <History className="w-3 h-3 text-blue-600" />
              <span className="text-xs text-blue-600">v{previewState.version}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {enableTransformation && (
            <span className="text-xs text-purple-600">● Transform</span>
          )}
          {enableLiveUpdates && (
            <span className="text-xs text-green-600">● Live</span>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="m-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Error:</strong> {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Managers */}
      <ModuleLoader
        modules={modules}
        onLoaded={() => {}}
        onError={handleError}
      />

      {enableWebSocket && (
        <WebSocketManager
          onCodeUpdate={handleCodeUpdate}
          onConnectionChange={handleConnectionChange}
        />
      )}

      {enableTransformation && (
        <CodeTransformer
          code={currentCode}
          onTransformed={handleTransformed}
          onError={handleError}
        />
      )}

      <PreviewStateManager
        currentCode={currentCode}
        onStateChange={handleStateChange}
      />

      {/* Code Execution */}
      <div className="flex-1 overflow-hidden">
        <IframeSandbox
          code={displayCode}
          onError={handleError}
          onSuccess={() => setError(null)}
        />
      </div>
    </div>
  );
};
