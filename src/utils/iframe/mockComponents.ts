
export const generateMockUIComponents = (): string => {
  return `
            // Mock shadcn/ui components for iframe execution
            
            // Button component
            const Button = ({ children, className = '', variant = 'default', size = 'default', onClick, disabled, ...props }) => {
              const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
              
              const variantClasses = {
                default: 'bg-blue-600 text-white hover:bg-blue-700',
                destructive: 'bg-red-600 text-white hover:bg-red-700',
                outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
                secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
                ghost: 'hover:bg-gray-100',
                link: 'text-blue-600 underline-offset-4 hover:underline'
              };
              
              const sizeClasses = {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10'
              };
              
              const combinedClasses = \`\${baseClasses} \${variantClasses[variant] || variantClasses.default} \${sizeClasses[size] || sizeClasses.default} \${className}\`;
              
              return React.createElement('button', {
                className: combinedClasses,
                onClick,
                disabled,
                ...props
              }, children);
            };
            
            // Input component
            const Input = ({ className = '', type = 'text', ...props }) => {
              const classes = \`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className}\`;
              
              return React.createElement('input', {
                type,
                className: classes,
                ...props
              });
            };
            
            // Label component
            const Label = ({ children, className = '', htmlFor, ...props }) => {
              const classes = \`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 \${className}\`;
              
              return React.createElement('label', {
                className: classes,
                htmlFor,
                ...props
              }, children);
            };
            
            // Select components
            const Select = ({ children, value, onValueChange, ...props }) => {
              return React.createElement('div', { className: 'relative' }, children);
            };
            
            const SelectTrigger = ({ children, className = '', ...props }) => {
              const classes = \`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className}\`;
              
              return React.createElement('button', {
                className: classes,
                ...props
              }, children);
            };
            
            const SelectValue = ({ placeholder, ...props }) => {
              return React.createElement('span', {
                className: 'text-gray-500',
                ...props
              }, placeholder);
            };
            
            const SelectContent = ({ children, className = '', ...props }) => {
              const classes = \`relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md \${className}\`;
              
              return React.createElement('div', {
                className: classes,
                ...props
              }, children);
            };
            
            const SelectItem = ({ children, value, className = '', ...props }) => {
              const classes = \`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 \${className}\`;
              
              return React.createElement('div', {
                className: classes,
                ...props
              }, children);
            };
            
            // Progress component
            const Progress = ({ value = 0, className = '', ...props }) => {
              const classes = \`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 \${className}\`;
              
              return React.createElement('div', {
                className: classes,
                ...props
              }, React.createElement('div', {
                className: 'h-full w-full flex-1 bg-blue-600 transition-all',
                style: { transform: \`translateX(-\${100 - (value || 0)}%)\` }
              }));
            };
            
            // Card components
            const Card = ({ children, className = '', ...props }) => {
              const classes = \`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm \${className}\`;
              return React.createElement('div', { className: classes, ...props }, children);
            };
            
            const CardHeader = ({ children, className = '', ...props }) => {
              const classes = \`flex flex-col space-y-1.5 p-6 \${className}\`;
              return React.createElement('div', { className: classes, ...props }, children);
            };
            
            const CardTitle = ({ children, className = '', ...props }) => {
              const classes = \`text-2xl font-semibold leading-none tracking-tight \${className}\`;
              return React.createElement('h3', { className: classes, ...props }, children);
            };
            
            const CardDescription = ({ children, className = '', ...props }) => {
              const classes = \`text-sm text-gray-500 \${className}\`;
              return React.createElement('p', { className: classes, ...props }, children);
            };
            
            const CardContent = ({ children, className = '', ...props }) => {
              const classes = \`p-6 pt-0 \${className}\`;
              return React.createElement('div', { className: classes, ...props }, children);
            };
            
            const CardFooter = ({ children, className = '', ...props }) => {
              const classes = \`flex items-center p-6 pt-0 \${className}\`;
              return React.createElement('div', { className: classes, ...props }, children);
            };
            
            // Textarea component
            const Textarea = ({ className = '', ...props }) => {
              const classes = \`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className}\`;
              
              return React.createElement('textarea', {
                className: classes,
                ...props
              });
            };
            
            // Badge component
            const Badge = ({ children, className = '', variant = 'default', ...props }) => {
              const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
              
              const variantClasses = {
                default: 'border-transparent bg-blue-600 text-white hover:bg-blue-700',
                secondary: 'border-transparent bg-gray-200 text-gray-900 hover:bg-gray-300',
                destructive: 'border-transparent bg-red-600 text-white hover:bg-red-700',
                outline: 'text-gray-950 border-gray-200'
              };
              
              const combinedClasses = \`\${baseClasses} \${variantClasses[variant] || variantClasses.default} \${className}\`;
              
              return React.createElement('div', {
                className: combinedClasses,
                ...props
              }, children);
            };
            
            // Make components available globally
            window.Button = Button;
            window.Input = Input;
            window.Label = Label;
            window.Select = Select;
            window.SelectTrigger = SelectTrigger;
            window.SelectValue = SelectValue;
            window.SelectContent = SelectContent;
            window.SelectItem = SelectItem;
            window.Progress = Progress;
            window.Card = Card;
            window.CardHeader = CardHeader;
            window.CardTitle = CardTitle;
            window.CardDescription = CardDescription;
            window.CardContent = CardContent;
            window.CardFooter = CardFooter;
            window.Textarea = Textarea;
            window.Badge = Badge;
            
            console.log('✅ All shadcn/ui components loaded successfully');`;
};
