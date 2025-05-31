
export const generateApiUtilities = (): string => {
  return `
        // Simple logging for API calls - no global enhancedFetch
        console.log('API utilities loaded - using standard fetch for requests');`;
};
