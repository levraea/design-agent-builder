
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

  // Prepare the code for Sandpack with minimal processing
  const finalCode = `
import React, { useState, useEffect } from 'react';

${code}

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
