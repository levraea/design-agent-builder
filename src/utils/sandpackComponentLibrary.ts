
export const getSandpackComponentLibrary = (): string => {
  return `// Shadcn/UI components (simplified for Sandpack)
const Card = ({ children, className = '', ...props }) => (
  <div className={\`bg-white rounded-lg border shadow-sm p-6 \${className}\`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={\`flex flex-col space-y-1.5 p-6 \${className}\`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={\`text-2xl font-semibold leading-none tracking-tight \${className}\`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={\`p-6 pt-0 \${className}\`} {...props}>
    {children}
  </div>
);

const Button = ({ children, className = '', variant = 'default', size = 'default', ...props }) => {
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
  
  return (
    <button
      className={\`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = '', type = 'text', ...props }) => (
  <input
    type={type}
    className={\`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className}\`}
    {...props}
  />
);

const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-primary hover:bg-primary/80 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
    destructive: 'bg-destructive hover:bg-destructive/80 text-destructive-foreground',
    outline: 'text-foreground border border-input'
  };
  
  return (
    <div
      className={\`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 \${variants[variant]} \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
};

const Title = ({ children, className = '', ...props }) => (
  <h3 className={\`text-2xl font-semibold leading-none tracking-tight \${className}\`} {...props}>
    {children}
  </h3>
);`;
};
