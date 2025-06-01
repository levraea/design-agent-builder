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
      // Use enhancedFetch for direct API calls (no CORS proxy)
      const response = await enhancedFetch('https://api.example.com/sample-endpoint');
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

  return `You are a React component generator. Generate a complete React functional component using JSX syntax that works directly with Sandpack (CodeSandbox) environment.

${personaContext}${conversationContext}${currentCodeContext}

CRITICAL SANDPACK COMPATIBILITY REQUIREMENTS:
- Use ONLY standard React and available libraries (recharts, lucide-react)
- DO NOT use any UI libraries like @material-tailwind/react, @radix-ui, shadcn/ui, or Material-UI
- Use ONLY basic HTML elements (div, button, input, select, etc.) with Tailwind CSS classes
- Use React hooks (useState, useEffect) as needed
- Use JSX syntax (NOT React.createElement calls)
- Use modern ES6 imports for Recharts: import { BarChart, LineChart, XAxis, YAxis, etc. } from 'recharts'

AVAILABLE COMPONENTS (use these instead of external UI libraries):
- Standard HTML elements: div, button, input, select, option, form, etc.
- Style with Tailwind CSS classes
- For cards: use <div className="bg-white rounded-lg shadow-lg p-6">
- For buttons: use <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
- For inputs: use <input className="w-full p-2 border rounded">

RETURN FORMAT:
DESCRIPTION: [Write a brief, conversational description of what you built, what features it includes, and any APIs you integrated. This should sound natural as if you're explaining to the user what you just created.]

CODE:
[Insert the complete GeneratedApp function here using JSX]

- The component MUST be named "GeneratedApp"
- Create visually impressive applications with rich interactions and beautiful designs
- Use JSX syntax for all React elements
- Use modern ES6 imports instead of global variables
- NO external UI component libraries - use only HTML elements with Tailwind

RECHARTS USAGE:
Use proper ES6 imports for Recharts components:

\`\`\`javascript
// Recharts components are available via imports
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line } from 'recharts';

// Use them directly in JSX
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
</ResponsiveContainer>
\`\`\`

API CALLS - DIRECT FETCH ONLY:
IMPORTANT: Use the enhancedFetch function for direct API calls only:

\`\`\`javascript
// Use enhancedFetch for direct API calls - it makes direct requests to APIs
const response = await enhancedFetch('https://api.example.com/endpoint');
const data = await response.json();
\`\`\`

This enhancedFetch function:
- Makes direct API calls to the target URL
- Only works with APIs that support CORS or are publicly accessible
- Provides error handling for failed requests
- No proxy services are used

ALWAYS use enhancedFetch for external API calls instead of regular fetch.

ROBUST API RESPONSE HANDLING:
When processing API responses, use this robust handling logic to accommodate different response structures:

\`\`\`javascript
// After fetching data from API
const response = await enhancedFetch('api-url');
const apiRawData = await response.json();

// Robust handling for different API response formats
let apiData;
if (Array.isArray(apiRawData)) {
  apiData = apiRawData;
} else if (Array.isArray(apiRawData.data)) {
  apiData = apiRawData.data;
} else if (Array.isArray(apiRawData.results)) {
  apiData = apiRawData.results;
} else if (Array.isArray(apiRawData.items)) {
  apiData = apiRawData.items;
} else if (apiRawData.response && Array.isArray(apiRawData.response.data)) {
  apiData = apiRawData.response.data;
} else {
  throw new Error('Unexpected API response format: no usable array found.');
}

// Now use apiData which is guaranteed to be an array
\`\`\`

This ensures your code works with various API response formats without breaking.

EXAMPLE FORMAT (FOLLOW THIS EXACT STRUCTURE):
DESCRIPTION: I created a beautiful weather dashboard that fetches real-time weather data using the OpenWeather API. The app features a gradient background, animated weather icons, and displays current conditions with a 5-day forecast. I added smooth hover effects and loading animations for a great user experience.

CODE:
function GeneratedApp() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 text-center">
          <h1 className="text-2xl font-bold">My Beautiful App</h1>
        </div>
        <div className="p-8 space-y-6">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 mb-4">Count: {count}</p>
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Increment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

${conversationContext ? 'Based on the conversation history above, ' : ''}User prompt: ${augmentedPrompt}

REMEMBER: Return ONLY in the DESCRIPTION/CODE format shown above. The description should be conversational and explain what you built. USE JSX SYNTAX, NOT React.createElement(). ALWAYS use enhancedFetch for external API calls. NO EXTERNAL UI LIBRARIES - use only HTML elements with Tailwind CSS.${persona ? ` Make sure the design is tailored for ${persona.name}'s needs and preferences.` : ''}`;
};
