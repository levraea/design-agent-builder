
import { useEffect, useRef, useState } from 'react';

interface LiveUpdateManagerProps {
  code: string;
  onCodeChange: (newCode: string) => void;
  debounceMs?: number;
}

export const LiveUpdateManager = ({ 
  code, 
  onCodeChange, 
  debounceMs = 300 
}: LiveUpdateManagerProps) => {
  const [pendingUpdate, setPendingUpdate] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Debounced code updates
  useEffect(() => {
    if (pendingUpdate !== null) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onCodeChange(pendingUpdate);
        setPendingUpdate(null);
      }, debounceMs);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pendingUpdate, onCodeChange, debounceMs]);

  // Simulate live updates (in a real app, this would come from WebSocket)
  const triggerUpdate = (newCode: string) => {
    setPendingUpdate(newCode);
  };

  // Expose the trigger function for external use
  useEffect(() => {
    // Store the trigger function globally so other components can use it
    (window as any).triggerLiveUpdate = triggerUpdate;
    
    return () => {
      delete (window as any).triggerLiveUpdate;
    };
  }, []);

  return null; // This is a utility component
};
