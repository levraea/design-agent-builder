
export const generateCodeProcessor = (cleanCode: string): string => {
  return `
            // Ensure React is available
            if (!window.React) {
              throw new Error('React is not available in the global scope');
            }
            
            let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Only do minimal essential transforms:
            
            // 1. Replace React imports with global reference
            processedCode = processedCode.replace(/import\\s+React[^;]*;?\\s*/g, 'const React = window.React;\\n');
            processedCode = processedCode.replace(/import\\s+\\{([^}]*)\\}\\s+from\\s+['"]react['"];?\\s*/g, (match, imports) => {
              const importList = imports.split(',').map(imp => imp.trim());
              let replacements = 'const React = window.React;\\n';
              importList.forEach(imp => {
                replacements += \`const \${imp} = React.\${imp};\\n\`;
              });
              return replacements;
            });
            
            // 2. Remove export statements
            processedCode = processedCode.replace(/export\\s+default\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+default\\s+GeneratedApp/g, '');
            
            // 3. Remove other imports (they'll be handled by globals or fail gracefully)
            processedCode = processedCode.replace(/import\\s+.*?from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+['"][^'"]+['"];?\\s*/g, '');

            // Transpile JSX and execute
            const transformedCode = Babel.transform(processedCode, {
              presets: ['react']
            }).code;

            eval(transformedCode);

            // Render
            if (typeof GeneratedApp === 'function') {
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(GeneratedApp));
              window.parent.postMessage({ type: 'success' }, '*');
            } else {
              throw new Error('GeneratedApp is not a valid React component');
            }`;
};
