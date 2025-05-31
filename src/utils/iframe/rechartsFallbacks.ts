
export const generateRechartsFallbacks = (): string => {
  return `
        function createRechartsFallbacks() {
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
          
          console.log('✅ Recharts fallback components ready');
        }`;
};
