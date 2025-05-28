

import { API } from '@/types/api';
import { mockAPIs } from '@/data/mockAPIs';
import { getCategoryIcon } from '@/utils/categoryIcons';

export const fetchAPIs = async (): Promise<{ apis: API[]; error: string | null }> => {
  try {
    console.log('Attempting to fetch APIs from public registry...');
    
    // List of CORS proxy services to try
    const corsProxies = [
      'https://corsproxy.io/?',
      'https://api.codetabs.com/v1/proxy/?quest=',
      'https://api.allorigins.win/get?url=',
      'https://proxy.cors.sh/',
      'https://cors-proxy.fringe.zone/',
      'https://cors.bridged.cc/',
    ];
    
    const apiUrl = 'https://api.publicapis.org/entries';
    
    // Try each CORS proxy
    for (const proxy of corsProxies) {
      try {
        console.log(`Trying CORS proxy: ${proxy}`);
        
        let proxyUrl;
        let response;
        
        if (proxy.includes('allorigins.win')) {
          // allorigins.win requires URL encoding
          proxyUrl = `${proxy}${encodeURIComponent(apiUrl)}`;
          response = await fetch(proxyUrl);
          
          if (response.ok) {
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);
            console.log('Successfully fetched API data via allorigins.win:', data);
            return transformAPIData(data);
          }
        } else {
          // Other proxies use direct URL appending
          proxyUrl = `${proxy}${apiUrl}`;
          response = await fetch(proxyUrl);
          
          if (response.ok) {
            const data = await response.json();
            console.log(`Successfully fetched API data via ${proxy}:`, data);
            return transformAPIData(data);
          }
        }
        
        console.log(`Proxy ${proxy} failed with status:`, response.status);
      } catch (proxyError) {
        console.log(`Proxy ${proxy} failed:`, proxyError);
      }
    }

    // If all proxies fail, try direct fetch as last resort
    try {
      console.log('Trying direct fetch as final fallback...');
      const directResponse = await fetch(apiUrl);
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
