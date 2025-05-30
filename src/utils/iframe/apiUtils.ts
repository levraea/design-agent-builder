
export const generateApiUtilities = (): string => {
  return `
        // Simplified fetch function - direct API calls only
        window.enhancedFetch = async (targetUrl, options = {}) => {
          console.log('🌐 Making direct API call to:', targetUrl);
          
          try {
            const response = await fetch(targetUrl, {
              ...options,
              headers: {
                ...options.headers,
                'Accept': 'application/json'
              }
            });
            
            console.log('📊 Response status:', response.status);
            
            if (response.ok) {
              console.log('✅ Direct fetch successful!');
              return response;
            } else {
              throw new Error('API request failed with status: ' + response.status);
            }
          } catch (error) {
            console.error('❌ API request failed:', error.message);
            throw error;
          }
        };`;
};
