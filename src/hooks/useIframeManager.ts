
import { useRef, useEffect, useState, useCallback } from 'react';

interface UseIframeManagerProps {
  code: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export const useIframeManager = ({ code, onError, onSuccess }: UseIframeManagerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simple message handler
  const handleMessage = useCallback((event: MessageEvent) => {
    // Only handle messages from our iframe
    if (event.source !== iframeRef.current?.contentWindow) return;
    
    if (event.data.type === 'error') {
      setError(event.data.message);
      setIsLoading(false);
      onError?.(event.data.message);
    } else if (event.data.type === 'success') {
      setError(null);
      setIsLoading(false);
      onSuccess?.();
    }
  }, [onError, onSuccess]);

  // Set up message listener
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const writeToIframe = useCallback((content: string) => {
    if (!iframeRef.current) return;

    try {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (!iframeDoc) {
        throw new Error('Cannot access iframe document');
      }

      iframeDoc.open();
      iframeDoc.write(content);
      iframeDoc.close();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      onError?.(errorMessage);
    }
  }, [onError]);

  return {
    iframeRef,
    error,
    isLoading,
    setIsLoading,
    setError,
    writeToIframe
  };
};
