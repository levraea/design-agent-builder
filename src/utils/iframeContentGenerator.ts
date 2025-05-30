
export const generateIframeContent = (cleanCode: string): string => {
  return `
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
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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

          // Make Chart.js available globally
          window.Chart = window.Chart;
          
          // Mock recharts components
          const ResponsiveContainer = ({ children, width = '100%', height = 300 }) => 
            React.createElement('div', { style: { width, height } }, children);
          
          const LineChart = ({ data = [], children, ...props }) => 
            React.createElement('div', { 
              className: 'bg-gray-100 rounded flex items-center justify-center',
              style: { height: '100%' }
            }, 'Chart Placeholder (Data: ' + data.length + ' items)');
          
          const BarChart = ({ data = [], children, ...props }) => 
            React.createElement('div', { 
              className: 'bg-gray-100 rounded flex items-center justify-center',
              style: { height: '100%' }
            }, 'Bar Chart Placeholder (Data: ' + data.length + ' items)');
          
          const XAxis = ({ dataKey }) => null;
          const YAxis = () => null;
          const CartesianGrid = ({ strokeDasharray }) => null;
          const Tooltip = () => null;
          const Legend = () => null;
          const Line = ({ dataKey, stroke }) => null;
          const Bar = ({ dataKey, fill }) => null;

          // Process the code to remove any export statements
          let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
          
          // Remove export statements and convert to regular function declarations
          processedCode = processedCode.replace(/export\\s+default\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
          processedCode = processedCode.replace(/export\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
          processedCode = processedCode.replace(/export\\s+default\\s+GeneratedApp/g, '// GeneratedApp exported');
          processedCode = processedCode.replace(/export\\s+{[^}]*}/g, '// exports removed');
          processedCode = processedCode.replace(/export\\s+\\*/g, '// export * removed');

          // Transpile JSX to JavaScript using Babel
          const transformedCode = Babel.transform(processedCode, {
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
};
