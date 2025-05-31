
export const generateCodeProcessor = (cleanCode: string): string => {
  return `
            // Process the code
            let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Remove import/export statements and replace with global references
            processedCode = processedCode.replace(/import\\s+.*?from\\s+['"]@material-tailwind\\/react['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+\\{([^}]*)\\}\\s+from\\s+['"]@material-tailwind\\/react['"];?\\s*/g, (match, imports) => {
              // Map Material Tailwind imports to global references
              const importList = imports.split(',').map(imp => imp.trim());
              let replacements = '';
              importList.forEach(imp => {
                if (imp === 'Card') replacements += 'const Card = window.MaterialCard;\\n';
                else if (imp === 'CardHeader') replacements += 'const CardHeader = window.MaterialCardHeader;\\n';
                else if (imp === 'CardBody') replacements += 'const CardBody = window.MaterialCardBody;\\n';
                else if (imp === 'Button') replacements += 'const Button = window.MaterialButton;\\n';
                else if (imp === 'Typography') replacements += 'const Typography = window.MaterialTypography;\\n';
              });
              return replacements;
            });
            
            // Handle Heroicons imports
            processedCode = processedCode.replace(/import\\s+\\{([^}]*)\\}\\s+from\\s+['"]@heroicons\\/react\\/24\\/outline['"];?\\s*/g, (match, imports) => {
              // Map Heroicons imports to Lucide React icons (which are available)
              const importList = imports.split(',').map(imp => imp.trim());
              let replacements = '';
              importList.forEach(imp => {
                // Map common Heroicons to Lucide equivalents
                const iconMap = {
                  'UserIcon': 'User',
                  'HomeIcon': 'Home',
                  'CogIcon': 'Settings',
                  'BellIcon': 'Bell',
                  'ChatIcon': 'MessageCircle',
                  'SearchIcon': 'Search',
                  'PlusIcon': 'Plus',
                  'XIcon': 'X',
                  'CheckIcon': 'Check',
                  'ArrowLeftIcon': 'ArrowLeft',
                  'ArrowRightIcon': 'ArrowRight',
                  'ChevronDownIcon': 'ChevronDown',
                  'ChevronUpIcon': 'ChevronUp'
                };
                const lucideIcon = iconMap[imp] || imp.replace('Icon', '');
                replacements += \`// Using Lucide \${lucideIcon} instead of Heroicons \${imp}\\n\`;
              });
              return replacements;
            });
            
            // Remove other import/export statements
            processedCode = processedCode.replace(/import\\s+.*?from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s*\\{[^}]*\\}\\s*from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/import\\s+\\*\\s+as\\s+\\w+\\s+from\\s+['"][^'"]+['"];?\\s*/g, '');
            processedCode = processedCode.replace(/export\\s+default\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+function\\s+GeneratedApp/g, 'function GeneratedApp');
            processedCode = processedCode.replace(/export\\s+default\\s+GeneratedApp/g, '// GeneratedApp exported');
            processedCode = processedCode.replace(/export\\s+\\{[^}]*\\}/g, '// exports removed');

            console.log('Processing code...');
            console.log('Available components:', {
              Card: typeof window.Card,
              Button: typeof window.Button,
              MaterialCard: typeof window.MaterialCard,
              MaterialButton: typeof window.MaterialButton,
              ArcElement: typeof window.ArcElement
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
