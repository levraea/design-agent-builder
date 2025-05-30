
import { Persona } from '@/types/persona';

// CORS proxy helper function - now uses enhanced fetch with multiple fallbacks
const wrapWithCORSProxy = (url: string): string => {
  // The iframe now has enhancedFetch function that handles multiple proxies
  return url; // Return the original URL since enhancedFetch handles the proxy logic
};

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
      // Use properly formatted OpenFDA API URL without problematic quote encoding
      const response = await enhancedFetch('https://api.fda.gov/drug/label.json?search=openfda.generic_name:acetaminophen&limit=5');
      const result = await response.json();
      setData(result.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to sample data if API fails
      setData([
        { id: 1, name: 'Sample Drug 1', description: 'Sample description' },
        { id: 2, name: 'Sample Drug 2', description: 'Another sample' }
      ]);
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

ENHANCED CORS HANDLING FOR API CALLS:
IMPORTANT: Use the new enhanced fetch function that automatically handles multiple CORS proxies:

\`\`\`javascript
// Use enhancedFetch instead of regular fetch - it handles CORS automatically with fallbacks
const response = await enhancedFetch('https://api.example.com/endpoint');
const data = await response.json();
\`\`\`

This new enhancedFetch function:
- Tries direct fetch first (for APIs that support CORS)
- Falls back to multiple reliable CORS proxies automatically
- Provides better error handling and retry logic
- No need to manually wrap URLs with proxy services

ALWAYS use enhancedFetch for external API calls instead of regular fetch.

CRITICAL API URL FORMATTING:
When using OpenFDA API, use proper URL format WITHOUT URL-encoded quotes:
- CORRECT: "https://api.fda.gov/drug/label.json?search=openfda.generic_name:acetaminophen&limit=5"
- INCORRECT: "https://api.fda.gov/drug/label.json?search=openfda.generic_name:%22Acetam%22&limit=1"

For search terms with spaces, use + instead of %20:
- CORRECT: "search=openfda.generic_name:drug+name"
- Use simple search terms without quotes or complex encoding

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

REMEMBER: Return ONLY in the DESCRIPTION/CODE format shown above. The description should be conversational and explain what you built. USE JSX SYNTAX, NOT React.createElement(). ALWAYS use enhancedFetch for external API calls. Fix OpenFDA API URLs by removing URL-encoded quotes and using simple search terms.${persona ? ` Make sure the design is tailored for ${persona.name}'s needs and preferences.` : ''}`;
};
