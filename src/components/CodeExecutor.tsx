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
    if (!code.trim()) {
      setComponent(null);
      setError(null);
      return;
    }

    try {
      setError(null);
      console.log('Executing code:', code);
      
      // Clean the code
      let cleanCode = code;
      
      // Remove markdown code blocks
      cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      
      // Remove import statements
      cleanCode = cleanCode.replace(/^import\s+.*?from\s+['"'][^'"]*['"];?\s*$/gm, '');
      
      // Remove export statements
      cleanCode = cleanCode.replace(/^export\s+default\s+\w+;?\s*$/gm, '');
      cleanCode = cleanCode.replace(/^export\s+\{[^}]*\};?\s*$/gm, '');
      
      // Remove interface/type definitions
      cleanCode = cleanCode.replace(/^interface\s+\w+[^{]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\s*$/gm, '');
      cleanCode = cleanCode.replace(/^type\s+\w+[^=]*=[^;]*;?\s*$/gm, '');
      
      // Remove TypeScript type annotations but preserve the structure
      // Remove React.FC type annotations
      cleanCode = cleanCode.replace(/:\s*React\.FC<[^>]*>/g, '');
      
      // Remove function parameter types but keep the parameter names and structure
      cleanCode = cleanCode.replace(/\(([^)]*?):\s*[^)]*\)/g, (match, params) => {
        // Keep parameter names, remove types
        const cleanParams = params.replace(/\w+:\s*[^,)]+/g, (paramMatch) => {
          return paramMatch.split(':')[0].trim();
        });
        return `(${cleanParams})`;
      });
      
      // Remove variable type annotations but keep the variable declarations
      cleanCode = cleanCode.replace(/const\s+(\w+):\s*[^=]+=/, 'const $1 =');
      cleanCode = cleanCode.replace(/let\s+(\w+):\s*[^=]+=/, 'let $1 =');
      cleanCode = cleanCode.replace(/var\s+(\w+):\s*[^=]+=/, 'var $1 =');
      
      // Remove useState type annotations
      cleanCode = cleanCode.replace(/useState<[^>]*>/g, 'useState');
      
      // Remove generic type parameters
      cleanCode = cleanCode.replace(/<[^>]*>/g, '');
      
      // Clean up extra whitespace but preserve line structure for JSX
      cleanCode = cleanCode.replace(/\n\s*\n/g, '\n');
      
      console.log('Cleaned code:', cleanCode);

      // Find component name - look for const or function declarations
      const componentMatch = cleanCode.match(/(?:const|function)\s+(\w+)/);
      const componentName = componentMatch ? componentMatch[1] : 'GeneratedApp';
      
      // Ensure the code returns the component
      if (!cleanCode.includes(`return ${componentName}`)) {
        cleanCode += `\nreturn ${componentName};`;
      }

      // Create the component function with all necessary dependencies
      const componentFactory = new Function(
        'React',
        'useState',
        'useEffect', 
        'useMemo',
        'useCallback',
        'Card',
        'CardHeader',
        'CardTitle',
        'CardContent',
        'Button',
        'Input',
        cleanCode
      );

      // Execute with dependencies
      const GeneratedComponent = componentFactory(
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
      );

      // Validate it's a function
      if (typeof GeneratedComponent !== 'function') {
        throw new Error('Generated code did not return a valid React component');
      }

      setComponent(() => GeneratedComponent);
      
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

  return (
    <div className="h-full overflow-auto">
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </div>
  );
};

// Error boundary component to catch render errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Render Error:</strong> {this.state.error?.message || 'Component failed to render'}
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
