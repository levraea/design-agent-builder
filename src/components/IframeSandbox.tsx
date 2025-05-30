
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

    console.log('IframeSandbox: Starting to load code');
    setIsLoading(true);
    setError(null);

    try {
      const iframe = iframeRef.current;
      
      // Clean code (remove markdown if present)
      let cleanCode = code;
      if (cleanCode.includes('```')) {
        cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      }

      console.log('IframeSandbox: Creating iframe content');

      // Create the iframe content with simpler, more reliable loading
      const iframeContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Live Preview</title>
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
              white-space: pre-wrap;
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
            <div class="loading">Loading...</div>
          </div>
          <script>
            console.log('Iframe: Starting initialization');
            
            // Global error handling
            window.onerror = function(msg, url, lineNo, columnNo, error) {
              console.error('Iframe Runtime Error:', error || msg);
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
              console.error('Iframe Promise Rejection:', event.reason);
              const rootEl = document.getElementById('root');
              if (rootEl) {
                rootEl.innerHTML = '<div class="error"><strong>Promise Error:</strong><br>' + event.reason + '</div>';
              }
              window.parent.postMessage({ 
                type: 'error', 
                message: 'Promise rejection: ' + event.reason
              }, '*');
            });

            // Simplified dependency loading with faster timeout
            function loadScript(src) {
              return new Promise((resolve, reject) => {
                console.log('Iframe: Loading script:', src);
                const script = document.createElement('script');
                script.crossOrigin = 'anonymous';
                
                const timeout = setTimeout(() => {
                  console.error('Iframe: Script load timeout:', src);
                  reject(new Error('Script load timeout: ' + src));
                }, 8000); // Reduced timeout to 8 seconds
                
                script.onload = () => {
                  console.log('Iframe: Script loaded successfully:', src);
                  clearTimeout(timeout);
                  resolve();
                };
                
                script.onerror = () => {
                  console.error('Iframe: Script load error:', src);
                  clearTimeout(timeout);
                  reject(new Error('Failed to load script: ' + src));
                };
                
                script.src = src;
                document.head.appendChild(script);
              });
            }

            async function loadDependencies() {
              try {
                console.log('Iframe: Starting dependency loading');
                
                // Load React (using jsDelivr as primary)
                document.getElementById('root').innerHTML = '<div class="loading">Loading React...</div>';
                await loadScript('https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js');
                
                // Load ReactDOM
                document.getElementById('root').innerHTML = '<div class="loading">Loading ReactDOM...</div>';
                await loadScript('https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js');
                
                console.log('Iframe: All dependencies loaded successfully');
                initializeApp();
                
              } catch (error) {
                console.error('Iframe: Failed to load dependencies:', error);
                document.getElementById('root').innerHTML = 
                  '<div class="error"><strong>Dependency Load Error:</strong><br>' + 
                  error.message + '<br><br>Network connectivity issue or CDN unavailable.</div>';
                
                window.parent.postMessage({ 
                  type: 'error', 
                  message: 'Failed to load dependencies: ' + error.message
                }, '*');
              }
            }

            function initializeApp() {
              try {
                console.log('Iframe: Initializing app');
                document.getElementById('root').innerHTML = '<div class="loading">Initializing...</div>';
                
                // Check if React is loaded
                if (!window.React || !window.ReactDOM) {
                  throw new Error('React libraries not available');
                }

                console.log('Iframe: React loaded successfully');
                
                // Get React hooks
                const { useState, useEffect, useMemo, useCallback } = React;
                
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

                console.log('Iframe: UI components initialized');
                console.log('Iframe: Executing user code');

                // Execute the user's code
                ${cleanCode}

                // Render the component
                if (typeof GeneratedApp === 'function') {
                  console.log('Iframe: GeneratedApp function found, rendering...');
                  const root = ReactDOM.createRoot(document.getElementById('root'));
                  root.render(React.createElement(GeneratedApp));
                  
                  // Signal success to parent
                  setTimeout(() => {
                    console.log('Iframe: Sending success message to parent');
                    window.parent.postMessage({ type: 'success' }, '*');
                  }, 100);
                } else {
                  throw new Error('GeneratedApp function not found or not properly defined');
                }
              } catch (error) {
                console.error('Iframe: App initialization error:', error);
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

            // Start loading dependencies
            console.log('Iframe: Starting dependency loading process');
            loadDependencies();
          </script>
        </body>
        </html>
      `;

      // Write content to iframe
      iframe.srcdoc = iframeContent;
      
      // Set up timeout for loading (reduced to 12 seconds)
      const timeoutId = setTimeout(() => {
        console.error('IframeSandbox: Preview timeout occurred');
        setIsLoading(false);
        setError('Preview timeout - network connectivity issue or CDN unavailable. Please check your internet connection and try again.');
        onError?.('Preview timeout');
      }, 12000);

      // Clear timeout when iframe loads
      iframe.onload = () => {
        console.log('IframeSandbox: Iframe onload fired');
        clearTimeout(timeoutId);
      };
      
      setIsLoading(false);
      onSuccess?.();

    } catch (err) {
      console.error('IframeSandbox: Setup error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      onError?.(errorMessage);
    }
  }, [code, onError, onSuccess]);

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('IframeSandbox: Received message from iframe:', event.data);
      if (event.data.type === 'error') {
        setError(event.data.message);
        setIsLoading(false);
        onError?.(event.data.message);
      } else if (event.data.type === 'success') {
        console.log('IframeSandbox: Success message received');
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
