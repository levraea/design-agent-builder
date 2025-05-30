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
        // ... keep existing code (loadRecharts function and recharts loading logic)
        async function loadRecharts() {
          try {
            console.log('Loading recharts...');
            
            // Load Recharts from UMD build for better compatibility
            const response = await fetch('https://unpkg.com/recharts@2.12.7/umd/Recharts.js');
            const scriptText = await response.text();
            
            // Execute the script in global scope
            const script = document.createElement('script');
            script.textContent = scriptText;
            document.head.appendChild(script);
            
            // Wait a bit for the script to execute
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Check if Recharts is available
            if (window.Recharts) {
              console.log('Recharts loaded successfully via UMD');
              
              // Make individual components available globally
              const recharts = window.Recharts;
              window.LineChart = recharts.LineChart;
              window.AreaChart = recharts.AreaChart;
              window.BarChart = recharts.BarChart;
              window.PieChart = recharts.PieChart;
              window.ScatterChart = recharts.ScatterChart;
              window.RadarChart = recharts.RadarChart;
              window.XAxis = recharts.XAxis;
              window.YAxis = recharts.YAxis;
              window.CartesianGrid = recharts.CartesianGrid;
              window.Tooltip = recharts.Tooltip;
              window.Legend = recharts.Legend;
              window.ResponsiveContainer = recharts.ResponsiveContainer;
              window.Line = recharts.Line;
              window.Area = recharts.Area;
              window.Bar = recharts.Bar;
              window.Cell = recharts.Cell;
              window.ReferenceLine = recharts.ReferenceLine;
              window.ReferenceArea = recharts.ReferenceArea;
              window.Brush = recharts.Brush;
              
              return true;
            }
            
            throw new Error('Recharts not found in window after loading');
          } catch (error) {
            console.error('Failed to load recharts UMD, trying ESM fallback:', error);
            
            // Fallback to ESM approach
            try {
              const response = await fetch('https://unpkg.com/recharts@2.12.7/esm/index.js');
              const moduleText = await response.text();
              const moduleBlob = new Blob([moduleText], { type: 'application/javascript' });
              const moduleUrl = URL.createObjectURL(moduleBlob);
              const module = await import(moduleUrl);
              
              // Make recharts available globally
              window.Recharts = module;
              
              // Make individual components available globally
              window.LineChart = module.LineChart;
              window.AreaChart = module.AreaChart;
              window.BarChart = module.BarChart;
              window.PieChart = module.PieChart;
              window.ScatterChart = module.ScatterChart;
              window.RadarChart = module.RadarChart;
              window.XAxis = module.XAxis;
              window.YAxis = module.YAxis;
              window.CartesianGrid = module.CartesianGrid;
              window.Tooltip = module.Tooltip;
              window.Legend = module.Legend;
              window.ResponsiveContainer = module.ResponsiveContainer;
              window.Line = module.Line;
              window.Area = module.Area;
              window.Bar = module.Bar;
              window.Cell = module.Cell;
              window.ReferenceLine = module.ReferenceLine;
              window.ReferenceArea = module.ReferenceArea;
              window.Brush = module.Brush;
              
              console.log('Recharts loaded successfully via ESM fallback');
              return true;
            } catch (esmError) {
              console.error('ESM fallback also failed:', esmError);
              return false;
            }
          }
        }

        // Load recharts and then initialize the app
        loadRecharts().then((success) => {
          if (!success) {
            console.warn('Recharts failed to load, providing fallback components');
            // Provide fallback chart components if recharts fails to load
            window.LineChart = ({ children, data, width = 400, height = 300, ...props }) => 
              React.createElement('div', { 
                className: 'w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500',
                style: { width: width || '100%', height: height || 300 }
              }, 'LineChart - Recharts not loaded');
            
            window.BarChart = ({ children, data, width = 400, height = 300, ...props }) => 
              React.createElement('div', { 
                className: 'w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500',
                style: { width: width || '100%', height: height || 300 }
              }, 'BarChart - Recharts not loaded');
            
            window.PieChart = ({ children, data, width = 400, height = 300, ...props }) => 
              React.createElement('div', { 
                className: 'w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500',
                style: { width: width || '100%', height: height || 300 }
              }, 'PieChart - Recharts not loaded');
            
            window.XAxis = () => null;
            window.YAxis = () => null;
            window.CartesianGrid = () => null;
            window.Tooltip = () => null;
            window.Legend = () => null;
            window.Line = () => null;
            window.Area = () => null;
            window.Bar = () => null;
            window.ResponsiveContainer = ({ children, width, height }) => 
              React.createElement('div', { 
                className: 'w-full h-full',
                style: { width: width || '100%', height: height || '100%' }
              }, children);
          } else {
            console.log('All Recharts components are now available globally');
          }
          
          initializeApp();
        });
      </script>
      <script>
        // Simplified fetch function - direct API calls only
        window.enhancedFetch = async (targetUrl, options = {}) => {
          console.log('🌐 Making direct API call to:', targetUrl);
          
          try {
            const response = await fetch(targetUrl, {
              ...options,
              headers: {
                ...options.headers,
                'Accept': 'application/json'
              }
            });
            
            console.log('📊 Response status:', response.status);
            
            if (response.ok) {
              console.log('✅ Direct fetch successful!');
              return response;
            } else {
              throw new Error('API request failed with status: ' + response.status);
            }
          } catch (error) {
            console.error('❌ API request failed:', error.message);
            throw error;
          }
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
              React.createElement('div', { className: 'bg-white border rounded-lg shadow-sm ' + className }, children);
            
            const CardHeader = ({ children, className = '' }) => 
              React.createElement('div', { className: 'px-6 py-4 border-b ' + className }, children);
            
            const CardTitle = ({ children, className = '' }) => 
              React.createElement('h3', { className: 'text-lg font-semibold ' + className }, children);
            
            const CardContent = ({ children, className = '' }) => 
              React.createElement('div', { className: 'px-6 py-4 ' + className }, children);
            
            const Button = ({ children, onClick, disabled, className = '' }) => 
              React.createElement('button', { 
                onClick, 
                disabled,
                className: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 ' + className
              }, children);
            
            const Input = ({ placeholder, value, onChange, className = '' }) => 
              React.createElement('input', { 
                placeholder, 
                value, 
                onChange,
                className: 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' + className
              });

            // Add missing Title component
            const Title = ({ children, className = '' }) => 
              React.createElement('h2', { className: 'text-xl font-bold ' + className }, children);

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
            console.log('Recharts components available:', {
              LineChart: typeof window.LineChart,
              BarChart: typeof window.BarChart,
              XAxis: typeof window.XAxis,
              YAxis: typeof window.YAxis,
              CartesianGrid: typeof window.CartesianGrid,
              Tooltip: typeof window.Tooltip,
              Legend: typeof window.Legend,
              Line: typeof window.Line,
              ResponsiveContainer: typeof window.ResponsiveContainer
            });
            
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
              '<div class="error"><strong>Error:</strong> ' + error.message + '</div>';
            
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
