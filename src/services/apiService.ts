
import { API } from '@/types/api';
import { mockAPIs } from '@/data/mockAPIs';
import { getCategoryIcon } from '@/utils/categoryIcons';

export const fetchAPIs = async (): Promise<{ apis: API[]; error: string | null }> => {
  try {
    console.log('Attempting to fetch APIs from public registry...');
    
    // Try using a CORS proxy first
    const corsProxy = 'https://api.allorigins.win/get?url=';
    const apiUrl = encodeURIComponent('https://api.publicapis.org/entries');
    const response = await fetch(`${corsProxy}${apiUrl}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from CORS proxy');
    }
    
    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents);
    
    console.log('Successfully fetched API data:', data);
    
    // Transform the data to match our interface
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
  } catch (err) {
    console.error('Error fetching APIs, falling back to mock data:', err);
    return { apis: mockAPIs, error: 'Using sample APIs (live registry unavailable)' };
  }
};
