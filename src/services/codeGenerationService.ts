
export const generateSampleCode = (prompt: string, apis: string[], components: string[], errorMessage?: string) => {
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

export const buildPrompt = (
  userPrompt: string,
  selectedAPIDetails: any[],
  selectedAPIs: string[],
  conversationHistory: any[],
  generatedCode: string,
  augmentedPrompt: string
): string => {
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

  return `You are a React component generator. Generate a complete React functional component in PLAIN JAVASCRIPT using React.createElement() calls ONLY.

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
};
