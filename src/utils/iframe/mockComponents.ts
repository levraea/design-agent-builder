
export const generateMockUIComponents = (): string => {
  return `
            // Mock UI components for the sandbox
            const Card = ({ children, className = '' }) => 
              React.createElement('div', { className: 'bg-white border rounded-lg shadow-sm ' + className }, children);
            
            const CardHeader = ({ children, className = '' }) => 
              React.createElement('div', { className: 'px-6 py-4 border-b ' + className }, children);
            
            const CardTitle = ({ children, className = '' }) => 
              React.createElement('h3', { className: 'text-lg font-semibold ' + className }, children);
            
            const CardContent = ({ children, className = '' }) => 
              React.createElement('div', { className: 'px-6 py-4 ' + className }, children);
            
            const Button = ({ children, onClick, disabled, className = '' }) => 
              React.createElement('button', { 
                onClick, 
                disabled,
                className: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 ' + className
              }, children);
            
            const Input = ({ placeholder, value, onChange, className = '' }) => 
              React.createElement('input', { 
                placeholder, 
                value, 
                onChange,
                className: 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' + className
              });

            // Add missing Title component
            const Title = ({ children, className = '' }) => 
              React.createElement('h2', { className: 'text-xl font-bold ' + className }, children);`;
};
