

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
      console.log('Original code:', code);
      
      // Use the code exactly as returned by AI - minimal manipulation
      let cleanCode = code;
      
      // Only remove markdown code blocks if present
      if (cleanCode.includes('```')) {
        cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      }
      
      // Remove import statements since we provide dependencies directly
      cleanCode = cleanCode.replace(/^import\s+.*?;\s*$/gm, '');
      
      // Remove export statements
      cleanCode = cleanCode.replace(/^export\s+default\s+\w+;\s*$/gm, '');
      cleanCode = cleanCode.replace(/^export\s+\{.*?\}.*?;\s*$/gm, '');
      
      // Remove TypeScript interfaces and type definitions
      cleanCode = cleanCode.replace(/^interface\s+\w+.*?\{[\s\S]*?\}\s*$/gm, '');
      cleanCode = cleanCode.replace(/^type\s+\w+.*?=[\s\S]*?;\s*$/gm, '');
      
      // Remove TypeScript type annotations from function parameters and variables
      cleanCode = cleanCode.replace(/:\s*React\.FC<[^>]*>/g, '');
      cleanCode = cleanCode.replace(/:\s*React\.ComponentType<[^>]*>/g, '');
      cleanCode = cleanCode.replace(/:\s*string\b/g, '');
      cleanCode = cleanCode.replace(/:\s*number\b/g, '');
      cleanCode = cleanCode.replace(/:\s*boolean\b/g, '');
      cleanCode = cleanCode.replace(/:\s*React\.ChangeEvent<[^>]*>/g, '');
      
      // Clean up extra whitespace
      cleanCode = cleanCode.trim();
      
      console.log('Code after cleaning:', cleanCode);

      // Instead of trying to execute JSX directly, let's try a different approach
      // We'll wrap the code in a way that makes it executable
      const executableCode = `
        return function GeneratedComponent(props) {
          ${cleanCode.replace(/^const\s+\w+\s*=/, 'return')}
        };
      `;
      
      console.log('Executable code:', executableCode);

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
        executableCode
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
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
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

