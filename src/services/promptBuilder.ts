import { Persona } from '@/types/persona';

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

  // Build dynamic API fetch code based on selected APIs
  let apiCodeExample = '';
  if (selectedAPIDetails.length > 0) {
    apiCodeExample = `
API CALLS - STANDARD FETCH WITH DEBUGGING AND ARRAY CHECKING:
Use the standard fetch function for API calls with comprehensive error handling, debugging, and proper array extraction for the following selected APIs:

${selectedAPIDetails.map(api => `- ${api.name} (${api.link}): ${api.description}`).join('\n')}

\`\`\`javascript
const fetchData = async () => {
  setLoading(true);
  setError(null);
  console.log('Starting API calls...');
  
  try {
${selectedAPIDetails.map((api, index) => {
  const variableName = api.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `    // ${api.name}
    console.log('Fetching ${variableName} data...');
    const ${variableName}Response = await fetch('${api.link}');
    console.log('${api.name} response status:', ${variableName}Response.status);
    
    if (!${variableName}Response.ok) {
      throw new Error(\`${api.name} API failed: \${${variableName}Response.status}\`);
    }
    
    const ${variableName}RawData = await ${variableName}Response.json();
    console.log('${api.name} raw response:', ${variableName}RawData);
    console.log('${api.name} response type:', typeof ${variableName}RawData);
    
    // Check for common array patterns
    let ${variableName}Data;
    
    // If it's already an array (like from restcountries.com), use it directly
    if (Array.isArray(${variableName}RawData)) {
      ${variableName}Data = ${variableName}RawData;
    } else if (Array.isArray(${variableName}RawData.data)) {
      ${variableName}Data = ${variableName}RawData.data;
    } else if (Array.isArray(${variableName}RawData.results)) {
      ${variableName}Data = ${variableName}RawData.results;
    } else if (Array.isArray(${variableName}RawData.items)) {
      ${variableName}Data = ${variableName}RawData.items;
    } else if (${variableName}RawData.response && Array.isArray(${variableName}RawData.response.data)) {
      ${variableName}Data = ${variableName}RawData.response.data;
    } else {
      throw new Error('Unexpected API response format: no usable array found.');
    }
    
    console.log('${api.name} final data:', ${variableName}Data);
    console.log('${api.name} data type:', typeof ${variableName}Data);
    console.log('${api.name} data length:', Array.isArray(${variableName}Data) ? ${variableName}Data.length : 'Not an array');
    set${variableName.charAt(0).toUpperCase() + variableName.slice(1)}Data(${variableName}Data);`;
}).join('\n\n')}

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

IMPORTANT: 
- ALWAYS check for common array patterns: direct array, data, results, items, response.data
- Add extensive console logging to track the data extraction process
- Log both raw and processed data structures
- Handle different API response formats gracefully
- Throw error if no usable array is found

This is a CRITICAL and STANDARD practice for API integration - most production APIs wrap their data in containers for metadata, pagination, and error handling consistency.`;
  } else {
    apiCodeExample = `
API CALLS - STANDARD FETCH WITH DEBUGGING:
If you need to make API calls, use the standard fetch function with comprehensive error handling and debugging:

\`\`\`javascript
const fetchData = async () => {
  setLoading(true);
  setError(null);
  console.log('Starting API call...');
  
  try {
    const response = await fetch('YOUR_API_ENDPOINT_HERE');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(\`API failed: \${response.status}\`);
    }
    
    const rawData = await response.json();
    console.log('Raw response:', rawData);
    
    // Check for common array patterns
    let data;
    
    // If it's already an array, use it directly
    if (Array.isArray(rawData)) {
      data = rawData;
    } else if (Array.isArray(rawData.data)) {
      data = rawData.data;
    } else if (Array.isArray(rawData.results)) {
      data = rawData.results;
    } else if (Array.isArray(rawData.items)) {
      data = rawData.items;
    } else if (rawData.response && Array.isArray(rawData.response.data)) {
      data = rawData.response.data;
    } else {
      throw new Error('Unexpected API response format: no usable array found.');
    }
    
    console.log('Final data:', data);
    setData(data);
    setLoading(false);
  } catch (err) {
    console.error('API fetch error:', err);
    setError(err);
    setLoading(false);
  }
};
\`\`\``;
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

${apiCodeExample}

ALWAYS use standard fetch for external API calls and include comprehensive debugging with data container checking.

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
