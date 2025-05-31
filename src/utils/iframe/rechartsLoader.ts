

export const generateRechartsLoader = (): string => {
  return `
        async function loadRecharts() {
          console.log('🔄 Starting Recharts loading process...');
          
          try {
            // First, ensure PropTypes is available (Recharts dependency)
            if (!window.PropTypes) {
              console.log('📦 Loading PropTypes for Recharts...');
              try {
                const propTypesResponse = await fetch('https://unpkg.com/prop-types@15.8.1/prop-types.min.js');
                if (propTypesResponse.ok) {
                  const propTypesScript = await propTypesResponse.text();
                  const script = document.createElement('script');
                  script.textContent = propTypesScript;
                  document.head.appendChild(script);
                  await new Promise(resolve => setTimeout(resolve, 100));
                  console.log('✅ PropTypes loaded');
                }
              } catch (error) {
                console.warn('⚠️ PropTypes loading failed, providing fallback');
                // Provide minimal PropTypes fallback
                window.PropTypes = {
                  oneOfType: () => null,
                  string: null,
                  number: null,
                  bool: null,
                  func: null,
                  object: null,
                  array: null,
                  node: null,
                  element: null,
                  instanceOf: () => null,
                  oneOf: () => null,
                  arrayOf: () => null,
                  objectOf: () => null,
                  shape: () => null,
                  any: null
                };
              }
            }
            
            console.log('📦 Attempting to load Recharts...');
            
            // Try to load Recharts with better error handling
            try {
              // Use a more reliable CDN and version
              const response = await fetch('https://cdn.jsdelivr.net/npm/recharts@2.8.0/umd/Recharts.min.js');
              
              if (!response.ok) {
                throw new Error(\`Failed to fetch Recharts: \${response.status} \${response.statusText}\`);
              }
              
              const scriptText = await response.text();
              console.log('📜 Recharts script loaded, size:', scriptText.length, 'bytes');
              
              // Execute the script in global scope with error handling
              try {
                const script = document.createElement('script');
                script.textContent = scriptText;
                document.head.appendChild(script);
                
                // Wait for script execution
                await new Promise(resolve => setTimeout(resolve, 500));
                
                console.log('🔍 Checking if Recharts is available...');
                console.log('window.Recharts:', typeof window.Recharts);
                
                // Check if Recharts is available and working
                if (window.Recharts && typeof window.Recharts === 'object') {
                  console.log('✅ Recharts loaded successfully');
                  
                  // Make individual components available globally with safety checks
                  const recharts = window.Recharts;
                  
                  // Core chart components
                  if (recharts.LineChart) window.LineChart = recharts.LineChart;
                  if (recharts.AreaChart) window.AreaChart = recharts.AreaChart;
                  if (recharts.BarChart) window.BarChart = recharts.BarChart;
                  if (recharts.PieChart) window.PieChart = recharts.PieChart;
                  if (recharts.ScatterChart) window.ScatterChart = recharts.ScatterChart;
                  if (recharts.RadarChart) window.RadarChart = recharts.RadarChart;
                  
                  // Axis components
                  if (recharts.XAxis) window.XAxis = recharts.XAxis;
                  if (recharts.YAxis) window.YAxis = recharts.YAxis;
                  if (recharts.ZAxis) window.ZAxis = recharts.ZAxis;
                  
                  // Grid and helper components
                  if (recharts.CartesianGrid) window.CartesianGrid = recharts.CartesianGrid;
                  if (recharts.Tooltip) window.Tooltip = recharts.Tooltip;
                  if (recharts.Legend) window.Legend = recharts.Legend;
                  if (recharts.ResponsiveContainer) window.ResponsiveContainer = recharts.ResponsiveContainer;
                  
                  // Data series components
                  if (recharts.Line) window.Line = recharts.Line;
                  if (recharts.Area) window.Area = recharts.Area;
                  if (recharts.Bar) window.Bar = recharts.Bar;
                  if (recharts.Scatter) window.Scatter = recharts.Scatter;
                  if (recharts.Cell) window.Cell = recharts.Cell;
                  
                  // Reference components
                  if (recharts.ReferenceLine) window.ReferenceLine = recharts.ReferenceLine;
                  if (recharts.ReferenceArea) window.ReferenceArea = recharts.ReferenceArea;
                  if (recharts.Brush) window.Brush = recharts.Brush;
                  
                  console.log('📊 All available Recharts components exposed globally');
                  return true;
                }
                
                throw new Error('Recharts object not found after script execution');
                
              } catch (execError) {
                console.error('❌ Script execution failed:', execError);
                throw execError;
              }
              
            } catch (fetchError) {
              console.error('❌ Recharts fetch failed:', fetchError);
              throw fetchError;
            }
            
          } catch (error) {
            console.error('❌ Recharts loading failed completely:', error);
            console.log('🔄 Providing fallback chart components...');
            
            // Provide comprehensive fallback components
            return false;
          }
        }`;
};

export const generateRechartsFallbacks = (): string => {
  return `
            // Comprehensive Recharts fallback components
            console.log('📊 Creating Recharts fallback components...');
            
            // Chart container fallback
            const createChartFallback = (name, width = 400, height = 300) => 
              ({ children, data, width: w, height: h, ...props }) => 
                React.createElement('div', { 
                  className: 'w-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-medium',
                  style: { 
                    width: w || width || '100%', 
                    height: h || height || 300,
                    minHeight: 200
                  }
                }, [
                  React.createElement('div', { 
                    key: 'fallback',
                    className: 'text-center p-4'
                  }, [
                    React.createElement('div', {
                      key: 'icon',
                      className: 'w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center'
                    }, '📊'),
                    React.createElement('div', {
                      key: 'title',
                      className: 'text-sm font-medium text-gray-700'
                    }, \`\${name} Chart\`),
                    React.createElement('div', {
                      key: 'subtitle',
                      className: 'text-xs text-gray-500 mt-1'
                    }, 'Chart library not loaded')
                  ])
                ]);
            
            // Main chart components
            window.LineChart = createChartFallback('Line');
            window.AreaChart = createChartFallback('Area');
            window.BarChart = createChartFallback('Bar');
            window.PieChart = createChartFallback('Pie', 300, 300);
            window.ScatterChart = createChartFallback('Scatter');
            window.RadarChart = createChartFallback('Radar', 300, 300);
            
            // Axis components (invisible fallbacks)
            window.XAxis = () => null;
            window.YAxis = () => null;
            window.ZAxis = () => null;
            
            // Grid and helper components
            window.CartesianGrid = () => null;
            window.Tooltip = () => null;
            window.Legend = () => null;
            
            // Data series components
            window.Line = () => null;
            window.Area = () => null;
            window.Bar = () => null;
            window.Scatter = () => null;
            window.Cell = () => null;
            
            // Reference components
            window.ReferenceLine = () => null;
            window.ReferenceArea = () => null;
            window.Brush = () => null;
            
            // ResponsiveContainer fallback
            window.ResponsiveContainer = ({ children, width, height, ...props }) => 
              React.createElement('div', { 
                className: 'w-full h-full',
                style: { 
                  width: width || '100%', 
                  height: height || '100%',
                  minHeight: height || 300
                },
                ...props
              }, children);
            
            console.log('✅ Recharts fallback components ready');`;
};
