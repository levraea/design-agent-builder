
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
          <p className="text-sm mt-2">Now with improved stability</p>
        </div>
      </div>
    );
  }

  // Clean up the generated code to work with Sandpack
  const cleanCode = code
    // Replace Material Tailwind imports with regular div elements
    .replace(/import.*@material-tailwind\/react.*;\n/g, '')
    // Replace Material Tailwind components with basic HTML elements
    .replace(/<Card\b[^>]*>/g, '<div className="bg-white rounded-lg shadow-lg overflow-hidden">')
    .replace(/<\/Card>/g, '</div>')
    .replace(/<CardHeader\b[^>]*>/g, '<div className="bg-blue-600 text-white p-4">')
    .replace(/<\/CardHeader>/g, '</div>')
    .replace(/<CardBody\b[^>]*>/g, '<div className="p-6">')
    .replace(/<\/CardBody>/g, '</div>')
    .replace(/<CardFooter\b[^>]*>/g, '<div className="bg-gray-50 border-t p-4">')
    .replace(/<\/CardFooter>/g, '</div>')
    .replace(/<Typography\b[^>]*>/g, '<div>')
    .replace(/<\/Typography>/g, '</div>')
    .replace(/<Select\b[^>]*>/g, '<select className="w-full p-2 border rounded">')
    .replace(/<\/Select>/g, '</select>')
    .replace(/<Option\b[^>]*value="([^"]*)"[^>]*>/g, '<option value="$1">')
    .replace(/<\/Option>/g, '</option>')
    // Fix template literal issues by ensuring proper escaping
    .replace(/`([^`]*\$\{[^}]*\}[^`]*)`/g, (match) => {
      // For template literals, ensure they're properly formatted
      return match.replace(/\n\s*/g, ' ');
    });

  const finalCode = `
import React, { useState, useEffect } from 'react';

// Mock components for Sandpack compatibility
const Card = ({ children, className = "" }) => <div className={\`bg-white rounded-lg shadow-lg overflow-hidden \${className}\`}>{children}</div>;
const Button = ({ children, onClick, className = "", disabled = false }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className={\`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 \${className}\`}
  >
    {children}
  </button>
);
const Input = ({ placeholder, className = "", ...props }) => (
  <input 
    placeholder={placeholder}
    className={\`w-full p-2 border rounded \${className}\`}
    {...props}
  />
);

${cleanCode}

export default GeneratedApp;
`;

  return (
    <div className="h-full">
      <Sandpack
        template="react"
        files={{
          '/App.js': finalCode,
        }}
        customSetup={{
          dependencies: {
            'recharts': '^2.12.7',
            'lucide-react': '^0.462.0'
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
          recompileDelay: 500,
          bundlerURL: 'https://sandpack-bundler.codesandbox.io'
        }}
        theme="light"
      />
    </div>
  );
};
