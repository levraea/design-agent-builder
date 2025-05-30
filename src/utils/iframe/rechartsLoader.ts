
export const generateRechartsLoader = (): string => {
  return `
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
        }`;
};

export const generateRechartsFallbacks = (): string => {
  return `
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
              }, children);`;
};
