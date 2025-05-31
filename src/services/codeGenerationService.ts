
import { Persona } from '@/types/persona';

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
      // Use standard fetch for API calls
      const response = await fetch('https://api.example.com/sample-endpoint');
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
          <CardTitle>Generated Application (Fallback)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            ${errorMessage ? `<div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <h4 className="text-red-800 font-medium mb-2">API Generation Failed</h4>
              <p className="text-red-600 text-sm">${errorMessage}</p>
              <p className="text-red-600 text-sm mt-2">Showing fallback component instead.</p>
            </div>` : ''}
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
}`;
};

export const buildPrompt = (
  userPrompt: string,
  selectedAPIDetails: any[],
  selectedAPIs: string[],
  conversationHistory: any[],
  generatedCode: string,
  augmentedPrompt: string,
  persona?: Persona | null
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

  // Add persona-specific instructions
  let personaContext = '';
  if (persona) {
    personaContext = `
PERSONA-CENTERED DESIGN:
You are designing for ${persona.name}: ${persona.purpose}

Key Persona Insights:
- Role: ${persona.role}
- Tech Comfort: ${persona.techComfort}
- Goals: ${persona.goals}
- Challenges: ${persona.challenges}
- Motivation: ${persona.motivation}

DESIGN FOR THIS PERSONA:
- Match the UI complexity to their tech comfort level
- Structure the interface to support their primary goals
- Minimize friction around their main challenges
- Use interaction patterns that align with their motivation style
- Choose appropriate information density and visual hierarchy

`;
  }

  return `You are a React component generator. Generate a complete React functional component using JSX syntax.

${personaContext}${conversationContext}${currentCodeContext}

CRITICAL REQUIREMENTS:
- Use React hooks (useState, useEffect) as needed
- Use JSX syntax (NOT React.createElement calls)
- Return your response in this EXACT format:

DESCRIPTION: [Write a brief, conversational description of what you built, what features it includes, and any APIs you integrated. This should sound natural as if you're explaining to the user what you just created.]

CODE:
[Insert the complete GeneratedApp function here using JSX]

- The component MUST be named "GeneratedApp"
- Create visually impressive applications with rich interactions and beautiful designs
- Use JSX syntax for all React elements

API CALLS - STANDARD FETCH WITH DEBUGGING:
Use the standard fetch function for API calls with comprehensive error handling and debugging:

\`\`\`javascript
const fetchData = async () => {
  setLoading(true);
  setError(null);
  console.log('Starting API calls...');
  
  try {
    // Agriculture API
    console.log('Fetching agriculture data...');
    const agricultureResponse = await fetch('https://ft9rfwu9wi.execute-api.us-east-2.amazonaws.com/agriculture');
    console.log('Agriculture response status:', agricultureResponse.status);
    
    if (!agricultureResponse.ok) {
      throw new Error(\`Agriculture API failed: \${agricultureResponse.status}\`);
    }
    
    const agricultureData = await agricultureResponse.json();
    console.log('Agriculture data received:', agricultureData);
    console.log('Agriculture data type:', typeof agricultureData);
    console.log('Agriculture data length:', Array.isArray(agricultureData) ? agricultureData.length : 'Not an array');
    setAgricultureData(agricultureData);

    // Health API
    console.log('Fetching health data...');
    const healthResponse = await fetch('https://yem7yxwgge.execute-api.us-east-2.amazonaws.com/health');
    console.log('Health response status:', healthResponse.status);
    
    if (!healthResponse.ok) {
      throw new Error(\`Health API failed: \${healthResponse.status}\`);
    }
    
    const healthData = await healthResponse.json();
    console.log('Health data received:', healthData);
    console.log('Health data type:', typeof healthData);
    console.log('Health data length:', Array.isArray(healthData) ? healthData.length : 'Not an array');
    setHealthData(healthData);

    // Nutrition API
    console.log('Fetching nutrition data...');
    const nutritionResponse = await fetch('https://0ih68gj8ei.execute-api.us-east-2.amazonaws.com/nutrition');
    console.log('Nutrition response status:', nutritionResponse.status);
    
    if (!nutritionResponse.ok) {
      throw new Error(\`Nutrition API failed: \${nutritionResponse.status}\`);
    }
    
    const nutritionData = await nutritionResponse.json();
    console.log('Nutrition data received:', nutritionData);
    console.log('Nutrition data type:', typeof nutritionData);
    console.log('Nutrition data length:', Array.isArray(nutritionData) ? nutritionData.length : 'Not an array');
    setNutritionData(nutritionData);

    console.log('All API calls completed successfully');
    setLoading(false);
  } catch (err) {
    console.error('API fetch error:', err);
    console.error('Error details:', err.message);
    setError(err);
    setLoading(false);
  }
};
\`\`\`

IMPORTANT: Add extensive console logging to track:
- API response status codes
- Data structure and types received
- Whether data is arrays or objects
- Any errors during fetch or parsing

Also handle different data structures flexibly - the APIs might return objects instead of arrays.

ALWAYS use standard fetch for external API calls and include comprehensive debugging.

EXAMPLE FORMAT (FOLLOW THIS EXACT STRUCTURE):
DESCRIPTION: I created a beautiful weather dashboard that fetches real-time weather data using the OpenWeather API. The app features a gradient background, animated weather icons, and displays current conditions with a 5-day forecast. I added smooth hover effects and loading animations for a great user experience.

CODE:
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

REMEMBER: Return ONLY in the DESCRIPTION/CODE format shown above. The description should be conversational and explain what you built. USE JSX SYNTAX, NOT React.createElement(). ALWAYS use standard fetch for external API calls with comprehensive debugging.${persona ? ` Make sure the design is tailored for ${persona.name}'s needs and preferences.` : ''}`;
};
