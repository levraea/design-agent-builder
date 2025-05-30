
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code, Copy, Download } from 'lucide-react';
import { useState } from 'react';

interface GeneratedCodeProps {
  code: string;
}

export const GeneratedCode = ({ code }: GeneratedCodeProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-app.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-end">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!code}
            >
              <Copy className="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!code}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        {code ? (
          <ScrollArea className="h-full">
            <pre className="bg-gray-900 text-gray-100 p-4 text-sm font-mono whitespace-pre-wrap break-words">
              <code>{code}</code>
            </pre>
          </ScrollArea>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg m-4">
            <div className="text-center">
              <Code className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Generated code will appear here</p>
              <p className="text-sm mt-1">Enter a prompt and generate an application to see the code</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
