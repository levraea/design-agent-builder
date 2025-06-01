
import { processCodeForSandpack } from './sandpackCodeProcessor';
import { getSandpackComponentLibrary } from './sandpackComponentLibrary';
import { getSandpackStyles } from './sandpackStyles';

export const generateSandpackFiles = (code: string) => {
  const processedCode = processCodeForSandpack(code);
  const componentLibrary = getSandpackComponentLibrary();
  const cssContent = getSandpackStyles();

  const appContent = `import React, { useState, useEffect } from 'react';
import './styles.css';

${componentLibrary}

// Generated component
${processedCode}

export default function App() {
  return <GeneratedApp />;
}`;

  return {
    '/App.js': appContent,
    '/styles.css': cssContent,
  };
};
