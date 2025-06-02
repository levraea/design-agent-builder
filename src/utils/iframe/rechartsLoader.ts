
export const generateRechartsLoader = (): string => {
  return `
        async function loadRecharts() {
          console.log('🔄 Loading Recharts for React charts...');
          
          try {
            console.log('📦 Attempting to load Recharts UMD...');
            
            // Load Recharts from UMD build
            const response = await fetch('https://unpkg.com/recharts@2.12.7/umd/Recharts.js');
            
            if (!response.ok) {
              throw new Error(\`Failed to fetch Recharts: \${response.status} \${response.statusText}\`);
            }
            
            const scriptText = await response.text();
            console.log('📜 Recharts script loaded, size:', scriptText.length, 'bytes');
            
            // Execute the script in global scope
            const script = document.createElement('script');
            script.textContent = scriptText;
            document.head.appendChild(script);
            
            // Wait longer for script execution and check multiple possible locations
            await new Promise(resolve => setTimeout(resolve, 500));
            
            console.log('🔍 Checking Recharts availability...');
            console.log('window.Recharts:', typeof window.Recharts);
            console.log('window.recharts:', typeof window.recharts);
            console.log('Available window properties:', Object.keys(window).filter(key => key.toLowerCase().includes('recharts')));
            
            // Try different possible locations for Recharts
            let recharts = null;
            
            if (window.Recharts && typeof window.Recharts === 'object') {
              recharts = window.Recharts;
              console.log('✅ Found Recharts at window.Recharts');
            } else if (window.recharts && typeof window.recharts === 'object') {
              recharts = window.recharts;
              console.log('✅ Found Recharts at window.recharts');
            } else {
              // Check if components are directly available on window
              if (window.LineChart || window.BarChart) {
                console.log('✅ Found Recharts components directly on window');
                return true; // Components already available
              }
            }
            
            if (recharts) {
              console.log('📊 Available Recharts components:', Object.keys(recharts));
              
              // Make all Recharts components available globally
              window.LineChart = recharts.LineChart;
              window.AreaChart = recharts.AreaChart;
              window.BarChart = recharts.BarChart;
              window.PieChart = recharts.PieChart;
              window.ScatterChart = recharts.ScatterChart;
              window.RadarChart = recharts.RadarChart;
              window.ComposedChart = recharts.ComposedChart;
              
              // Chart elements
              window.Line = recharts.Line;
              window.Area = recharts.Area;
              window.Bar = recharts.Bar;
              window.Scatter = recharts.Scatter;
              window.Radar = recharts.Radar;
              window.Cell = recharts.Cell;
              
              // Axes and grid
              window.XAxis = recharts.XAxis;
              window.YAxis = recharts.YAxis;
              window.ZAxis = recharts.ZAxis;
              window.CartesianGrid = recharts.CartesianGrid;
              window.PolarGrid = recharts.PolarGrid;
              window.PolarAngleAxis = recharts.PolarAngleAxis;
              window.PolarRadiusAxis = recharts.PolarRadiusAxis;
              
              // Interactive components
              window.Tooltip = recharts.Tooltip;
              window.Legend = recharts.Legend;
              window.Brush = recharts.Brush;
              
              // Container and responsive
              window.ResponsiveContainer = recharts.ResponsiveContainer;
              
              // Reference elements
              window.ReferenceLine = recharts.ReferenceLine;
              window.ReferenceArea = recharts.ReferenceArea;
              window.ReferenceDot = recharts.ReferenceDot;
              
              console.log('✅ All Recharts components are now available globally');
              
              // Verify components are actually functions
              const testComponents = ['LineChart', 'BarChart', 'ResponsiveContainer'];
              for (const comp of testComponents) {
                console.log(\`\${comp} type:\`, typeof window[comp]);
              }
              
              return true;
            }
            
            throw new Error('Recharts object not found after loading');
            
          } catch (error) {
            console.error('❌ Recharts loading failed:', error.message);
            console.error('Full error:', error);
            return false;
          }
        }`;
};

export const generateRechartsFallbacks = (): string => {
  return `
            // Fallback components if Recharts fails to load
            const createFallbackChart = (chartType) => ({ children, data, width = 400, height = 300, ...props }) => 
              React.createElement('div', { 
                className: 'w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500',
                style: { width: width || '100%', height: height || 300 }
              }, \`\${chartType} - Recharts not loaded\`);
            
            window.LineChart = createFallbackChart('LineChart');
            window.AreaChart = createFallbackChart('AreaChart');
            window.BarChart = createFallbackChart('BarChart');
            window.PieChart = createFallbackChart('PieChart');
            window.ScatterChart = createFallbackChart('ScatterChart');
            window.RadarChart = createFallbackChart('RadarChart');
            
            // Null components for chart elements
            window.Line = () => null;
            window.Area = () => null;
            window.Bar = () => null;
            window.XAxis = () => null;
            window.YAxis = () => null;
            window.CartesianGrid = () => null;
            window.Tooltip = () => null;
            window.Legend = () => null;
            window.Cell = () => null;
            
            window.ResponsiveContainer = ({ children, width, height }) => 
              React.createElement('div', { 
                className: 'w-full h-full',
                style: { width: width || '100%', height: height || '100%' }
              }, children);`;
};
