
export const generateChartJSSetup = (): string => {
  return `
            // Chart.js Setup with conflict prevention
            if (window.Chart) {
              console.log('Chart.js already available globally');
              
              // Prevent Chart.js from trying to register Recharts components
              const originalRegister = window.Chart.register;
              window.Chart.register = function(...items) {
                const validItems = items.filter(item => {
                  // Skip items that look like Recharts components (functions without proper Chart.js structure)
                  if (typeof item === 'function' && !item.id && !item.type) {
                    console.warn('Skipping registration of incompatible component:', item.name || 'unnamed');
                    return false;
                  }
                  return true;
                });
                
                if (validItems.length > 0) {
                  return originalRegister.apply(this, validItems);
                }
              };
              
              // Create basic chart components that don't conflict
              window.ChartJS = window.Chart;
            } else {
              console.log('Chart.js not available, creating minimal fallback');
              
              // Create a minimal Chart.js fallback that doesn't interfere with Recharts
              window.Chart = {
                register: () => console.log('Chart.js register called (no-op)'),
                Chart: class {
                  constructor() {
                    console.log('Chart.js Chart constructor called (fallback)');
                  }
                }
              };
              window.ChartJS = window.Chart;
            }`;
};
