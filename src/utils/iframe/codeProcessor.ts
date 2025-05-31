
export const generateCodeProcessor = (cleanCode: string): string => {
  return `
            // Ensure React is properly available
            if (!window.React) {
              throw new Error('React is not available in the global scope');
            }
            
            // Process the code with minimal transformations
            let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Only handle essential React imports - replace with window.React
            processedCode = processedCode.replace(/import\\s+React[^;]*;?\\s*/g, 'const React = window.React;\\n');
            processedCode = processedCode.replace(/import\\s+\\{([^}]*)\\}\\s+from\\s+['"]react['"];?\\s*/g, (match, imports) => {
              const importList = imports.split(',').map(imp => imp.trim());
              let replacements = 'const React = window.React;\\n';
              importList.forEach(imp => {
                replacements += \`const \${imp} = React.\${imp};\\n\`;
              });
              return replacements;
            });
            
            // Handle Lucide React imports - simple fallback
            processedCode = processedCode.replace(/import\\s+\\{([^}]*)\\}\\s+from\\s+['"]lucide-react['"];?\\s*/g, (match, imports) => {
              const importList = imports.split(',').map(imp => imp.trim());
              let replacements = '';
              importList.forEach(imp => {
                replacements += \`const \${imp} = window.Lucide && window.Lucide.\${imp} ? window.Lucide.\${imp} : (() => React.createElement('div', { className: 'w-4 h-4 bg-gray-300 rounded' }, '□'));\\n\`;
              });
              return replacements;
            });
            
            // Remove export statements
            processedCode = processedCode.replace(/export\\s+default\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+default\\s+GeneratedApp/g, '// GeneratedApp exported');
            
            // Remove other imports (let them fail naturally if needed)
            processedCode = processedCode.replace(/import\\s+.*?from\\s+['"][^'"]+['"];?\\s*/g, '// import removed\\n');
            processedCode = processedCode.replace(/import\\s+['"][^'"]+['"];?\\s*/g, '// import removed\\n');

            console.log('Processing code with minimal transformations...');
            
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
