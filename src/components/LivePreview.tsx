
import { Monitor } from 'lucide-react';
import { SandpackPreview } from './SandpackPreview';

interface LivePreviewProps {
  code: string;
  isGenerating: boolean;
}

export const LivePreview = ({ code, isGenerating }: LivePreviewProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-white overflow-hidden">
        <SandpackPreview code={code} isGenerating={isGenerating} />
      </div>
    </div>
  );
};
