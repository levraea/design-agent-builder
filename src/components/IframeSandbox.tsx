
import React, { useRef, useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface IframeSandboxProps {
  code: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export const IframeSandbox = ({ code, onError, onSuccess }: IframeSandboxProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('IframeSandbox: code changed', { codeLength: code?.length, hasCode: !!code?.trim() });
    
    if (!code?.trim() || !iframeRef.current) {
      console.log('IframeSandbox: no code or iframe, stopping loading');
      setIsLoading(false);
      return;
    }

    console.log('IframeSandbox: starting execution');
    setIsLoading(true);
    setError(null);

    const iframe = iframeRef.current;
    
    // Simple iframe content that just shows the code exists
    const iframeContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            margin: 0; 
            padding: 20px; 
            font-family: system-ui, -apple-system, sans-serif;
            background: white;
          }
        </style>
      </head>
      <body>
        <div id="root">
          <div style="padding: 20px; text-align: center; color: #666;">
            <h3>Code Preview</h3>
            <p>Code length: ${code.length} characters</p>
            <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; text-align: left; overflow-x: auto; max-height: 200px;">${code.substring(0, 500)}${code.length > 500 ? '...' : ''}</pre>
          </div>
        </div>
        <script>
          console.log('Iframe loaded successfully');
          window.parent.postMessage({ type: 'success' }, '*');
        </script>
      </body>
      </html>
    `;

    // Set timeout to prevent endless loading
    const loadTimeout = setTimeout(() => {
      console.log('IframeSandbox: load timeout reached');
      setIsLoading(false);
      setError('Preview loading timeout - iframe took too long to respond');
      onError?.('Preview loading timeout');
    }, 3000);

    // Handle iframe load
    const handleLoad = () => {
      console.log('IframeSandbox: iframe loaded');
      clearTimeout(loadTimeout);
      // Give iframe time to execute and send message
      setTimeout(() => {
        console.log('IframeSandbox: setting loading to false after delay');
        setIsLoading(false);
      }, 1000);
    };

    iframe.onload = handleLoad;
    iframe.onerror = () => {
      console.log('IframeSandbox: iframe error');
      clearTimeout(loadTimeout);
      setIsLoading(false);
      setError('Failed to load iframe');
    };

    console.log('IframeSandbox: setting iframe srcdoc');
    iframe.srcdoc = iframeContent;

    return () => {
      console.log('IframeSandbox: cleanup');
      clearTimeout(loadTimeout);
    };

  }, [code, onError, onSuccess]);

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('IframeSandbox: received message', event.data);
      
      if (event.data.type === 'error') {
        setError(event.data.message);
        setIsLoading(false);
        onError?.(event.data.message);
      } else if (event.data.type === 'success') {
        console.log('IframeSandbox: success message received');
        setError(null);
        setIsLoading(false);
        onSuccess?.();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onError, onSuccess]);

  console.log('IframeSandbox: rendering', { isLoading, error, hasCode: !!code });

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Sandbox Error:</strong> {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Loading preview...</div>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        title="Code Preview"
      />
    </div>
  );
};
