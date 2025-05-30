
export const cleanCode = (code: string): string => {
  let cleanedCode = code;
  
  // Remove markdown if present
  if (cleanedCode.includes('```')) {
    cleanedCode = cleanedCode.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
  }

  // Remove any import statements from the code since we'll provide libraries globally
  cleanedCode = cleanedCode.replace(/import\s+.*?from\s+['"][^'"]+['"];?\s*/g, '');

  return cleanedCode;
};
