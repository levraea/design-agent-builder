
import { useState } from 'react';
import { PromptInput } from '@/components/PromptInput';
import { LivePreview } from '@/components/LivePreview';
import { APIRegistry } from '@/components/APIRegistry';
import { ComponentLibrary } from '@/components/ComponentLibrary';
import { GeneratedCode } from '@/components/GeneratedCode';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedAPIs, setSelectedAPIs] = useState<string[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateApp = async (userPrompt: string) => {
    setIsGenerating(true);
    setPrompt(userPrompt);
    
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate sample code based on prompt
    const sampleCode = generateSampleCode(userPrompt, selectedAPIs, selectedComponents);
    setGeneratedCode(sampleCode);
    setIsGenerating(false);
  };

  const generateSampleCode = (prompt: string, apis: string[], components: string[]) => {
    return `import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GeneratedApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generated based on: "${prompt}"
  // Using APIs: ${apis.join(', ') || 'None selected'}
  // Using Components: ${components.join(', ') || 'Default UI components'}

  useEffect(() => {
    // Fetch data from selected APIs
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // API calls would be made here based on selected APIs
      const response = await fetch('/api/sample-endpoint');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generated Application</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Enter your input..." />
            <Button onClick={fetchData} disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </Button>
            {data.length > 0 && (
              <div className="grid gap-4">
                {data.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p>Data item {index + 1}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratedApp;`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <PromptInput 
              onGenerate={handleGenerateApp}
              isGenerating={isGenerating}
            />
            
            <Tabs defaultValue="apis" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="apis">API Registry</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="code">Generated Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="apis" className="mt-4">
                <APIRegistry 
                  selectedAPIs={selectedAPIs}
                  onSelectionChange={setSelectedAPIs}
                />
              </TabsContent>
              
              <TabsContent value="components" className="mt-4">
                <ComponentLibrary
                  selectedComponents={selectedComponents}
                  onSelectionChange={setSelectedComponents}
                />
              </TabsContent>
              
              <TabsContent value="code" className="mt-4">
                <GeneratedCode code={generatedCode} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <LivePreview code={generatedCode} isGenerating={isGenerating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
