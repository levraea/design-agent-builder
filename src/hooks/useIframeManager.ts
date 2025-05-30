
import { useRef, useEffect, useState } from 'react';

interface UseIframeManagerProps {
  code: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export const useIframeManager = ({ code, onError, onSuccess }: UseIframeManagerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'error') {
        setError(event.data.message);
        onError?.(event.data.message);
      } else if (event.data.type === 'success') {
        setError(null);
        onSuccess?.();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onError, onSuccess]);

  const writeToIframe = (content: string) => {
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

      setIsLoading(false);
      onSuccess?.();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      onError?.(errorMessage);
    }
  };

  return {
    iframeRef,
    error,
    isLoading,
    setIsLoading,
    setError,
    writeToIframe
  };
};
