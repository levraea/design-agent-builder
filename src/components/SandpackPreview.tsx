
import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Loader2 } from 'lucide-react';

interface SandpackPreviewProps {
  code: string;
  isGenerating: boolean;
}

export const SandpackPreview = ({ code, isGenerating }: SandpackPreviewProps) => {
  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
          <p className="text-lg font-medium text-gray-700">Generating Application...</p>
          <p className="text-sm text-gray-500 mt-2">
            AI is analyzing your prompt and selecting the best APIs and components
          </p>
        </div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-lg font-medium mb-2">Sandpack Live Preview</h3>
          <p>Your generated application will appear here</p>
          <p className="text-sm mt-2">Now with reliable dependency loading</p>
        </div>
      </div>
    );
  }

  // Convert the generated code to work with Sandpack
  const sandpackCode = convertCodeForSandpack(code);

  return (
    <div className="h-full">
      <Sandpack
        template="react-ts"
        files={{
          '/App.tsx': sandpackCode,
        }}
        customSetup={{
          dependencies: {
            'recharts': '^2.12.7',
            'lucide-react': '^0.462.0',
            '@radix-ui/react-slot': '^1.1.0',
            'class-variance-authority': '^0.7.1',
            'clsx': '^2.1.1',
            'tailwind-merge': '^2.5.2'
          }
        }}
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: false,
          showInlineErrors: true,
          autorun: true,
          autoReload: true,
          recompileMode: 'delayed',
          recompileDelay: 500
        }}
        theme="light"
      />
    </div>
  );
};

// Simplified conversion - Sandpack handles most of the heavy lifting
const convertCodeForSandpack = (code: string): string => {
  // Add necessary imports and mock components at the top
  const imports = `import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, AreaChart, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line, Area, Pie, Cell } from 'recharts';

// Mock UI components for Sandpack
const Card = ({ children, className = '' }) => (
  <div className={\`bg-white rounded-lg border shadow-sm \${className}\`}>{children}</div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={\`flex flex-col space-y-1.5 p-6 \${className}\`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={\`text-2xl font-semibold leading-none tracking-tight \${className}\`}>{children}</h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={\`p-6 pt-0 \${className}\`}>{children}</div>
);

const Button = ({ children, onClick, disabled = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={\`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 \${className}\`}
  >
    {children}
  </button>
);

const Input = ({ placeholder, className = '', ...props }) => (
  <input
    placeholder={placeholder}
    className={\`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className}\`}
    {...props}
  />
);

// Enhanced fetch function for API calls
const enhancedFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return response;
  } catch (error) {
    console.error('Enhanced fetch error:', error);
    throw error;
  }
};

`;

  // Simple extraction of the component body - Sandpack handles JSX parsing
  let cleanCode = code.replace(/^function GeneratedApp\(\)\s*\{/, '').replace(/\}$/, '');
  
  // Add the component export
  const fullCode = `${imports}

function GeneratedApp() {
${cleanCode}
}

export default GeneratedApp;`;

  return fullCode;
};
