
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
      console.log('Executing JavaScript code:', code);

      // Remove any markdown code blocks if present
      let cleanCode = code;
      if (cleanCode.includes('```')) {
        cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      }

      console.log('Clean executable code:', cleanCode);

      // Create a context with all the React dependencies
      const context = {
        React,
        useState: React.useState,
        useEffect: React.useEffect,
        useMemo: React.useMemo,
        useCallback: React.useCallback,
        Card,
        CardHeader,
        CardTitle,
        CardContent,
        Button,
        Input
      };

      // Use eval with proper context
      const wrappedCode = `
        (function() {
          const { React, useState, useEffect, useMemo, useCallback, Card, CardHeader, CardTitle, CardContent, Button, Input } = arguments[0];
          ${cleanCode}
          return GeneratedApp;
        })
      `;

      const componentFactory = eval(wrappedCode);
      const GeneratedComponent = componentFactory(context);

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
    <div className="h-full min-h-full flex flex-col">
      <ErrorBoundary>
        <div className="flex-1 flex flex-col min-h-0">
          <Component />
        </div>
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
