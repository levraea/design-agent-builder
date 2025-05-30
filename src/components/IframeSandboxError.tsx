
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface IframeSandboxErrorProps {
  error: string;
}

export const IframeSandboxError = ({ error }: IframeSandboxErrorProps) => {
  return (
    <Alert variant="destructive" className="m-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <strong>Sandbox Error:</strong> {error}
      </AlertDescription>
    </Alert>
  );
};
