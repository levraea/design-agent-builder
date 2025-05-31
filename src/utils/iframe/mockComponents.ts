
export const generateMockUIComponents = (): string => {
  return `
            // Ensure React is available before creating components
            if (!window.React) {
              throw new Error('React must be loaded before creating mock components');
            }
            
            // Mock UI components for common libraries
            
            // Shadcn/UI components (already available)
            window.Card = ({ children, className = '', ...props }) => 
              React.createElement('div', { 
                className: \`bg-white rounded-lg border shadow-sm p-6 \${className}\`,
                ...props 
              }, children);
            
            window.CardHeader = ({ children, className = '', ...props }) => 
              React.createElement('div', { 
                className: \`flex flex-col space-y-1.5 p-6 \${className}\`,
                ...props 
              }, children);
            
            window.CardTitle = ({ children, className = '', ...props }) => 
              React.createElement('h3', { 
                className: \`text-2xl font-semibold leading-none tracking-tight \${className}\`,
                ...props 
              }, children);
            
            window.CardContent = ({ children, className = '', ...props }) => 
              React.createElement('div', { 
                className: \`p-6 pt-0 \${className}\`,
                ...props 
              }, children);
            
            window.Button = ({ children, className = '', variant = 'default', size = 'default', ...props }) => {
              const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
              const variants = {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'underline-offset-4 hover:underline text-primary'
              };
              const sizes = {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-3 rounded-md',
                lg: 'h-11 px-8 rounded-md'
              };
              
              return React.createElement('button', {
                className: \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`,
                ...props
              }, children);
            };
            
            window.Input = ({ className = '', type = 'text', ...props }) => 
              React.createElement('input', {
                type,
                className: \`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className}\`,
                ...props
              });
            
            window.Badge = ({ children, className = '', variant = 'default', ...props }) => {
              const variants = {
                default: 'bg-primary hover:bg-primary/80 text-primary-foreground',
                secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
                destructive: 'bg-destructive hover:bg-destructive/80 text-destructive-foreground',
                outline: 'text-foreground border border-input'
              };
              
              return React.createElement('div', {
                className: \`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 \${variants[variant]} \${className}\`,
                ...props
              }, children);
            };
            
            // Material Tailwind components (mock implementations)
            window.MaterialCard = ({ children, className = '', ...props }) => 
              React.createElement('div', { 
                className: \`bg-white rounded-lg shadow-md p-6 \${className}\`,
                ...props 
              }, children);
            
            window.MaterialCardHeader = ({ children, className = '', ...props }) => 
              React.createElement('div', { 
                className: \`mb-4 \${className}\`,
                ...props 
              }, children);
            
            window.MaterialCardBody = ({ children, className = '', ...props }) => 
              React.createElement('div', { 
                className: \`\${className}\`,
                ...props 
              }, children);
            
            window.MaterialCardFooter = ({ children, className = '', ...props }) => 
              React.createElement('div', { 
                className: \`mt-4 pt-4 border-t border-gray-200 \${className}\`,
                ...props 
              }, children);
            
            window.MaterialButton = ({ children, className = '', color = 'blue', variant = 'filled', size = 'md', ...props }) => {
              const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
              const colorClasses = {
                blue: variant === 'filled' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border border-blue-500 text-blue-500 hover:bg-blue-50',
                red: variant === 'filled' ? 'bg-red-500 text-white hover:bg-red-600' : 'border border-red-500 text-red-500 hover:bg-red-50',
                green: variant === 'filled' ? 'bg-green-500 text-white hover:bg-green-600' : 'border border-green-500 text-green-500 hover:bg-green-50'
              };
              const sizeClasses = {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-4 py-2 text-sm',
                lg: 'px-6 py-3 text-base'
              };
              
              return React.createElement('button', {
                className: \`\${baseClasses} \${colorClasses[color]} \${sizeClasses[size]} \${className}\`,
                ...props
              }, children);
            };
            
            window.MaterialTypography = ({ children, variant = 'paragraph', className = '', ...props }) => {
              const variants = {
                h1: 'text-4xl font-bold',
                h2: 'text-3xl font-bold',
                h3: 'text-2xl font-bold',
                h4: 'text-xl font-bold',
                h5: 'text-lg font-bold',
                h6: 'text-base font-bold',
                paragraph: 'text-base',
                lead: 'text-lg text-gray-600',
                small: 'text-sm text-gray-500'
              };
              
              const tag = variant.startsWith('h') ? variant : 'p';
              
              return React.createElement(tag, {
                className: \`\${variants[variant]} \${className}\`,
                ...props
              }, children);
            };
            
            // Material Tailwind Select and Option components
            window.MaterialSelect = ({ children, label, value, onChange, className = '', ...props }) => {
              return React.createElement('div', { className: \`relative \${className}\` }, [
                label && React.createElement('label', { 
                  key: 'label',
                  className: 'block text-sm font-medium text-gray-700 mb-1' 
                }, label),
                React.createElement('select', {
                  key: 'select',
                  value,
                  onChange: (e) => onChange && onChange(e.target.value),
                  className: 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                  ...props
                }, children)
              ]);
            };
            
            window.MaterialOption = ({ children, value, ...props }) => 
              React.createElement('option', { value, ...props }, children);
            
            // Material Tailwind Spinner component
            window.MaterialSpinner = ({ className = '', color = 'blue', size = 'md', ...props }) => {
              const sizeClasses = {
                sm: 'h-4 w-4',
                md: 'h-8 w-8',
                lg: 'h-12 w-12'
              };
              const colorClasses = {
                blue: 'border-blue-500',
                red: 'border-red-500',
                green: 'border-green-500'
              };
              
              return React.createElement('div', {
                className: \`animate-spin rounded-full border-2 border-t-transparent \${sizeClasses[size]} \${colorClasses[color]} \${className}\`,
                ...props
              });
            };
            
            // Make components available under both names for compatibility
            window.Select = window.MaterialSelect;
            window.Option = window.MaterialOption;
            window.Spinner = window.MaterialSpinner;
            
            // Make Material Tailwind components available under the library namespace
            window.MaterialTailwind = {
              Card: window.MaterialCard,
              CardHeader: window.MaterialCardHeader,
              CardBody: window.MaterialCardBody,
              CardFooter: window.MaterialCardFooter,
              Button: window.MaterialButton,
              Typography: window.MaterialTypography,
              Select: window.MaterialSelect,
              Option: window.MaterialOption,
              Spinner: window.MaterialSpinner
            };
            
            console.log('UI components loaded and available globally');`;
};
