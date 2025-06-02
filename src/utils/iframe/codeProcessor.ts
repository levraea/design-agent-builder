
export const generateCodeProcessor = (cleanCode: string): string => {
  return `
            // Process the code with minimal transformations
            let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Only remove import/export statements - leave all other code intact
            processedCode = processedCode.replace(/import\\s+.*?from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s*\\{[^}]*\\}\\s*from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+\\*\\s+as\\s+\\w+\\s+from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/export\\s+default\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+default\\s+GeneratedApp/g, '// GeneratedApp exported');
            processedCode = processedCode.replace(/export\\s+\\{[^}]*\\}/g, '// exports removed');

            console.log('Processing code - Recharts only approach...');
            console.log('Available chart components:', {
              LineChart: typeof window.LineChart,
              BarChart: typeof window.BarChart,
              PieChart: typeof window.PieChart,
              ResponsiveContainer: typeof window.ResponsiveContainer
            });
            console.log('Available UI components:', {
              Card: typeof window.Card,
              Button: typeof window.Button
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
