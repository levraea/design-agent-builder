
import { API } from '@/types/api';
import { mockAPIs } from '@/data/mockAPIs';

export const fetchAPIs = async (): Promise<{ apis: API[]; error: string | null }> => {
  try {
    console.log('Loading mock APIs...');
    
    // Simply return the mock APIs
    console.log('Mock APIs loaded successfully:', mockAPIs.length);
    return { apis: mockAPIs, error: null };
    
  } catch (err) {
    console.error('Error loading mock APIs:', err);
    return { apis: [], error: 'Failed to load APIs' };
  }
};
