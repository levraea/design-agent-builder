
import { generateChartJSSetup } from './chartjsSetup';
import { generateMockUIComponents } from './mockComponents';
import { generateCodeProcessor } from './codeProcessor';

export const generateAppInitializer = (cleanCode: string): string => {
  return `
        function initializeApp() {
          console.log('Initializing app...');
          try {
            const { useState, useEffect, useMemo, useCallback } = React;
            
            // Check if Recharts is already available from script tag
            if (window.Recharts) {
              console.log('✅ Recharts already available via script tag');
              const recharts = window.Recharts;
              
              // Make individual components available globally
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
            }
            
            ${generateChartJSSetup()}
            
            ${generateMockUIComponents()}

            ${generateCodeProcessor(cleanCode)}
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
        }`;
};
