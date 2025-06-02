

export const generateChartJSSetup = (): string => {
  return `
            // Make Chart.js available globally and register necessary components
            if (typeof Chart !== 'undefined') {
              console.log('Chart.js detected, attempting to register components...');
              
              try {
                // Try to register Chart.js components if available
                if (Chart.register && typeof Chart.register === 'function') {
                  // Check if components are available before registering
                  const components = [];
                  
                  if (Chart.CategoryScale) components.push(Chart.CategoryScale);
                  if (Chart.LinearScale) components.push(Chart.LinearScale);
                  if (Chart.PointElement) components.push(Chart.PointElement);
                  if (Chart.LineElement) components.push(Chart.LineElement);
                  if (Chart.BarElement) components.push(Chart.BarElement);
                  if (Chart.ArcElement) components.push(Chart.ArcElement);
                  if (Chart.Title) components.push(Chart.Title);
                  if (Chart.Tooltip) components.push(Chart.Tooltip);
                  if (Chart.Legend) components.push(Chart.Legend);
                  if (Chart.Filler) components.push(Chart.Filler);
                  
                  if (components.length > 0) {
                    Chart.register(...components);
                    console.log('Chart.js components registered successfully:', components.length);
                  } else {
                    console.warn('No Chart.js components found to register');
                  }
                  
                  // Make components available globally
                  window.ChartJS = Chart;
                  window.CategoryScale = Chart.CategoryScale;
                  window.LinearScale = Chart.LinearScale;
                  window.PointElement = Chart.PointElement;
                  window.LineElement = Chart.LineElement;
                  window.BarElement = Chart.BarElement;
                  window.ArcElement = Chart.ArcElement;
                } else {
                  console.warn('Chart.register function not available');
                }
                
                console.log('Chart.js loaded and setup completed');
              } catch (error) {
                console.error('Error setting up Chart.js:', error);
              }
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
              window.ArcElement = () => null;
            }`;
};

