
export const generateChartJSSetup = (): string => {
  return `
            // Make Chart.js available globally and register necessary components
            if (typeof Chart !== 'undefined') {
              // Register Chart.js components including ArcElement for pie charts
              const {
                CategoryScale,
                LinearScale,
                PointElement,
                LineElement,
                BarElement,
                ArcElement,
                Title,
                Tooltip,
                Legend,
                Filler
              } = Chart;
              
              Chart.register(
                CategoryScale,
                LinearScale,
                PointElement,
                LineElement,
                BarElement,
                ArcElement,
                Title,
                Tooltip,
                Legend,
                Filler
              );
              
              window.ChartJS = Chart;
              window.CategoryScale = CategoryScale;
              window.LinearScale = LinearScale;
              window.PointElement = PointElement;
              window.LineElement = LineElement;
              window.BarElement = BarElement;
              window.ArcElement = ArcElement;
              
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
