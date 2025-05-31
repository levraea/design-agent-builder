
export const generateRechartsCdnLoader = (): string => {
  return `
        async function loadRechartsFromCdn() {
          console.log('📦 Attempting to load Recharts from CDN...');
          
          try {
            const response = await fetch('https://cdn.jsdelivr.net/npm/recharts@2.8.0/umd/Recharts.min.js');
            
            if (!response.ok) {
              throw new Error(\`Failed to fetch Recharts: \${response.status} \${response.statusText}\`);
            }
            
            const scriptText = await response.text();
            console.log('📜 Recharts script loaded, size:', scriptText.length, 'bytes');
            
            // Execute the script in global scope
            const script = document.createElement('script');
            script.textContent = scriptText;
            document.head.appendChild(script);
            
            // Wait for script execution
            await new Promise(resolve => setTimeout(resolve, 500));
            
            console.log('🔍 Checking if Recharts is available...');
            console.log('window.Recharts:', typeof window.Recharts);
            
            return window.Recharts && typeof window.Recharts === 'object';
            
          } catch (error) {
            console.error('❌ Recharts CDN loading failed:', error);
            return false;
          }
        }`;
};
