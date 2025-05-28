import { useState } from 'react';
import { PromptInput } from '@/components/PromptInput';
import { LivePreview } from '@/components/LivePreview';
import { APIRegistry } from '@/components/APIRegistry';
import { ComponentLibrary } from '@/components/ComponentLibrary';
import { GeneratedCode } from '@/components/GeneratedCode';
import { ConversationHistory } from '@/components/ConversationHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code } from 'lucide-react';
import { mockAPIs } from '@/data/mockAPIs';

interface ConversationMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface DesignToCodeProps {
  onModuleComplete?: (moduleUrl: string) => void;
}

const DesignToCode = ({ onModuleComplete }: DesignToCodeProps) => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedAPIs, setSelectedAPIs] = useState<string[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

  // Hardcoded API key
  const GEMINI_API_KEY = 'AIzaSyArurZHRyqjGo8a0LS1bZOsTpQr2QgjwqY';

  const addToConversationHistory = (type: 'user' | 'ai', content: string) => {
    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, newMessage]);
  };

  const handleGenerateApp = async (userPrompt: string) => {
    setIsGenerating(true);
    setPrompt(userPrompt);
    
    // Add user prompt to conversation history
    addToConversationHistory('user', userPrompt);
    
    try {
      // Get selected API details
      const selectedAPIDetails = mockAPIs.filter(api => selectedAPIs.includes(api.id));
      
      // Augment the prompt with API information and design requirements
      let augmentedPrompt = userPrompt;
      
      if (selectedAPIDetails.length > 0) {
        const apiContext = selectedAPIDetails.map(api => 
          `- ${api.name} (${api.link}): ${api.description}. Auth: ${api.auth}, HTTPS: ${api.https}, CORS: ${api.cors}`
        ).join('\n');
        
        augmentedPrompt = `${userPrompt}

IMPORTANT: Use the following selected APIs in your implementation:
${apiContext}

Make sure to integrate these APIs into the generated component to fetch and display relevant data.`;
      }

      // Add design requirements to the prompt
      augmentedPrompt = `${augmentedPrompt}

The app should use Material UI design system and Roboto font, ensure the resulting app is intuitive and easy to navigate, and incorporate responsive design principles for compatibility across desktop, tablet, and mobile devices.`;

      // Build conversation context for the AI model
      let conversationContext = '';
      if (conversationHistory.length > 0) {
        conversationContext = `
CONVERSATION HISTORY:
${conversationHistory.map(msg => `${msg.type.toUpperCase()}: ${msg.content}`).join('\n')}

CURRENT REQUEST:
USER: ${userPrompt}

Please consider the above conversation history when generating the component. Build upon previous requests and maintain consistency with what was discussed before.

`;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
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

${conversationContext}

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

${conversationContext ? 'Based on the conversation history above, ' : ''}User prompt: ${augmentedPrompt}`
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
      
      // Add AI response to conversation history
      addToConversationHistory('ai', 'Generated a React component based on your prompt and conversation history. The code is now available in the Live Preview and Generated Code tab.');
      
      // Mark the Design-to-Code Generation module as complete
      if (onModuleComplete) {
        onModuleComplete('/design-to-code');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      // Fallback to sample code if API fails
      const fallbackCode = generateSampleCode(userPrompt, selectedAPIs, selectedComponents);
      setGeneratedCode(fallbackCode);
      
      // Add AI response to conversation history for fallback
      addToConversationHistory('ai', 'Generated a fallback React component. The API request failed, but I created a sample component based on your prompt.');
      
      // Still mark as complete even with fallback
      if (onModuleComplete) {
        onModuleComplete('/design-to-code');
      }
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
            <Code className="w-8 h-8 text-blue-600" />
            <span>Design-to-Code Generation</span>
          </h1>
          <p className="text-gray-600">Generate front-end code using preferred tech stack and headless architecture</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)]">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <ConversationHistory messages={conversationHistory} />
            
            <PromptInput 
              onGenerate={handleGenerateApp}
              isGenerating={isGenerating}
              conversationHistory={conversationHistory}
            />
            
            <Tabs defaultValue="apis" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="apis">API Registry</TabsTrigger>
                <TabsTrigger value="components">Element Components</TabsTrigger>
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
            </Tabs>
          </div>

          {/* Right Panel - Live Preview and Generated Code */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Tabs defaultValue="preview" className="h-full flex flex-col">
              <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
                <TabsList className="bg-gray-800 h-8">
                  <TabsTrigger value="preview" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Live Preview</TabsTrigger>
                  <TabsTrigger value="code" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Generated Code</TabsTrigger>
                </TabsList>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <TabsContent value="preview" className="flex-1 m-0">
                <LivePreview code={generatedCode} isGenerating={isGenerating} />
              </TabsContent>
              
              <TabsContent value="code" className="flex-1 m-0 p-4">
                <GeneratedCode code={generatedCode} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignToCode;
