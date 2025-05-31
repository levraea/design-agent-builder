
import { generatePropTypesLoader } from './propTypesLoader';
import { generateRechartsCdnLoader } from './rechartsCdnLoader';
import { generateRechartsComponentExposer } from './rechartsComponentExposer';
import { generateRechartsFallbacks } from './rechartsFallbacks';

export const generateRechartsLoader = (): string => {
  return `
        ${generatePropTypesLoader()}
        
        ${generateRechartsCdnLoader()}
        
        ${generateRechartsComponentExposer()}
        
        ${generateRechartsFallbacks()}

        async function loadRecharts() {
          console.log('🔄 Starting Recharts loading process...');
          
          try {
            // First load PropTypes
            await loadPropTypes();
            
            // Then try to load Recharts from CDN
            const rechartsLoaded = await loadRechartsFromCdn();
            
            if (rechartsLoaded && window.Recharts) {
              console.log('✅ Recharts loaded successfully');
              exposeRechartsComponents(window.Recharts);
              return true;
            } else {
              throw new Error('Recharts object not found after script execution');
            }
            
          } catch (error) {
            console.error('❌ Recharts loading failed completely:', error);
            console.log('🔄 Providing fallback chart components...');
            createRechartsFallbacks();
            return false;
          }
        }`;
};

// Re-export the fallbacks function for backward compatibility
export { generateRechartsFallbacks };
