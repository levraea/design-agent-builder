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
    
    try {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) {
        throw new Error('Please set your Gemini API key first');
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a React component generator. Generate a complete React functional component in PLAIN JAVASCRIPT using React.createElement() calls ONLY.

CRITICAL REQUIREMENTS:
- Use ONLY React.createElement() - NO JSX syntax at all
- NO angle brackets < > anywhere in the code
- Use plain JavaScript, NO TypeScript syntax or type annotations
- Use React hooks (useState, useEffect) as needed
- Use these available components: Card, CardContent, CardHeader, CardTitle, Button, Input
- Return ONLY the component code, no explanations or markdown
- Make it a complete, working component
- The component should be named "GeneratedApp"
- DO NOT include any import statements
- DO NOT include any export statements
- DO NOT include any TypeScript interfaces or types

EXAMPLE FORMAT:
function GeneratedApp() {
  const [count, setCount] = useState(0);
  
  return React.createElement('div', { className: 'p-4' },
    React.createElement(Card, null,
      React.createElement(CardHeader, null,
        React.createElement(CardTitle, null, 'My App')
      ),
      React.createElement(CardContent, null,
        React.createElement('p', null, 'Count: ' + count),
        React.createElement(Button, { onClick: () => setCount(count + 1) }, 'Increment')
      )
    )
  );
}

User prompt: ${userPrompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const generatedCode = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      setGeneratedCode(generatedCode);
    } catch (error) {
      console.error('Error generating code:', error);
      // Fallback to sample code if API fails
      const fallbackCode = generateSampleCode(userPrompt, selectedAPIs, selectedComponents);
      setGeneratedCode(fallbackCode);
    }
    
    setIsGenerating(false);
  };

  const generateSampleCode = (prompt: string, apis: string[], components: string[]) => {
    return `function GeneratedApp() {
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

  return React.createElement('div', { className: 'p-6 max-w-4xl mx-auto' },
    React.createElement(Card, { className: 'mb-6' },
      React.createElement(CardHeader, null,
        React.createElement(CardTitle, null, 'Generated Application')
      ),
      React.createElement(CardContent, null,
        React.createElement('div', { className: 'space-y-4' },
          React.createElement(Input, { placeholder: 'Enter your input...' }),
          React.createElement(Button, { 
            onClick: fetchData, 
            disabled: loading 
          }, loading ? 'Loading...' : 'Submit'),
          data.length > 0 && React.createElement('div', { className: 'grid gap-4' },
            data.map((item, index) =>
              React.createElement(Card, { key: index },
                React.createElement(CardContent, { className: 'p-4' },
                  React.createElement('p', null, 'Data item ' + (index + 1))
                )
              )
            )
          )
        )
      )
    )
  );
}`;
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
