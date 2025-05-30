
import React, { useRef, useEffect, useState } from 'react';
import { IframeContentGenerator } from './IframeContentGenerator';
import { ErrorDisplay } from './ErrorDisplay';
import { LoadingOverlay } from './LoadingOverlay';

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
    if (!code.trim() || !iframeRef.current) return;

    console.log('IframeSandbox: Starting to load code');
    setIsLoading(true);
    setError(null);

    try {
      const iframe = iframeRef.current;
      
      // Clean code (remove markdown if present)
      let cleanCode = code;
      if (cleanCode.includes('```')) {
        cleanCode = cleanCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      }

      console.log('IframeSandbox: Creating iframe content');

      // Generate iframe content
      const iframeContent = IframeContentGenerator.generate(cleanCode);

      // Write content to iframe
      iframe.srcdoc = iframeContent;
      
      // Set up timeout for loading
      const timeoutId = setTimeout(() => {
        console.error('IframeSandbox: Preview timeout occurred');
        setIsLoading(false);
        setError('Preview timeout - network connectivity issue or CDN unavailable. Please check your internet connection and try again.');
        onError?.('Preview timeout');
      }, 12000);

      // Clear timeout when iframe loads
      iframe.onload = () => {
        console.log('IframeSandbox: Iframe onload fired');
        clearTimeout(timeoutId);
      };
      
      setIsLoading(false);
      onSuccess?.();

    } catch (err) {
      console.error('IframeSandbox: Setup error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      onError?.(errorMessage);
    }
  }, [code, onError, onSuccess]);

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('IframeSandbox: Received message from iframe:', event.data);
      if (event.data.type === 'error') {
        setError(event.data.message);
        setIsLoading(false);
        onError?.(event.data.message);
      } else if (event.data.type === 'success') {
        console.log('IframeSandbox: Success message received');
        setError(null);
        setIsLoading(false);
        onSuccess?.();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onError, onSuccess]);

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="w-full h-full relative">
      <LoadingOverlay isLoading={isLoading} />
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        title="Code Preview"
      />
    </div>
  );
};
