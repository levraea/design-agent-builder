
export const generateRechartsComponentExposer = (): string => {
  return `
        function exposeRechartsComponents(recharts) {
          console.log('📊 Exposing Recharts components globally...');
          
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
          
          console.log('✅ All available Recharts components exposed globally');
        }`;
};
