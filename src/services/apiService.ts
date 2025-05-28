
import { API } from '@/types/api';
import { mockAPIs } from '@/data/mockAPIs';
import { getCategoryIcon } from '@/utils/categoryIcons';

export const fetchAPIs = async (): Promise<{ apis: API[]; error: string | null }> => {
  try {
    console.log('Attempting to fetch APIs from public registry...');
    
    // Try direct fetch first (might work in some environments)
    try {
      console.log('Trying direct fetch...');
      const directResponse = await fetch('https://api.publicapis.org/entries');
      if (directResponse.ok) {
        const directData = await directResponse.json();
        console.log('Direct fetch successful:', directData);
        return transformAPIData(directData);
      }
    } catch (directError) {
      console.log('Direct fetch failed, trying CORS proxies...');
    }

    // Try different CORS proxy services
    const corsProxies = [
      'https://corsproxy.io/?',
      'https://cors-anywhere.herokuapp.com/',
      'https://api.codetabs.com/v1/proxy?quest='
    ];

    for (const proxy of corsProxies) {
      try {
        console.log(`Trying CORS proxy: ${proxy}`);
        const apiUrl = 'https://api.publicapis.org/entries';
        const response = await fetch(`${proxy}${encodeURIComponent(apiUrl)}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Successfully fetched API data via proxy:', data);
          return transformAPIData(data);
        }
      } catch (proxyError) {
        console.log(`CORS proxy ${proxy} failed:`, proxyError);
        continue;
      }
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
