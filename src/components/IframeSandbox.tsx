
import React, { useRef, useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface IframeSandboxProps {
  code: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export const IframeSandbox = ({ code, onError, onSuccess }: IframeSandboxProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!code.trim() || !iframeRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (!iframeDoc) {
        throw new Error('Cannot access iframe document');
      }

      // Clean code (remove markdown if present)
      let cleanCode = code;
      if (cleanCode.includes('```')) {
        cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      }

      // Create the iframe content with JSX transpilation support
      const iframeContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Live Preview</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; }
            .error { color: #dc2626; background: #fef2f2; padding: 12px; border-radius: 6px; border: 1px solid #fecaca; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            try {
              const { useState, useEffect, useMemo, useCallback } = React;
              
              // Mock UI components for the sandbox
              const Card = ({ children, className = '' }) => 
                React.createElement('div', { className: \`bg-white border rounded-lg shadow-sm \${className}\` }, children);
              
              const CardHeader = ({ children, className = '' }) => 
                React.createElement('div', { className: \`px-6 py-4 border-b \${className}\` }, children);
              
              const CardTitle = ({ children, className = '' }) => 
                React.createElement('h3', { className: \`text-lg font-semibold \${className}\` }, children);
              
              const CardContent = ({ children, className = '' }) => 
                React.createElement('div', { className: \`px-6 py-4 \${className}\` }, children);
              
              const Button = ({ children, onClick, disabled, className = '' }) => 
                React.createElement('button', { 
                  onClick, 
                  disabled,
                  className: \`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 \${className}\`
                }, children);
              
              const Input = ({ placeholder, value, onChange, className = '' }) => 
                React.createElement('input', { 
                  placeholder, 
                  value, 
                  onChange,
                  className: \`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 \${className}\`
                });

              // Transpile JSX to JavaScript using Babel
              const jsxCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
              
              const transformedCode = Babel.transform(jsxCode, {
                presets: ['react']
              }).code;

              // Execute the transpiled code
              eval(transformedCode);

              // Render the component
              if (typeof GeneratedApp === 'function') {
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(GeneratedApp));
                
                // Signal success to parent
                window.parent.postMessage({ type: 'success' }, '*');
              } else {
                throw new Error('GeneratedApp is not a valid React component');
              }
            } catch (error) {
              console.error('Execution error:', error);
              document.getElementById('root').innerHTML = 
                \`<div class="error"><strong>Error:</strong> \${error.message}</div>\`;
              
              // Signal error to parent
              window.parent.postMessage({ 
                type: 'error', 
                message: error.message,
                stack: error.stack 
              }, '*');
            }
          </script>
        </body>
        </html>
      `;

      // Write content to iframe
      iframeDoc.open();
      iframeDoc.write(iframeContent);
      iframeDoc.close();

      setIsLoading(false);
      onSuccess?.();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      onError?.(errorMessage);
    }
  }, [code, onError, onSuccess]);

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'error') {
        setError(event.data.message);
        onError?.(event.data.message);
      } else if (event.data.type === 'success') {
        setError(null);
        onSuccess?.();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onError, onSuccess]);

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Sandbox Error:</strong> {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-sm text-gray-600">Loading preview...</div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        title="Code Preview"
      />
    </div>
  );
};
