
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
      <script src="https://unpkg.com/recharts@2.12.7/esm/index.js" type="module"></script>
      <style>
        body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; }
        .error { color: #dc2626; background: #fef2f2; padding: 12px; border-radius: 6px; border: 1px solid #fecaca; }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script type="module">
        import * as Recharts from 'https://unpkg.com/recharts@2.12.7/esm/index.js';
        
        // Make recharts available globally
        window.Recharts = Recharts;
        window.ResponsiveContainer = Recharts.ResponsiveContainer;
        window.LineChart = Recharts.LineChart;
        window.BarChart = Recharts.BarChart;
        window.XAxis = Recharts.XAxis;
        window.YAxis = Recharts.YAxis;
        window.CartesianGrid = Recharts.CartesianGrid;
        window.Tooltip = Recharts.Tooltip;
        window.Legend = Recharts.Legend;
        window.Line = Recharts.Line;
        window.Bar = Recharts.Bar;
        window.Area = Recharts.Area;
        window.AreaChart = Recharts.AreaChart;
        window.PieChart = Recharts.PieChart;
        window.Pie = Recharts.Pie;
        window.Cell = Recharts.Cell;
        
        // Initialize the main script after recharts is loaded
        initializeApp();
      </script>
      <script>
        function initializeApp() {
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

            // Make Chart.js available globally and register components
            if (typeof Chart !== 'undefined') {
              // Register Chart.js components
              Chart.register(
                Chart.CategoryScale,
                Chart.LinearScale,
                Chart.PointElement,
                Chart.LineElement,
                Chart.BarElement,
                Chart.Title,
                Chart.Tooltip,
                Chart.Legend,
                Chart.ArcElement,
                Chart.RadialLinearScale,
                Chart.Filler
              );
              
              window.Chart = Chart;
              window.ChartJS = Chart;
              
              // Make Chart.js components available globally
              window.CategoryScale = Chart.CategoryScale;
              window.LinearScale = Chart.LinearScale;
              window.PointElement = Chart.PointElement;
              window.LineElement = Chart.LineElement;
              window.BarElement = Chart.BarElement;
              window.Title = Chart.Title;
              window.Tooltip = Chart.Tooltip;
              window.Legend = Chart.Legend;
              window.ArcElement = Chart.ArcElement;
              window.RadialLinearScale = Chart.RadialLinearScale;
              window.Filler = Chart.Filler;
            } else {
              console.warn('Chart.js not loaded properly');
              // Create mock Chart object and components to prevent errors
              const mockComponent = () => ({});
              window.Chart = {
                register: () => {},
                Chart: function() { return { update: () => {}, destroy: () => {} }; },
                CategoryScale: mockComponent,
                LinearScale: mockComponent,
                PointElement: mockComponent,
                LineElement: mockComponent,
                BarElement: mockComponent,
                Title: mockComponent,
                Tooltip: mockComponent,
                Legend: mockComponent,
                ArcElement: mockComponent,
                RadialLinearScale: mockComponent,
                Filler: mockComponent
              };
              window.ChartJS = window.Chart;
              window.CategoryScale = mockComponent;
              window.LinearScale = mockComponent;
              window.PointElement = mockComponent;
              window.LineElement = mockComponent;
              window.BarElement = mockComponent;
              window.Title = mockComponent;
              window.Tooltip = mockComponent;
              window.Legend = mockComponent;
              window.ArcElement = mockComponent;
              window.RadialLinearScale = mockComponent;
              window.Filler = mockComponent;
            }
            
            // Recharts components are now available globally from the module script above
            // No need for mock recharts components anymore

            // Process the code to remove any remaining import/export statements
            let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Remove any remaining import statements that might have been missed
            processedCode = processedCode.replace(/import\\s+.*?from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s*\\{[^}]*\\}\\s*from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+\\*\\s+as\\s+\\w+\\s+from\\s+['"][^'"]+['"];?\\s*/g, '');
            
            // Remove export statements and convert to regular function declarations
            processedCode = processedCode.replace(/export\\s+default\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+default\\s+GeneratedApp/g, '// GeneratedApp exported');
            processedCode = processedCode.replace(/export\\s+\\{[^}]*\\}/g, '// exports removed');
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
        }
      </script>
    </body>
    </html>
  `;
};
