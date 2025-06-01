
export const generateChartJSSetup = (): string => {
  return `
            // Make Chart.js available globally and register necessary components
            if (typeof Chart !== 'undefined') {
              // Register Chart.js components including ArcElement for pie charts
              Chart.register(
                Chart.CategoryScale,
                Chart.LinearScale,
                Chart.PointElement,
                Chart.LineElement,
                Chart.BarElement,
                Chart.ArcElement,
                Chart.Title,
                Chart.Tooltip,
                Chart.Legend,
                Chart.Filler
              );
              
              window.ChartJS = Chart;
              window.CategoryScale = Chart.CategoryScale;
              window.LinearScale = Chart.LinearScale;
              window.PointElement = Chart.PointElement;
              window.LineElement = Chart.LineElement;
              window.BarElement = Chart.BarElement;
              window.ArcElement = Chart.ArcElement;
              
              console.log('Chart.js loaded and components registered including ArcElement');
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
