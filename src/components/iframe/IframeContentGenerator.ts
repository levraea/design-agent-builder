
import { DependencyLoader } from './DependencyLoader';

export class IframeContentGenerator {
  static generate(cleanCode: string): string {
    return `
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
          
          ${this.createErrorHandlers()}
          ${DependencyLoader.createLoadScript()}
          ${DependencyLoader.createDependencyLoadingScript()}
          ${this.createAppInitializer(cleanCode)}
          
          console.log('Iframe: Starting dependency loading process');
          loadDependencies();
        </script>
      </body>
      </html>
    `;
  }

  private static createErrorHandlers(): string {
    return `
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
    `;
  }

  private static createAppInitializer(cleanCode: string): string {
    return `
      function initializeApp() {
        try {
          console.log('Iframe: Initializing app');
          document.getElementById('root').innerHTML = '<div class="loading">Initializing...</div>';
          
          if (!window.React || !window.ReactDOM) {
            throw new Error('React libraries not available');
          }

          console.log('Iframe: React loaded successfully');
          
          const { useState, useEffect, useMemo, useCallback } = React;
          
          ${this.createUIComponents()}
          
          console.log('Iframe: UI components initialized');
          console.log('Iframe: Executing user code');

          ${cleanCode}

          if (typeof GeneratedApp === 'function') {
            console.log('Iframe: GeneratedApp function found, rendering...');
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(GeneratedApp));
            
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
    `;
  }

  private static createUIComponents(): string {
    return `
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

      window.Card = Card;
      window.CardHeader = CardHeader;
      window.CardTitle = CardTitle;
      window.CardContent = CardContent;
      window.Button = Button;
      window.Input = Input;
    `;
  }
}
