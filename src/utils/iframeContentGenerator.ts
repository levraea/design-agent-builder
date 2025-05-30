

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
      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
      <style>
        body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; }
        .error { color: #dc2626; background: #fef2f2; padding: 12px; border-radius: 6px; border: 1px solid #fecaca; }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script type="module">
        async function loadRecharts() {
          try {
            console.log('Loading recharts...');
            const response = await fetch('https://unpkg.com/recharts@2.12.7/esm/index.js');
            const moduleText = await response.text();
            const moduleBlob = new Blob([moduleText], { type: 'application/javascript' });
            const moduleUrl = URL.createObjectURL(moduleBlob);
            const module = await import(moduleUrl);
            
            // Make recharts available globally
            window.Recharts = module;
            
            // Make individual components available globally
            const components = [
              'LineChart', 'AreaChart', 'BarChart', 'PieChart', 'ScatterChart', 'RadarChart',
              'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'Legend', 'ResponsiveContainer',
              'Line', 'Area', 'Bar', 'Cell', 'ReferenceLine', 'ReferenceArea', 'Brush'
            ];
            
            components.forEach(componentName => {
              if (module[componentName]) {
                window[componentName] = module[componentName];
              }
            });
            
            console.log('Recharts loaded successfully');
            return true;
          } catch (error) {
            console.error('Failed to load recharts:', error);
            return false;
          }
        }

        // Load recharts and then initialize the app
        loadRecharts().then((success) => {
          if (!success) {
            // Provide fallback chart components if recharts fails to load
            window.LineChart = ({ children, ...props }) => 
              React.createElement('div', { 
                className: 'w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center',
                style: { width: props.width || '100%', height: props.height || 256 }
              }, 'Chart could not be loaded');
            
            window.XAxis = () => null;
            window.YAxis = () => null;
            window.CartesianGrid = () => null;
            window.Tooltip = () => null;
            window.Legend = () => null;
            window.Line = () => null;
            window.ResponsiveContainer = ({ children }) => React.createElement('div', { className: 'w-full h-full' }, children);
          }
          
          initializeApp();
        });
      </script>
      <script>
        // Enhanced CORS proxy with multiple fallbacks for better reliability
        const corsProxies = [
          {
            name: 'corsproxy.io',
            url: 'https://corsproxy.io/?',
            transform: (data) => data // Direct response
          },
          {
            name: 'cors-anywhere-herokuapp',
            url: 'https://cors-anywhere.herokuapp.com/',
            transform: (data) => data // Direct response
          },
          {
            name: 'allorigins',
            url: 'https://api.allorigins.win/get?url=',
            transform: (data) => JSON.parse(data.contents) // Wrapped in contents
          }
        ];

        // Enhanced fetch with proxy fallback
        window.enhancedFetch = async (targetUrl, options = {}) => {
          // First try direct fetch (might work for some APIs)
          try {
            console.log('Attempting direct fetch to:', targetUrl);
            const response = await fetch(targetUrl, options);
            if (response.ok) {
              console.log('Direct fetch successful');
              return response;
            }
          } catch (error) {
            console.log('Direct fetch failed, trying proxies...');
          }

          // Try each proxy in order
          for (let i = 0; i < corsProxies.length; i++) {
            const proxy = corsProxies[i];
            try {
              console.log(\`Trying proxy \${i + 1}/\${corsProxies.length}: \${proxy.name}\`);
              const proxyUrl = proxy.url + encodeURIComponent(targetUrl);
              const response = await fetch(proxyUrl, options);
              
              if (response.ok) {
                const data = await response.json();
                const transformedData = proxy.transform(data);
                console.log(\`Proxy \${proxy.name} successful\`);
                
                // Return a Response-like object for consistency
                return {
                  ok: true,
                  json: async () => transformedData,
                  text: async () => JSON.stringify(transformedData)
                };
              }
            } catch (error) {
              console.warn(\`Proxy \${proxy.name} failed:`, error);
              continue;
            }
          }
          
          throw new Error('All CORS proxies failed. Please check your internet connection or try again later.');
        };

        function initializeApp() {
          console.log('Initializing app...');
          try {
            const { useState, useEffect, useMemo, useCallback } = React;
            
            // Make Chart.js available globally and register necessary components
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
                Chart.Filler
              );
              
              window.ChartJS = Chart;
              window.CategoryScale = Chart.CategoryScale;
              window.LinearScale = Chart.LinearScale;
              window.PointElement = Chart.PointElement;
              window.LineElement = Chart.LineElement;
              window.BarElement = Chart.BarElement;
              
              console.log('Chart.js loaded and components registered');
            } else {
              console.warn('Chart.js not loaded, providing fallback');
              window.ChartJS = {
                Chart: () => null,
                Line: () => null,
                Bar: () => null,
                Pie: () => null
              };
              window.CategoryScale = () => null;
              window.LinearScale = () => null;
            }
            
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

            // Add missing Title component
            const Title = ({ children, className = '' }) => 
              React.createElement('h2', { className: \`text-xl font-bold \${className}\` }, children);

            // Process the code
            let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Remove import/export statements
            processedCode = processedCode.replace(/import\\s+.*?from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s*\\{[^}]*\\}\\s*from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+\\*\\s+as\\s+\\w+\\s+from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/export\\s+default\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+default\\s+GeneratedApp/g, '// GeneratedApp exported');
            processedCode = processedCode.replace(/export\\s+\\{[^}]*\\}/g, '// exports removed');

            console.log('Processing code...');
            
            // Transpile JSX to JavaScript
            const transformedCode = Babel.transform(processedCode, {
              presets: ['react']
            }).code;

            console.log('Code transpiled successfully');

            // Execute the code
            eval(transformedCode);

            // Render the component
            if (typeof GeneratedApp === 'function') {
              console.log('Rendering GeneratedApp...');
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(GeneratedApp));
              
              console.log('App rendered successfully');
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
