
import { useState, useEffect, useRef } from 'react';

interface PreviewState {
  version: number;
  code: string;
  timestamp: number;
  componentState?: any;
}

interface PreviewStateManagerProps {
  currentCode: string;
  onStateChange: (state: PreviewState) => void;
  maxHistorySize?: number;
}

export const PreviewStateManager = ({ 
  currentCode, 
  onStateChange, 
  maxHistorySize = 50 
}: PreviewStateManagerProps) => {
  const [history, setHistory] = useState<PreviewState[]>([]);
  const [currentVersion, setCurrentVersion] = useState(0);
  const componentStateRef = useRef<any>({});

  // Create new state when code changes
  useEffect(() => {
    if (currentCode.trim()) {
      const newState: PreviewState = {
        version: currentVersion + 1,
        code: currentCode,
        timestamp: Date.now(),
        componentState: { ...componentStateRef.current }
      };

      setHistory(prev => {
        const updated = [...prev, newState].slice(-maxHistorySize);
        return updated;
      });

      setCurrentVersion(prev => prev + 1);
      onStateChange(newState);
    }
  }, [currentCode, currentVersion, onStateChange, maxHistorySize]);

  // Expose methods for external use
  useEffect(() => {
    (window as any).saveComponentState = (state: any) => {
      componentStateRef.current = state;
    };

    (window as any).getPreviewHistory = () => history;

    (window as any).revertToVersion = (version: number) => {
      const state = history.find(s => s.version === version);
      if (state) {
        onStateChange(state);
      }
    };

    return () => {
      delete (window as any).saveComponentState;
      delete (window as any).getPreviewHistory;
      delete (window as any).revertToVersion;
    };
  }, [history, onStateChange]);

  return null;
};
