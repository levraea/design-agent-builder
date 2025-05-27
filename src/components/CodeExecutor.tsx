
import React, { useState, useEffect, useMemo } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CodeExecutorProps {
  code: string;
}

export const CodeExecutor = ({ code }: CodeExecutorProps) => {
  const [error, setError] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  const executeCode = useMemo(() => {
    if (!code.trim()) return null;

    try {
      setError(null);
      
      // Create a safe execution context with available imports
      const context = {
        React,
        useState: React.useState,
        useEffect: React.useEffect,
        useMemo: React.useMemo,
        useCallback: React.useCallback,
        // Provide shadcn components directly
        Card,
        CardHeader,
        CardTitle,
        CardContent,
        Button,
        Input,
      };

      // Transform the code to remove imports and use context variables
      let transformedCode = code
        .replace(/import.*from.*['"][^'"]*['"];?\s*/g, '') // Remove import statements
        .replace(/export default (\w+);?/, 'return $1;'); // Replace export with return

      // If the code doesn't have a return statement, assume it's a component definition
      if (!transformedCode.includes('return ')) {
        transformedCode = `${transformedCode}\nreturn GeneratedApp;`;
      }

      // Create the function with the context
      const contextKeys = Object.keys(context);
      const contextValues = Object.values(context);
      
      const func = new Function(...contextKeys, transformedCode);
      const ComponentResult = func(...contextValues);
      
      if (typeof ComponentResult === 'function') {
        setComponent(() => ComponentResult);
      } else {
        setError('Generated code did not return a valid React component');
      }
    } catch (err) {
      console.error('Code execution error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setComponent(null);
    }
  }, [code]);

  useEffect(() => {
    executeCode;
  }, [executeCode]);

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Code Execution Error:</strong> {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <p>No valid component to render</p>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="h-full overflow-auto">
        <Component />
      </div>
    );
  } catch (renderError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Render Error:</strong> {renderError instanceof Error ? renderError.message : 'Component failed to render'}
        </AlertDescription>
      </Alert>
    );
  }
};
