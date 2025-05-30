
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LivePreview } from '@/components/LivePreview';
import { GeneratedCode } from '@/components/GeneratedCode';

interface PreviewPanelProps {
  generatedCode: string;
  isGenerating: boolean;
}

export const PreviewPanel = ({ generatedCode, isGenerating }: PreviewPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-200px)]">
      <Tabs defaultValue="preview" className="h-full flex flex-col">
        <TabsList className="bg-gray-800 h-8 m-4 mb-0">
          <TabsTrigger value="preview" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Live Preview</TabsTrigger>
          <TabsTrigger value="code" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Generated Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="flex-1 m-0">
          <LivePreview code={generatedCode} isGenerating={isGenerating} />
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 m-0 p-4">
          <GeneratedCode code={generatedCode} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
