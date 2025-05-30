
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
    if (!code.trim() || !iframeRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const iframe = iframeRef.current;
      
      // Clean code (remove markdown if present)
      let cleanCode = code;
      if (cleanCode.includes('```')) {
        cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      }

      // Create the iframe content with simplified execution
      const iframeContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Live Preview</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              margin: 0; 
              padding: 16px; 
              font-family: system-ui, -apple-system, sans-serif;
              background: white;
            }
            .error { 
              color: #dc2626; 
              background: #fef2f2; 
              padding: 12px; 
              border-radius: 6px; 
              border: 1px solid #fecaca; 
              margin: 16px;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            try {
              const { useState, useEffect, useMemo, useCallback } = React;
              
              // Mock UI components for the sandbox
              const Card = ({ children, className = '' }) => 
                React.createElement('div', { className: \`bg-white border rounded-lg shadow-sm p-4 \${className}\` }, children);
              
              const CardHeader = ({ children, className = '' }) => 
                React.createElement('div', { className: \`mb-4 \${className}\` }, children);
              
              const CardTitle = ({ children, className = '' }) => 
                React.createElement('h3', { className: \`text-lg font-semibold \${className}\` }, children);
              
              const CardContent = ({ children, className = '' }) => 
                React.createElement('div', { className: className }, children);
              
              const Button = ({ children, onClick, disabled, className = '' }) => 
                React.createElement('button', { 
                  onClick, 
                  disabled,
                  className: \`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors \${className}\`
                }, children);
              
              const Input = ({ placeholder, value, onChange, className = '' }) => 
                React.createElement('input', { 
                  placeholder, 
                  value, 
                  onChange,
                  className: \`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full \${className}\`
                });

              const Select = ({ children, value, onChange, className = '' }) => 
                React.createElement('select', { 
                  value, 
                  onChange: (e) => onChange && onChange(e.target.value),
                  className: \`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full \${className}\`
                }, children);

              const Option = ({ children, value }) => 
                React.createElement('option', { value }, children);

              // Execute the generated code
              ${cleanCode}

              // Render the component
              const root = ReactDOM.createRoot(document.getElementById('root'));
              
              if (typeof GeneratedApp === 'function') {
                root.render(React.createElement(GeneratedApp));
                window.parent.postMessage({ type: 'success' }, '*');
              } else {
                // Fallback: try to find any exported function or render simple content
                const rootElement = document.getElementById('root');
                rootElement.innerHTML = '<div class="p-4 text-center text-gray-600">Preview loaded successfully</div>';
                window.parent.postMessage({ type: 'success' }, '*');
              }
            } catch (error) {
              console.error('Execution error:', error);
              const rootElement = document.getElementById('root');
              rootElement.innerHTML = 
                \`<div class="error"><strong>Error:</strong> \${error.message}</div>\`;
              
              window.parent.postMessage({ 
                type: 'error', 
                message: error.message 
              }, '*');
            }
          </script>
        </body>
        </html>
      `;

      // Set a timeout to ensure loading doesn't get stuck
      const loadTimeout = setTimeout(() => {
        setIsLoading(false);
        setError('Preview loading timeout');
        onError?.('Preview loading timeout');
      }, 5000);

      // Handle iframe load
      const handleLoad = () => {
        clearTimeout(loadTimeout);
        // Give the iframe a moment to execute the script
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      };

      iframe.onload = handleLoad;
      iframe.srcdoc = iframeContent;

      return () => {
        clearTimeout(loadTimeout);
      };

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
        setIsLoading(false);
        onError?.(event.data.message);
      } else if (event.data.type === 'success') {
        setError(null);
        setIsLoading(false);
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
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Loading preview...</div>
          </div>
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
