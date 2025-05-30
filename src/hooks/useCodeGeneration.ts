import { useState } from 'react';
import { ConversationMessage } from '@/types/conversation';

export const useCodeGeneration = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

  // Hardcoded API key
  const GEMINI_API_KEY = 'AIzaSyCQdatAJtVX1MulVsd2DtUfFKi7xHYhkSY';
  
  const addToConversationHistory = (type: 'user' | 'ai', content: string) => {
    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, newMessage]);
  };

  const generateSampleCode = (prompt: string, apis: string[], components: string[], errorMessage?: string) => {
    return `function GeneratedApp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generated based on: "${prompt}"
  // Using APIs: ${apis.join(', ') || 'None selected'}
  // Using Components: ${components.join(', ') || 'Default UI components'}
  ${errorMessage ? `// API Error: ${errorMessage}` : ''}

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
        React.createElement(CardTitle, null, 'Generated Application (Fallback)')
      ),
      React.createElement(CardContent, null,
        React.createElement('div', { className: 'space-y-4' },
          ${errorMessage ? `React.createElement('div', { className: 'bg-red-50 border border-red-200 rounded-md p-4 mb-4' },
            React.createElement('h4', { className: 'text-red-800 font-medium mb-2' }, 'API Generation Failed'),
            React.createElement('p', { className: 'text-red-600 text-sm' }, '${errorMessage}'),
            React.createElement('p', { className: 'text-red-600 text-sm mt-2' }, 'Showing fallback component instead.')
          ),` : ''}
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

  const handleGenerateApp = async (
    userPrompt: string, 
    selectedAPIs: string[], 
    selectedComponents: string[],
    onModuleComplete?: (moduleUrl: string) => void
  ) => {
    setIsGenerating(true);
    
    // Add user prompt to conversation history
    addToConversationHistory('user', userPrompt);
    
    try {
      // Get selected API details from mockAPIs
      const { mockAPIs } = await import('@/data/mockAPIs');
      const selectedAPIDetails = mockAPIs.filter(api => selectedAPIs.includes(api.id));
      
      // Augment the prompt with API information and design requirements
      let augmentedPrompt = userPrompt;
      
      if (selectedAPIDetails.length > 0) {
        const apiContext = selectedAPIDetails.map(api => {
          let apiDetails = `- ${api.name} (${api.link}): ${api.description}. Auth: ${api.auth}, HTTPS: ${api.https}, CORS: ${api.cors}`;
          
          // Add specific API response structure information
          if (api.name === 'REST Countries') {
            apiDetails += `
            
REST Countries API Response Structure:
- Endpoint: https://restcountries.com/v3.1/all
- Each country object contains:
  * name.common (string) - Country name
  * capital (array) - Array of capital cities
  * population (number) - Population count
  * region (string) - Geographic region
  * flags.png (string) - Flag image URL
- IMPORTANT: Use lowercase 'capital' not 'Capital'`;
          }
          
          if (api.name === 'Open-Meteo') {
            apiDetails += `

Open-Meteo API Response Structure:
- Endpoint: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto
- Response contains:
  * daily.temperature_2m_max (array) - Max temperatures
  * daily.temperature_2m_min (array) - Min temperatures  
  * daily.precipitation_sum (array) - Precipitation amounts
  * daily.weathercode (array) - Weather condition codes
  * daily.time (array) - Date strings
- Weather codes: 0=clear, 1-3=partly cloudy, 45-48=fog, 51-67=rain, 71-77=snow, 80-99=thunderstorm`;
          }
          
          return apiDetails;
        }).join('\n');
        
        augmentedPrompt = `${userPrompt}

IMPORTANT: Use the following selected APIs in your implementation:
${apiContext}

Make sure to integrate these APIs into the generated component to fetch and display relevant data. Pay careful attention to the exact property names in the API responses.`;
      }

      // Add comprehensive design requirements to the prompt
      augmentedPrompt = `${augmentedPrompt}

DESIGN GUIDELINES:
- Create visually stunning, modern applications with rich interactions
- Use gradients, shadows, animations, and visual effects for maximum impact
- Implement responsive layouts with beautiful card-based designs
- Use vibrant color schemes with #0091DF (blue), #66B512 (green), and #D30F4B (red)
- Add hover effects, transitions, and micro-interactions
- Include loading states, success states, and engaging visual feedback
- Create rich data visualizations and interactive elements
- Use proper spacing, typography, and visual hierarchy
- Ensure accessibility with ARIA labels and semantic HTML

CODING REQUIREMENTS:
- Use exact property names from API responses (case-sensitive)
- Add proper error handling for API calls
- Include loading states while fetching data
- Use modern React patterns with hooks
- Ensure all variables are properly defined before use`;

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

      // Include current generated code if it exists
      let currentCodeContext = '';
      if (generatedCode.trim()) {
        currentCodeContext = `
CURRENT GENERATED CODE:
The following is the last code you generated. Please build upon this code and modify it according to the new request while maintaining existing functionality:

\`\`\`javascript
${generatedCode}
\`\`\`

MODIFICATION INSTRUCTIONS:
- Modify the existing GeneratedApp function above to incorporate the new request
- Keep all existing functionality that is not being changed
- Only update the parts that are specifically requested by the user
- Ensure the component still works correctly after modifications

`;
      }

      const fullPrompt = `You are a React component generator. Generate a complete React functional component using modern JSX syntax.

${conversationContext}${currentCodeContext}

CRITICAL REQUIREMENTS:
- Use React hooks (useState, useEffect) as needed
- Return ONLY the component code, no explanations or markdown
- Make it a complete, working component
- The component MUST be named "GeneratedApp"
- Use normal JSX syntax with angle brackets
- Create visually impressive applications with rich interactions and beautiful designs
- ENSURE ALL VARIABLES ARE DEFINED: Check that every variable you reference exists
- USE EXACT API PROPERTY NAMES: Match the exact case and structure from API documentation

EXAMPLE FORMAT (FOLLOW THIS EXACT STRUCTURE):
function GeneratedApp() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">My Beautiful App</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 mb-4">Count: {count}</p>
            <Button 
              onClick={() => setCount(count + 1)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Increment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

${conversationContext ? 'Based on the conversation history above, ' : ''}User prompt: ${augmentedPrompt}

REMEMBER: Return ONLY the GeneratedApp function code using JSX syntax, exactly as shown in the example format above. No explanations, no markdown, just the pure JavaScript function with JSX. Ensure all variables are properly defined and use exact API property names.`;

      // Log the complete prompt that will be sent to the AI
      console.log('=== FULL PROMPT SENT TO GEMINI API ===');
      console.log(fullPrompt);
      console.log('=== END OF PROMPT ===');

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
                  text: fullPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.0,
            maxOutputTokens: 2000,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const newGeneratedCode = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      setGeneratedCode(newGeneratedCode);
      
      // Add AI response to conversation history
      addToConversationHistory('ai', 'Generated a React component based on your prompt and conversation history. The code is now available in the Live Preview and Generated Code tab.');
      
      // Mark the Design-to-Code Generation module as complete
      if (onModuleComplete) {
        onModuleComplete('/design-to-code');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      // Fallback to sample code if API fails, including the error message
      const fallbackCode = generateSampleCode(userPrompt, selectedAPIs, selectedComponents, error.message);
      setGeneratedCode(fallbackCode);
      
      // Add AI response to conversation history for fallback
      addToConversationHistory('ai', `API request failed: ${error.message}. Generated a fallback React component instead.`);
      
      // Still mark as complete even with fallback
      if (onModuleComplete) {
        onModuleComplete('/design-to-code');
      }
    }
    
    setIsGenerating(false);
  };

  return {
    generatedCode,
    isGenerating,
    conversationHistory,
    handleGenerateApp,
    addToConversationHistory
  };
};
