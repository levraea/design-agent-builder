
export const generateCodeProcessor = (cleanCode: string): string => {
  return `
            // Process the code
            let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Remove import/export statements
            processedCode = processedCode.replace(/import\\s+.*?from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s*\\{[^}]*\\}\\s*from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+\\*\\s+as\\s+\\w+\\s+from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/export\\s+default\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+default\\s+GeneratedApp/g, '// GeneratedApp exported');
            processedCode = processedCode.replace(/export\\s+\\{[^}]*\\}/g, '// exports removed');

            console.log('Processing code...');
            console.log('Recharts components available:', {
              LineChart: typeof window.LineChart,
              BarChart: typeof window.BarChart,
              XAxis: typeof window.XAxis,
              YAxis: typeof window.YAxis,
              CartesianGrid: typeof window.CartesianGrid,
              Tooltip: typeof window.Tooltip,
              Legend: typeof window.Legend,
              Line: typeof window.Line,
              ResponsiveContainer: typeof window.ResponsiveContainer
            });
            
            // Transpile JSX to JavaScript
            const transformedCode = Babel.transform(processedCode, {
              presets: ['react']
            }).code;

            console.log('Code transpiled successfully');

            // Execute the code
            eval(transformedCode);

            // Render the component
            if (typeof GeneratedApp === 'function') {
              console.log('Rendering GeneratedApp...');
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(GeneratedApp));
              
              console.log('App rendered successfully');
              // Signal success to parent
              window.parent.postMessage({ type: 'success' }, '*');
            } else {
              throw new Error('GeneratedApp is not a valid React component');
            }`;
};
