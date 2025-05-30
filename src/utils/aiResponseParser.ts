
export const parseAIResponse = (response: string): { description: string; code: string } => {
  // Look for DESCRIPTION: and CODE: markers
  const descriptionMatch = response.match(/DESCRIPTION:\s*(.*?)(?=\n\s*CODE:|\n\s*```|$)/s);
  const codeMatch = response.match(/CODE:\s*(.*?)$/s) || response.match(/```(?:javascript|js)?\s*(.*?)```/s);
  
  if (descriptionMatch && codeMatch) {
    return {
      description: descriptionMatch[1].trim(),
      code: codeMatch[1].trim()
    };
  }
  
  // Fallback: if structured format not found, try to extract function
  const functionMatch = response.match(/(function GeneratedApp\(\)[^]*)/);
  if (functionMatch) {
    return {
      description: "Generated a React component based on your request.",
      code: functionMatch[1].trim()
    };
  }
  
  // Last resort: treat entire response as code
  return {
    description: "Generated a React component based on your request.",
    code: response.trim()
  };
};
