
export const SANDPACK_REQUIREMENTS = `
CRITICAL SANDPACK COMPATIBILITY REQUIREMENTS:
- Use ONLY standard React and available libraries (recharts, lucide-react)
- DO NOT use any UI libraries like @material-tailwind/react, @radix-ui, shadcn/ui, or Material-UI
- Use ONLY basic HTML elements (div, button, input, select, etc.) with Tailwind CSS classes
- Use React hooks (useState, useEffect) as needed
- Use JSX syntax (NOT React.createElement calls)
- Use modern ES6 imports for Recharts: import { BarChart, LineChart, XAxis, YAxis, etc. } from 'recharts'
`;

export const AVAILABLE_COMPONENTS = `
AVAILABLE COMPONENTS (use these instead of external UI libraries):
- Standard HTML elements: div, button, input, select, option, form, etc.
- Style with Tailwind CSS classes
- For cards: use <div className="bg-white rounded-lg shadow-lg p-6">
- For buttons: use <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
- For inputs: use <input className="w-full p-2 border rounded">
`;

export const RECHARTS_USAGE = `
RECHARTS USAGE:
Recharts components are already imported and available for use:

\`\`\`javascript
// These are already imported for you:
// ResponsiveContainer, LineChart, BarChart, PieChart, AreaChart
// XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, Area, Cell

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
`;

export const EXAMPLE_FORMAT = `
EXAMPLE FORMAT (FOLLOW THIS EXACT STRUCTURE):
DESCRIPTION: I created a beautiful weather dashboard that fetches real-time weather data using the OpenWeather API. The app features a gradient background, animated weather icons, and displays current conditions with a 5-day forecast. I added smooth hover effects and loading animations for a great user experience.

CODE:
function GeneratedApp() {
  const [count, setCount] = useState(0);
  
  const handleIncrement = function() {
    setCount(count + 1);
  };
  
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
              onClick={handleIncrement}
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
`;

export const RETURN_FORMAT_INSTRUCTIONS = `
CRITICAL RETURN FORMAT - FOLLOW EXACTLY:
DESCRIPTION: [Write a brief, conversational description of what you built]

CODE:
[Insert ONLY the GeneratedApp function here - NO IMPORTS, NO MARKDOWN BLOCKS, NO EXPORT STATEMENTS]

REQUIREMENTS:
- The component MUST be named "GeneratedApp"
- DO NOT include any import statements (they are already provided)
- DO NOT include markdown code blocks (\`\`\`javascript or \`\`\`)
- DO NOT include export statements
- Return ONLY the function definition starting with "function GeneratedApp()"
- React, useState, useEffect, and all Recharts components are already imported
- enhancedFetch is already available as a global function
`;
