
export const processCodeForSandpack = (code: string): string => {
  // Clean the code to extract just the component function
  const cleanedCode = code.includes('function GeneratedApp') 
    ? code 
    : `function GeneratedApp() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h4 className="text-red-800 font-medium mb-2">Invalid Code Format</h4>
        <p className="text-red-600 text-sm">The generated code doesn't contain a valid GeneratedApp function.</p>
      </div>
    </div>
  );
}`;

  // Process the code to fix template literal issues
  const processedCode = cleanedCode
    .replace(/`([^`]*\$\{[^}]*\}[^`]*)`/g, (match, content) => {
      // Convert template literals to regular string concatenation for safer execution
      return content.replace(/\$\{([^}]+)\}/g, '" + ($1) + "');
    });

  return processedCode;
};
