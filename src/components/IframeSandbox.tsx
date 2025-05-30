
import React, { useEffect } from 'react';
import { useIframeManager } from '@/hooks/useIframeManager';
import { IframeSandboxError } from '@/components/IframeSandboxError';
import { generateIframeContent } from '@/utils/iframeContentGenerator';
import { cleanCode } from '@/utils/codeProcessor';

interface IframeSandboxProps {
  code: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export const IframeSandbox = ({ code, onError, onSuccess }: IframeSandboxProps) => {
  const {
    iframeRef,
    error,
    isLoading,
    setIsLoading,
    setError,
    writeToIframe
  } = useIframeManager({ code, onError, onSuccess });

  useEffect(() => {
    if (!code.trim() || !iframeRef.current) return;

    setIsLoading(true);
    setError(null);

    const processedCode = cleanCode(code);
    const iframeContent = generateIframeContent(processedCode);
    writeToIframe(iframeContent);
  }, [code, writeToIframe, setIsLoading, setError]);

  if (error) {
    return <IframeSandboxError error={error} />;
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-sm text-gray-600">Loading preview...</div>
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
