
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
    console.log('IframeSandbox: code changed', { codeLength: code?.length, hasCode: !!code?.trim() });
    
    if (!code?.trim() || !iframeRef.current) {
      console.log('IframeSandbox: no code or iframe, stopping loading');
      setIsLoading(false);
      return;
    }

    console.log('IframeSandbox: starting execution');
    setIsLoading(true);
    setError(null);

    const iframe = iframeRef.current;
    
    // Transform the code to be executable
    const transformedCode = transformCodeForExecution(code);
    
    const iframeContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            margin: 0; 
            padding: 20px; 
            font-family: system-ui, -apple-system, sans-serif;
            background: white;
          }
          .error {
            background: #fee;
            border: 1px solid #fcc;
            color: #c00;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          const { useState, useEffect, useRef, useCallback, useMemo } = React;
          
          try {
            ${transformedCode}
            
            // Create React root and render
            const container = document.getElementById('root');
            const root = ReactDOM.createRoot(container);
            
            // If there's a default export, render it
            if (typeof App !== 'undefined') {
              root.render(React.createElement(App));
            } else if (typeof Component !== 'undefined') {
              root.render(React.createElement(Component));
            } else {
              root.render(React.createElement('div', null, 'Component rendered successfully'));
            }
            
            setTimeout(() => {
              window.parent.postMessage({ type: 'success' }, '*');
            }, 100);
            
          } catch (error) {
            console.error('Execution error:', error);
            const container = document.getElementById('root');
            container.innerHTML = '<div class="error"><strong>Error:</strong> ' + error.message + '</div>';
            window.parent.postMessage({ 
              type: 'error', 
              message: error.message 
            }, '*');
          }
        </script>
      </body>
      </html>
    `;

    const loadTimeout = setTimeout(() => {
      console.log('IframeSandbox: load timeout reached');
      setIsLoading(false);
      setError('Preview loading timeout');
      onError?.('Preview loading timeout');
    }, 10000);

    const handleLoad = () => {
      console.log('IframeSandbox: iframe loaded');
      clearTimeout(loadTimeout);
    };

    iframe.onload = handleLoad;
    iframe.onerror = () => {
      console.log('IframeSandbox: iframe error');
      clearTimeout(loadTimeout);
      setIsLoading(false);
      setError('Failed to load iframe');
      onError?.('Failed to load iframe');
    };

    console.log('IframeSandbox: setting iframe srcdoc');
    iframe.srcdoc = iframeContent;

    return () => {
      console.log('IframeSandbox: cleanup');
      clearTimeout(loadTimeout);
    };

  }, [code]); // Only depend on code

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('IframeSandbox: received message', event.data);
      
      if (event.data.type === 'error') {
        setError(event.data.message);
        setIsLoading(false);
        onError?.(event.data.message);
      } else if (event.data.type === 'success') {
        console.log('IframeSandbox: success message received');
        setError(null);
        setIsLoading(false);
        onSuccess?.();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onError, onSuccess]);

  console.log('IframeSandbox: rendering', { isLoading, error, hasCode: !!code });

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

// Helper function to transform code for execution
function transformCodeForExecution(code: string): string {
  let transformed = code;
  
  // Remove import statements (we'll provide React globally)
  transformed = transformed.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
  
  // Handle export default
  transformed = transformed.replace(/export\s+default\s+function\s+(\w+)/g, 'function App');
  transformed = transformed.replace(/export\s+default\s+(\w+)/g, 'const App = $1');
  
  // Handle const/function component exports
  if (transformed.includes('const ') && !transformed.includes('function App')) {
    const componentMatch = transformed.match(/const\s+(\w+)\s*=/);
    if (componentMatch) {
      transformed = transformed.replace(/const\s+(\w+)\s*=/, 'const App =');
    }
  }
  
  return transformed;
}
