
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
  const lastCodeRef = useRef<string>('');
  const messageHandlerRef = useRef<((event: MessageEvent) => void) | null>(null);

  // Stable message handler that doesn't change on every render
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

  // Set up message listener only once
  useEffect(() => {
    // Remove previous listener if it exists
    if (messageHandlerRef.current) {
      window.removeEventListener('message', messageHandlerRef.current);
    }

    // Store the new handler reference
    messageHandlerRef.current = handleMessage;
    window.addEventListener('message', handleMessage);

    return () => {
      if (messageHandlerRef.current) {
        window.removeEventListener('message', messageHandlerRef.current);
      }
    };
  }, [handleMessage]);

  const writeToIframe = useCallback((content: string) => {
    if (!iframeRef.current) return;

    // Prevent writing the same content multiple times
    if (lastCodeRef.current === content) {
      setIsLoading(false);
      return;
    }

    try {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (!iframeDoc) {
        throw new Error('Cannot access iframe document');
      }

      // Store the content we're writing
      lastCodeRef.current = content;

      iframeDoc.open();
      iframeDoc.write(content);
      iframeDoc.close();

      // Don't immediately set loading to false, wait for success message
      onSuccess?.();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      onError?.(errorMessage);
    }
  }, [onError, onSuccess]);

  return {
    iframeRef,
    error,
    isLoading,
    setIsLoading,
    setError,
    writeToIframe
  };
};
