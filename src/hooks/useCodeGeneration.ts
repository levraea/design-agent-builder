
import { useState } from 'react';
import { ConversationMessage } from '@/types/conversation';
import { analyzePromptForAPIs } from '@/utils/promptAnalyzer';

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

  const parseAIResponse = (response: string): { description: string; code: string } => {
    // Look for DESCRIPTION: and CODE: markers
    const descriptionMatch = response.match(/DESCRIPTION:\s*(.*?)(?=\n\s*CODE:|\n\s*```|$)/s);
    const codeMatch = response.match(/CODE:\s*(.*?)$/s) || response.match(/```(?:javascript|js)?\s*(.*?)```/s);
    
    if (descriptionMatch && codeMatch) {
      return {
        description: descriptionMatch[1].trim(),
        code: codeMatch[1].trim()
      };
    }
    
    // Fallback: if structured format not found, try to extract function
    const functionMatch = response.match(/(function GeneratedApp\(\)[^]*)/);
    if (functionMatch) {
      return {
        description: "Generated a React component based on your request.",
        code: functionMatch[1].trim()
      };
    }
    
    // Last resort: treat entire response as code
    return {
      description: "Generated a React component based on your request.",
      code: response.trim()
    };
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
      
      // Use intelligent API selection if none are explicitly selected
      let apisToUse: string[];
      if (selectedAPIs.length > 0) {
        apisToUse = selectedAPIs;
        console.log('Using explicitly selected APIs:', apisToUse);
      } else {
        apisToUse = analyzePromptForAPIs(userPrompt, mockAPIs);
        console.log('Using AI-inferred APIs based on prompt:', apisToUse);
      }
      
      const selectedAPIDetails = mockAPIs.filter(api => apisToUse.includes(api.id));
      
      // Augment the prompt with API information and design requirements
      let augmentedPrompt = userPrompt;
      
      if (selectedAPIDetails.length > 0) {
        const apiContext = selectedAPIDetails.map(api => 
          `- ${api.name} (${api.link}): ${api.description}. Auth: ${api.auth}, HTTPS: ${api.https}, CORS: ${api.cors}`
        ).join('\n');
        
        const apiSelectionNote = selectedAPIs.length === 0 
          ? '\nNOTE: Based on your prompt, these relevant APIs were automatically selected:'
          : '\nIMPORTANT: Use the following selected APIs in your implementation:';
        
        augmentedPrompt = `${userPrompt}${apiSelectionNote}
${apiContext}

Make sure to integrate these APIs into the generated component to fetch and display relevant data.`;
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
- Ensure accessibility with ARIA labels and semantic HTML`;

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

      const fullPrompt = `You are a React component generator. Generate a complete React functional component in PLAIN JAVASCRIPT using React.createElement() calls ONLY.

${conversationContext}${currentCodeContext}

CRITICAL REQUIREMENTS:
- Use React hooks (useState, useEffect) as needed
- Return your response in this EXACT format:

DESCRIPTION: [Write a brief, conversational description of what you built, what features it includes, and any APIs you integrated. This should sound natural as if you're explaining to the user what you just created.]

CODE:
[Insert the complete GeneratedApp function here]

- The component MUST be named "GeneratedApp"
- Create visually impressive applications with rich interactions and beautiful designs

EXAMPLE FORMAT (FOLLOW THIS EXACT STRUCTURE):
DESCRIPTION: I created a beautiful weather dashboard that fetches real-time weather data using the OpenWeather API. The app features a gradient background, animated weather icons, and displays current conditions with a 5-day forecast. I added smooth hover effects and loading animations for a great user experience.

CODE:
function GeneratedApp() {
  const [count, setCount] = useState(0);
  
  return React.createElement('div', { className: 'p-8 min-h-screen bg-gradient-to-br from-blue-50 to-green-50' },
    React.createElement(Card, { className: 'max-w-2xl mx-auto shadow-xl' },
      React.createElement(CardHeader, { className: 'text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg' },
        React.createElement(CardTitle, { className: 'text-2xl font-bold' }, 'My Beautiful App')
      ),
      React.createElement(CardContent, { className: 'p-8 space-y-6' },
        React.createElement('div', { className: 'text-center' },
          React.createElement('p', { className: 'text-xl font-semibold text-gray-700 mb-4' }, 'Count: ' + count),
          React.createElement(Button, { 
            onClick: () => setCount(count + 1),
            className: 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200'
          }, 'Increment')
        )
      )
    )
  );
}

${conversationContext ? 'Based on the conversation history above, ' : ''}User prompt: ${augmentedPrompt}

REMEMBER: Return ONLY in the DESCRIPTION/CODE format shown above. The description should be conversational and explain what you built.`;

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
            maxOutputTokens: 8000, // Increased from 2000 to 8000
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const rawResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Parse the AI response to extract description and code
      const { description, code } = parseAIResponse(rawResponse);
      
      setGeneratedCode(code);
      
      // Add AI response to conversation history using the extracted description
      addToConversationHistory('ai', description);
      
      // Mark the Design-to-Code Generation module as complete
      if (onModuleComplete) {
        onModuleComplete('/design-to-code');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      // Use the actual APIs (selected or inferred) for fallback code
      const { mockAPIs } = await import('@/data/mockAPIs');
      const apisToUse = selectedAPIs.length > 0 ? selectedAPIs : analyzePromptForAPIs(userPrompt, mockAPIs);
      const fallbackCode = generateSampleCode(userPrompt, apisToUse, selectedComponents, error.message);
      setGeneratedCode(fallbackCode);
      
      // Add AI response to conversation history for fallback
      addToConversationHistory('ai', `I encountered an API error: ${error.message}. I've generated a fallback React component instead that demonstrates the basic structure of what you requested.`);
      
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
