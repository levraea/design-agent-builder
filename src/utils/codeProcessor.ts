
export const cleanCode = (code: string): string => {
  let cleanedCode = code;
  
  // Remove markdown if present
  if (cleanedCode.includes('```')) {
    cleanedCode = cleanedCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
  }

  // Remove all types of import statements
  cleanedCode = cleanedCode.replace(/import\s+.*?from\s+['"][^'"]+['"];?\s*/g, '');
  cleanedCode = cleanedCode.replace(/import\s+['"][^'"]+['"];?\s*/g, '');
  cleanedCode = cleanedCode.replace(/import\s*\{[^}]*\}\s*from\s+['"][^'"]+['"];?\s*/g, '');
  cleanedCode = cleanedCode.replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '');

  return cleanedCode;
};
