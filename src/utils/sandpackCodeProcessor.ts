
export const processCodeForSandpack = (code: string): string => {
  // Remove markdown code blocks if present
  let cleanedCode = code.trim();
  
  // Remove ```javascript or ```jsx or ``` at the beginning
  cleanedCode = cleanedCode.replace(/^```(?:javascript|jsx|js)?\s*\n?/i, '');
  
  // Remove ``` at the end
  cleanedCode = cleanedCode.replace(/\n?```\s*$/i, '');
  
  // Check if we have a valid GeneratedApp function
  const hasGeneratedApp = cleanedCode.includes('function GeneratedApp');
  
  if (!hasGeneratedApp) {
    return `function GeneratedApp() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h4 className="text-red-800 font-medium mb-2">Invalid Code Format</h4>
        <p className="text-red-600 text-sm">The generated code doesn't contain a valid GeneratedApp function.</p>
      </div>
    </div>
  );
}`;
  }

  // Process template literals to avoid execution issues in Sandpack
  const processedCode = cleanedCode.replace(/`([^`]*\$\{[^}]*\}[^`]*)`/g, (match, content) => {
    // Convert template literals with variables to string concatenation
    return '"' + content.replace(/\$\{([^}]+)\}/g, '" + ($1) + "') + '"';
  });

  return processedCode;
};
