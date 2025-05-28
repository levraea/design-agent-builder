
import { API } from '@/types/api';
import { mockAPIs } from '@/data/mockAPIs';
import { getCategoryIcon } from '@/utils/categoryIcons';

export const fetchAPIs = async (): Promise<{ apis: API[]; error: string | null }> => {
  try {
    console.log('Attempting to fetch APIs from public registry...');
    
    // Try a working CORS proxy service
    try {
      console.log('Trying CORS proxy...');
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const apiUrl = encodeURIComponent('https://api.publicapis.org/entries');
      const response = await fetch(`${proxyUrl}${apiUrl}`);
      
      if (response.ok) {
        const proxyData = await response.json();
        // allorigins.win returns data in a 'contents' field as a string
        const data = JSON.parse(proxyData.contents);
        console.log('Successfully fetched API data via proxy:', data);
        return transformAPIData(data);
      }
    } catch (proxyError) {
      console.log('CORS proxy failed:', proxyError);
    }

    // If proxy fails, try direct fetch as last resort
    try {
      console.log('Trying direct fetch as fallback...');
      const directResponse = await fetch('https://api.publicapis.org/entries');
      if (directResponse.ok) {
        const directData = await directResponse.json();
        console.log('Direct fetch successful:', directData);
        return transformAPIData(directData);
      }
    } catch (directError) {
      console.log('Direct fetch failed:', directError);
    }

    throw new Error('All API fetch attempts failed');
    
  } catch (err) {
    console.error('Error fetching APIs, falling back to mock data:', err);
    return { apis: mockAPIs, error: 'Using sample APIs (live registry unavailable)' };
  }
};

const transformAPIData = (data: any): { apis: API[]; error: string | null } => {
  if (!data || !data.entries || !Array.isArray(data.entries)) {
    throw new Error('Invalid API response format');
  }

  const transformedAPIs: API[] = data.entries.slice(0, 50).map((api: any, index: number) => ({
    id: `${api.API.toLowerCase().replace(/\s+/g, '-')}-${index}`,
    name: api.API,
    description: api.Description,
    category: api.Category,
    version: 'v1.0.0',
    status: api.HTTPS ? 'active' : 'beta' as 'active' | 'deprecated' | 'beta',
    icon: getCategoryIcon(api.Category),
    link: api.Link,
    auth: api.Auth || 'None',
    https: api.HTTPS,
    cors: api.Cors || 'unknown'
  }));

  console.log('APIs loaded successfully:', transformedAPIs.length);
  return { apis: transformedAPIs, error: null };
};
