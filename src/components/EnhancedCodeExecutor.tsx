
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { IframeSandbox } from './IframeSandbox';
import { ModuleLoader } from './ModuleLoader';
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
  const [modules, setModules] = useState<string[]>([]);
  const [loadedModules, setLoadedModules] = useState<Record<string, any>>({});

  // Update current code when prop changes
  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  // Extract required modules from code
  useEffect(() => {
    const extractModules = (codeString: string): string[] => {
      const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
      const requireRegex = /require\(['"]([^'"]+)['"]\)/g;
      const modules: string[] = [];
      
      let match;
      while ((match = importRegex.exec(codeString)) !== null) {
        modules.push(match[1]);
      }
      while ((match = requireRegex.exec(codeString)) !== null) {
        modules.push(match[1]);
      }
      
      return [...new Set(modules)];
    };

    const requiredModules = extractModules(currentCode);
    setModules(requiredModules);
  }, [currentCode]);

  const handleCodeChange = (newCode: string) => {
    setCurrentCode(newCode);
    setError(null);
  };

  const handleExecutionError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleExecutionSuccess = () => {
    setError(null);
  };

  const handleModulesLoaded = (loadedMods: Record<string, any>) => {
    setLoadedModules(loadedMods);
  };

  const handleModuleError = (errorMessage: string) => {
    setError(`Module loading error: ${errorMessage}`);
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

      {/* Module Loader */}
      <ModuleLoader
        modules={modules}
        onLoaded={handleModulesLoaded}
        onError={handleModuleError}
      />

      {/* Live Update Manager */}
      {enableLiveUpdates && (
        <LiveUpdateManager
          code={currentCode}
          onCodeChange={handleCodeChange}
        />
      )}

      {/* Code Execution - Sandbox Only */}
      <div className="flex-1 overflow-hidden">
        <IframeSandbox
          code={currentCode}
          onError={handleExecutionError}
          onSuccess={handleExecutionSuccess}
        />
      </div>
    </div>
  );
};
