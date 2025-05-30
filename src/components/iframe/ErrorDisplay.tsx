
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <Alert variant="destructive" className="m-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <strong>Preview Error:</strong> {error}
      </AlertDescription>
    </Alert>
  );
};
