
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
      console.log('Original code:', code);
      
      // Clean the code more carefully
      let cleanCode = code;
      
      // Remove markdown code blocks if present
      cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      
      // Remove import statements but preserve the rest
      cleanCode = cleanCode.replace(/^import\s+.*?from\s+['"'][^'"]*['"];?\s*$/gm, '');
      
      // Remove interface/type definitions that might cause issues
      cleanCode = cleanCode.replace(/^interface\s+\w+Props\s*\{[^}]*\}\s*$/gm, '');
      
      // Find the component function/const
      let componentMatch = cleanCode.match(/(?:const|function)\s+(\w+)[^{]*\{/);
      let componentName = componentMatch ? componentMatch[1] : 'GeneratedApp';
      
      // Remove export statements
      cleanCode = cleanCode.replace(/^export\s+default\s+\w+;?\s*$/gm, '');
      cleanCode = cleanCode.replace(/^export\s+\{[^}]*\};?\s*$/gm, '');
      
      // If the code doesn't have a return statement for the component, add one
      if (!cleanCode.includes(`return ${componentName}`)) {
        cleanCode += `\nreturn ${componentName};`;
      }

      console.log('Cleaned code:', cleanCode);

      // Create execution context with all necessary React features and components
      const contextKeys = [
        'React', 'useState', 'useEffect', 'useMemo', 'useCallback',
        'Card', 'CardHeader', 'CardTitle', 'CardContent', 'Button', 'Input'
      ];
      
      const contextValues = [
        React, 
        React.useState, 
        React.useEffect, 
        React.useMemo, 
        React.useCallback,
        Card, 
        CardHeader, 
        CardTitle, 
        CardContent, 
        Button, 
        Input
      ];

      // Create and execute the function
      const func = new Function(...contextKeys, cleanCode);
      const ComponentResult = func(...contextValues);
      
      if (typeof ComponentResult === 'function') {
        // Test render the component to catch any immediate errors
        React.createElement(ComponentResult);
        setComponent(() => ComponentResult);
      } else {
        throw new Error('Code did not return a valid React component function');
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
          <p className="text-sm mt-1">Generate an application to see the preview</p>
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
    console.error('Render error:', renderError);
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
