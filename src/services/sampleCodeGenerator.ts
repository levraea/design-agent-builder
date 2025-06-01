
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
      <div className="mb-6 bg-white rounded-lg shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-lg">
          <h1 className="text-xl font-bold">Generated Application (Fallback)</h1>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            ${errorMessage ? `<div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <h4 className="text-red-800 font-medium mb-2">API Generation Failed</h4>
              <p className="text-red-600 text-sm">${errorMessage}</p>
              <p className="text-red-600 text-sm mt-2">Showing fallback component instead.</p>
            </div>` : ''}
            <input className="w-full p-2 border rounded" placeholder="Enter your input..." />
            <button 
              onClick={fetchData} 
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
            {data.length > 0 && (
              <div className="grid gap-4">
                {data.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4">
                    <p>Data item {index + 1}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}`;
};
