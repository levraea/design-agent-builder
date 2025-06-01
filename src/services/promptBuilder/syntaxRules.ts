
export const CRITICAL_SYNTAX_RULES = `
CRITICAL SYNTAX RULES - FOLLOW THESE EXACTLY:
1. NEVER use template literals (backticks \`). ALWAYS use string concatenation with + operator
2. NEVER use arrow functions in object methods - use regular function syntax
3. ALWAYS use double quotes for strings, not single quotes when possible
4. ALWAYS end statements with semicolons
5. NEVER use optional chaining (?.) - use explicit checks instead
6. AVOID destructuring in function parameters - use explicit property access

EXAMPLES OF CORRECT SYNTAX:
✅ const url = "https://api.example.com/data?param=" + encodeURIComponent(value);
❌ const url = \`https://api.example.com/data?param=\${value}\`;

✅ const handleClick = function() { console.log("clicked"); };
❌ const handleClick = () => { console.log("clicked"); };

✅ if (data && data.results) { ... }
❌ if (data?.results) { ... }
`;

export const API_USAGE_EXAMPLES = `
API CALLS - DIRECT FETCH ONLY:
IMPORTANT: Use the enhancedFetch function for direct API calls only:

\`\`\`javascript
// Use enhancedFetch for direct API calls - it makes direct requests to APIs
// CRITICAL: Use string concatenation with + operator, NOT template literals
const apiUrl = "https://api.example.com/endpoint?param=" + encodeURIComponent(value);
const response = await enhancedFetch(apiUrl);
const data = await response.json();
\`\`\`

This enhancedFetch function:
- Makes direct API calls to the target URL
- Only works with APIs that support CORS or are publicly accessible
- Provides error handling for failed requests
- No proxy services are used

ALWAYS use enhancedFetch for external API calls instead of regular fetch.
CRITICAL: Use string concatenation with + operator instead of template literals for URLs.
`;

export const ROBUST_API_HANDLING = `
ROBUST API RESPONSE HANDLING:
When processing API responses, use this robust handling logic to accommodate different response structures:

\`\`\`javascript
// After fetching data from API
const response = await enhancedFetch("api-url");
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
  throw new Error("Unexpected API response format: no usable array found.");
}

// Now use apiData which is guaranteed to be an array
\`\`\`

This ensures your code works with various API response formats without breaking.
`;
