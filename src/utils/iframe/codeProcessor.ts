
export const generateCodeProcessor = (cleanCode: string): string => {
  return `
            // Ensure React is properly available
            if (!window.React) {
              throw new Error('React is not available in the global scope');
            }
            
            // Process the code
            let processedCode = \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Remove any local enhancedFetch function definitions that might shadow the global one
            // More precise regex patterns to avoid breaking code structure
            processedCode = processedCode.replace(/const\\s+enhancedFetch\\s*=\\s*async\\s*\\([^)]*\\)\\s*=>\\s*\\{[^}]*\\}[^}]*\\}/g, '// enhancedFetch removed');
            processedCode = processedCode.replace(/async\\s+function\\s+enhancedFetch\\s*\\([^)]*\\)\\s*\\{[^}]*\\}[^}]*\\}/g, '// enhancedFetch removed');
            processedCode = processedCode.replace(/function\\s+enhancedFetch\\s*\\([^)]*\\)\\s*\\{[^}]*\\}[^}]*\\}/g, '// enhancedFetch removed');
            
            // Add data validation helpers at the top
            processedCode = 'const ensureArray = (data) => Array.isArray(data) ? data : [];\\n' + 
                           'const safeReduce = (arr, fn, initial) => ensureArray(arr).reduce(fn, initial);\\n' + 
                           'const safeFilter = (arr, fn) => ensureArray(arr).filter(fn);\\n' + 
                           'const safeMap = (arr, fn) => ensureArray(arr).map(fn);\\n' + processedCode;
            
            // Replace array operations with safe versions
            processedCode = processedCode.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\\.reduce\\(/g, 'safeReduce($1, ');
            processedCode = processedCode.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\\.filter\\(/g, 'safeFilter($1, ');
            processedCode = processedCode.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\\.map\\(/g, 'safeMap($1, ');
            
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
                else if (imp === 'CardFooter') replacements += 'const CardFooter = window.MaterialCardFooter || window.MaterialCardBody;\\n';
                else if (imp === 'Button') replacements += 'const Button = window.MaterialButton;\\n';
                else if (imp === 'Typography') replacements += 'const Typography = window.MaterialTypography;\\n';
                else if (imp === 'Select') replacements += 'const Select = window.MaterialSelect || window.Select;\\n';
                else if (imp === 'Option') replacements += 'const Option = window.MaterialOption || window.Option;\\n';
                else if (imp === 'Spinner') replacements += 'const Spinner = window.MaterialSpinner || (() => React.createElement("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" }));\\n';
              });
              return replacements;
            });
            
            // Handle React imports - ensure they use window.React
            processedCode = processedCode.replace(/import\\s+React[^;]*;?\\s*/g, 'const React = window.React;\\n');
            processedCode = processedCode.replace(/import\\s+\\{([^}]*)\\}\\s+from\\s+['"]react['"];?\\s*/g, (match, imports) => {
              const importList = imports.split(',').map(imp => imp.trim());
              let replacements = 'const React = window.React;\\n';
              importList.forEach(imp => {
                replacements += \`const \${imp} = React.\${imp};\\n\`;
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
            
            // Handle Lucide React imports - IMPROVED ICON HANDLING
            processedCode = processedCode.replace(/import\\s+\\{([^}]*)\\}\\s+from\\s+['"]lucide-react['"];?\\s*/g, (match, imports) => {
              const importList = imports.split(',').map(imp => imp.trim());
              let replacements = '';
              importList.forEach(imp => {
                // Create fallback icon component for ALL icons
                replacements += \`const \${imp} = window.Lucide && window.Lucide.Heart ? window.Lucide.Heart : (() => React.createElement('div', { className: 'w-4 h-4 bg-gray-300 rounded flex items-center justify-center text-xs', title: '\${imp} icon' }, '❤️'));\\n\`;
              });
              return replacements;
            });
            
            // COMPREHENSIVE FIX: Replace any remaining icon references in the code itself
            processedCode = processedCode.replace(/HeartHandshake/g, 'Heart');
            
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
              React: typeof window.React,
              ReactDOM: typeof window.ReactDOM,
              Card: typeof window.Card,
              Button: typeof window.Button,
              MaterialCard: typeof window.MaterialCard,
              MaterialButton: typeof window.MaterialButton,
              ArcElement: typeof window.ArcElement,
              Lucide: typeof window.Lucide,
              enhancedFetch: typeof window.enhancedFetch
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
