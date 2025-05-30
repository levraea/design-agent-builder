
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

      // Create the iframe content with reliable CDN dependencies
      const iframeContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Live Preview</title>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
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
              font-family: monospace;
            }
            #root {
              min-height: calc(100vh - 32px);
            }
            .loading {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 200px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div id="root">
            <div class="loading">Loading preview...</div>
          </div>
          <script>
            // Global error handling
            window.onerror = function(msg, url, lineNo, columnNo, error) {
              console.error('Runtime Error:', error || msg);
              const rootEl = document.getElementById('root');
              if (rootEl) {
                rootEl.innerHTML = '<div class="error"><strong>Runtime Error:</strong><br>' + (error ? error.message : msg) + '</div>';
              }
              window.parent.postMessage({ 
                type: 'error', 
                message: error ? error.message : msg
              }, '*');
              return true;
            };

            window.addEventListener('unhandledrejection', function(event) {
              console.error('Promise Rejection:', event.reason);
              const rootEl = document.getElementById('root');
              if (rootEl) {
                rootEl.innerHTML = '<div class="error"><strong>Promise Error:</strong><br>' + event.reason + '</div>';
              }
              window.parent.postMessage({ 
                type: 'error', 
                message: 'Promise rejection: ' + event.reason
              }, '*');
            });

            // Wait for dependencies and execute code
            function initializeApp() {
              try {
                // Check if React is loaded
                if (!window.React || !window.ReactDOM) {
                  throw new Error('React libraries failed to load');
                }

                console.log('React loaded successfully');
                
                // Get React hooks
                const { useState, useEffect, useMemo, useCallback } = React;
                
                // Set up Recharts if available
                if (window.Recharts) {
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
                  
                  console.log('Recharts components loaded');
                }
                
                // Mock UI components
                const Card = ({ children, className = '' }) => 
                  React.createElement('div', { className: \`bg-white border border-gray-200 rounded-lg shadow-sm \${className}\` }, children);
                
                const CardHeader = ({ children, className = '' }) => 
                  React.createElement('div', { className: \`px-6 py-4 border-b border-gray-200 \${className}\` }, children);
                
                const CardTitle = ({ children, className = '' }) => 
                  React.createElement('h3', { className: \`text-lg font-semibold text-gray-900 \${className}\` }, children);
                
                const CardContent = ({ children, className = '' }) => 
                  React.createElement('div', { className: \`px-6 py-4 \${className}\` }, children);
                
                const Button = ({ children, onClick, disabled, className = '' }) => 
                  React.createElement('button', { 
                    onClick, 
                    disabled,
                    className: \`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors \${className}\`
                  }, children);
                
                const Input = ({ placeholder, value, onChange, className = '' }) => 
                  React.createElement('input', { 
                    placeholder, 
                    value, 
                    onChange,
                    className: \`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent \${className}\`
                  });

                // Make components available globally
                window.Card = Card;
                window.CardHeader = CardHeader;
                window.CardTitle = CardTitle;
                window.CardContent = CardContent;
                window.Button = Button;
                window.Input = Input;

                console.log('UI components initialized');

                // Execute the user's code
                ${cleanCode}

                // Render the component
                if (typeof GeneratedApp === 'function') {
                  console.log('GeneratedApp function found, rendering...');
                  const root = ReactDOM.createRoot(document.getElementById('root'));
                  root.render(React.createElement(GeneratedApp));
                  
                  // Signal success to parent
                  setTimeout(() => {
                    window.parent.postMessage({ type: 'success' }, '*');
                  }, 100);
                } else {
                  throw new Error('GeneratedApp function not found or not properly defined');
                }
              } catch (error) {
                console.error('App initialization error:', error);
                const rootEl = document.getElementById('root');
                if (rootEl) {
                  rootEl.innerHTML = \`<div class="error"><strong>Initialization Error:</strong><br>\${error.message}<br><br><small>Check the console for more details</small></div>\`;
                }
                
                window.parent.postMessage({ 
                  type: 'error', 
                  message: error.message
                }, '*');
              }
            }

            // Wait for all scripts to load, then initialize
            let loadAttempts = 0;
            const maxAttempts = 50; // 5 seconds max
            
            function checkDependencies() {
              loadAttempts++;
              
              if (window.React && window.ReactDOM) {
                console.log('All dependencies loaded, initializing app...');
                initializeApp();
              } else if (loadAttempts < maxAttempts) {
                setTimeout(checkDependencies, 100);
              } else {
                const missingDeps = [];
                if (!window.React) missingDeps.push('React');
                if (!window.ReactDOM) missingDeps.push('ReactDOM');
                
                const error = \`Failed to load dependencies: \${missingDeps.join(', ')}\`;
                console.error(error);
                
                const rootEl = document.getElementById('root');
                if (rootEl) {
                  rootEl.innerHTML = \`<div class="error"><strong>Dependency Error:</strong><br>\${error}<br><br>Please try refreshing the page.</div>\`;
                }
                
                window.parent.postMessage({ 
                  type: 'error', 
                  message: error
                }, '*');
              }
            }

            // Start checking for dependencies
            setTimeout(checkDependencies, 100);
          </script>
        </body>
        </html>
      `;

      // Write content to iframe
      iframe.srcdoc = iframeContent;
      
      // Set up timeout for loading
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setError('Preview timeout - dependencies may have failed to load');
        onError?.('Preview timeout');
      }, 10000);

      // Clear timeout when iframe loads
      iframe.onload = () => {
        clearTimeout(timeoutId);
      };
      
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
          <strong>Preview Error:</strong> {error}
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
