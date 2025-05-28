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
      
      // Clean the code more carefully
      let cleanCode = code;
      
      // Remove markdown code blocks
      cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      
      // Remove import statements
      cleanCode = cleanCode.replace(/^import\s+.*?from\s+['"'][^'"]*['"];?\s*$/gm, '');
      
      // Remove export statements  
      cleanCode = cleanCode.replace(/^export\s+default\s+\w+;?\s*$/gm, '');
      cleanCode = cleanCode.replace(/^export\s+\{[^}]*\};?\s*$/gm, '');
      
      // Remove interface definitions completely
      cleanCode = cleanCode.replace(/^interface\s+\w+Props\s*\{\s*\}\s*$/gm, '');
      cleanCode = cleanCode.replace(/^interface\s+\w+[^{]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\s*$/gm, '');
      cleanCode = cleanCode.replace(/^type\s+\w+[^=]*=[^;]*;?\s*$/gm, '');
      
      // Remove React.FC type annotations only
      cleanCode = cleanCode.replace(/:\s*React\.FC<[^>]*>/g, '');
      cleanCode = cleanCode.replace(/:\s*React\.FC/g, '');
      
      // Remove useState type parameters only
      cleanCode = cleanCode.replace(/useState<[^>]*>/g, 'useState');
      
      // Remove parameter type annotations more carefully
      cleanCode = cleanCode.replace(/\(([^)]*?)\s*:\s*[^)]*\)/g, (match, params) => {
        // If it's an event parameter, keep the parameter name
        if (params.includes('e') || params.includes('event')) {
          const paramName = params.split(':')[0].trim();
          return `(${paramName})`;
        }
        return '()';
      });
      
      // Remove variable type annotations  
      cleanCode = cleanCode.replace(/const\s+(\w+)\s*:\s*[^=]+=/, 'const $1 =');
      cleanCode = cleanCode.replace(/let\s+(\w+)\s*:\s*[^=]+=/, 'let $1 =');
      
      // Remove remaining angle bracket generics but be careful not to touch JSX
      cleanCode = cleanCode.replace(/\w+<\w+[^>]*>/g, (match) => {
        // Don't touch JSX tags
        if (match.includes('</') || match.startsWith('<')) {
          return match;
        }
        // Remove the generic part
        return match.split('<')[0];
      });
      
      // Clean up extra whitespace
      cleanCode = cleanCode.replace(/\n\s*\n/g, '\n').trim();
      
      console.log('Cleaned code:', cleanCode);

      // Find component name
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
