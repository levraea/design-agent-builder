
export const generateChartJSSetup = (): string => {
  return `
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
            }`;
};
