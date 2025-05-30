
import { generateChartJSSetup } from './chartjsSetup';
import { generateMockUIComponents } from './mockComponents';
import { generateCodeProcessor } from './codeProcessor';

export const generateAppInitializer = (cleanCode: string): string => {
  return `
        function initializeApp() {
          console.log('Initializing app...');
          try {
            const { useState, useEffect, useMemo, useCallback } = React;
            
            ${generateChartJSSetup()}
            
            ${generateMockUIComponents()}

            ${generateCodeProcessor(cleanCode)}
          } catch (error) {
            console.error('Execution error:', error);
            document.getElementById('root').innerHTML = 
              '<div class="error"><strong>Error:</strong> ' + error.message + '</div>';
            
            // Signal error to parent
            window.parent.postMessage({ 
              type: 'error', 
              message: error.message,
              stack: error.stack 
            }, '*');
          }
        }`;
};
