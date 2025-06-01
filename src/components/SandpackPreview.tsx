
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
          <p className="text-sm mt-2">Now optimized for Sandpack compatibility</p>
        </div>
      </div>
    );
  }

  console.log('Raw AI-generated code:', code);

  // Prepare the code for Sandpack with imports and utilities
  const finalCode = `
import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  BarChart, 
  PieChart, 
  AreaChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Line, 
  Bar, 
  Area,
  Cell 
} from 'recharts';

// Enhanced fetch function for API calls with better error handling
window.enhancedFetch = async function(url, options) {
  console.log('enhancedFetch called with:', url);
  if (!options) {
    options = {};
  }
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
    
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Make enhancedFetch available globally
const enhancedFetch = window.enhancedFetch;

${code}

export default GeneratedApp;
`;

  console.log('Final code being sent to Sandpack:', finalCode);

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
            'lucide-react': '^0.462.0',
            'lodash': '^4.17.21'
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
