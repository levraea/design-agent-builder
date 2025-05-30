
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
      
      // Clean code (remove markdown if present)
      let cleanCode = code;
      if (cleanCode.includes('```')) {
        cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      }

      // Create the iframe content with all necessary dependencies
      const iframeContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Live Preview</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/recharts@2.12.7/umd/Recharts.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              margin: 0; 
              padding: 16px; 
              font-family: system-ui, -apple-system, sans-serif;
              background: white;
              min-height: 100vh;
            }
            .error { 
              color: #dc2626; 
              background: #fef2f2; 
              padding: 12px; 
              border-radius: 6px; 
              border: 1px solid #fecaca;
              margin: 16px;
            }
            #root {
              min-height: calc(100vh - 32px);
            }
          </style>
        </head>
        <body>
          <div id="root">Loading...</div>
          <script>
            // Error handling wrapper
            window.onerror = function(msg, url, lineNo, columnNo, error) {
              console.error('Global error:', error);
              const rootEl = document.getElementById('root');
              if (rootEl) {
                rootEl.innerHTML = '<div class="error"><strong>Runtime Error:</strong> ' + msg + '</div>';
              }
              window.parent.postMessage({ 
                type: 'error', 
                message: msg,
                stack: error ? error.stack : 'No stack trace available'
              }, '*');
              return true;
            };

            window.addEventListener('unhandledrejection', function(event) {
              console.error('Unhandled promise rejection:', event.reason);
              const rootEl = document.getElementById('root');
              if (rootEl) {
                rootEl.innerHTML = '<div class="error"><strong>Promise Error:</strong> ' + event.reason + '</div>';
              }
              window.parent.postMessage({ 
                type: 'error', 
                message: 'Promise rejection: ' + event.reason
              }, '*');
            });

            try {
              // Wait for all dependencies to load
              function waitForDependencies(callback) {
                let attempts = 0;
                const maxAttempts = 50;
                
                function check() {
                  attempts++;
                  if (window.React && window.ReactDOM && window.Recharts) {
                    callback();
                  } else if (attempts < maxAttempts) {
                    setTimeout(check, 100);
                  } else {
                    throw new Error('Failed to load required dependencies (React, ReactDOM, Recharts)');
                  }
                }
                check();
              }

              waitForDependencies(() => {
                try {
                  const { useState, useEffect, useMemo, useCallback } = React;
                  
                  // Expose Recharts components globally
                  const { 
                    LineChart, 
                    BarChart, 
                    AreaChart, 
                    PieChart, 
                    XAxis, 
                    YAxis, 
                    CartesianGrid, 
                    Tooltip, 
                    Legend, 
                    ResponsiveContainer,
                    Line,
                    Bar,
                    Area,
                    Pie,
                    Cell
                  } = Recharts;
                  
                  // Make Recharts available globally
                  window.LineChart = LineChart;
                  window.BarChart = BarChart;
                  window.AreaChart = AreaChart;
                  window.PieChart = PieChart;
                  window.XAxis = XAxis;
                  window.YAxis = YAxis;
                  window.CartesianGrid = CartesianGrid;
                  window.Tooltip = Tooltip;
                  window.Legend = Legend;
                  window.ResponsiveContainer = ResponsiveContainer;
                  window.Line = Line;
                  window.Bar = Bar;
                  window.Area = Area;
                  window.Pie = Pie;
                  window.Cell = Cell;
                  
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

                  // Execute the generated code
                  ${cleanCode}

                  // Render the component
                  if (typeof GeneratedApp === 'function') {
                    const root = ReactDOM.createRoot(document.getElementById('root'));
                    root.render(React.createElement(GeneratedApp));
                    
                    // Signal success to parent
                    setTimeout(() => {
                      window.parent.postMessage({ type: 'success' }, '*');
                    }, 100);
                  } else {
                    throw new Error('GeneratedApp is not a valid React component');
                  }
                } catch (error) {
                  console.error('Component execution error:', error);
                  const rootEl = document.getElementById('root');
                  if (rootEl) {
                    rootEl.innerHTML = \`<div class="error"><strong>Component Error:</strong> \${error.message}</div>\`;
                  }
                  
                  // Signal error to parent
                  window.parent.postMessage({ 
                    type: 'error', 
                    message: error.message,
                    stack: error.stack 
                  }, '*');
                }
              });
            } catch (error) {
              console.error('Initialization error:', error);
              const rootEl = document.getElementById('root');
              if (rootEl) {
                rootEl.innerHTML = \`<div class="error"><strong>Initialization Error:</strong> \${error.message}</div>\`;
              }
              
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

      // Write content to iframe using srcdoc for better control
      iframe.srcdoc = iframeContent;
      
      // Set up a timeout to handle cases where the iframe never responds
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setError('Preview timeout - the code may have an infinite loop or other issue');
        onError?.('Preview timeout');
      }, 10000);

      // Clear timeout if we get a response
      const clearTimeoutOnMessage = () => {
        clearTimeout(timeoutId);
      };

      iframe.onload = clearTimeoutOnMessage;
      
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
