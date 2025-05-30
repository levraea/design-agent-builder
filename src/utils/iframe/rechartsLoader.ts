export const generateRechartsLoader = (): string => {
  return `
        async function loadRecharts() {
          console.log('🔄 Starting Recharts loading process...');
          
          try {
            console.log('📦 Attempting to load Recharts UMD...');
            
            // Load Recharts from UMD build for better compatibility
            const response = await fetch('https://unpkg.com/recharts@2.12.7/umd/Recharts.js');
            
            if (!response.ok) {
              throw new Error(\`Failed to fetch Recharts UMD: \${response.status} \${response.statusText}\`);
            }
            
            const scriptText = await response.text();
            console.log('📜 Recharts script loaded, size:', scriptText.length, 'bytes');
            
            // Execute the script in global scope
            const script = document.createElement('script');
            script.textContent = scriptText;
            document.head.appendChild(script);
            
            // Wait a bit for the script to execute
            await new Promise(resolve => setTimeout(resolve, 200));
            
            console.log('🔍 Checking if Recharts is available...');
            console.log('window.Recharts:', typeof window.Recharts);
            console.log('Available keys:', window.Recharts ? Object.keys(window.Recharts).slice(0, 10) : 'N/A');
            
            // Check if Recharts is available
            if (window.Recharts && typeof window.Recharts === 'object') {
              console.log('✅ Recharts loaded successfully via UMD');
              
              // Make individual components available globally
              const recharts = window.Recharts;
              
              // List of components to expose
              const components = [
                'LineChart', 'AreaChart', 'BarChart', 'PieChart', 'ScatterChart', 'RadarChart',
                'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'Legend', 'ResponsiveContainer',
                'Line', 'Area', 'Bar', 'Cell', 'ReferenceLine', 'ReferenceArea', 'Brush'
              ];
              
              components.forEach(componentName => {
                if (recharts[componentName]) {
                  window[componentName] = recharts[componentName];
                  console.log(\`✓ \${componentName} available\`);
                } else {
                  console.warn(\`⚠️ \${componentName} not found in Recharts\`);
                }
              });
              
              return true;
            }
            
            throw new Error('Recharts object not found in window after UMD loading');
            
          } catch (error) {
            console.error('❌ UMD loading failed:', error.message);
            console.log('🔄 Trying alternative CDN...');
            
            // Try alternative CDN
            try {
              const altResponse = await fetch('https://cdn.jsdelivr.net/npm/recharts@2.12.7/umd/Recharts.min.js');
              
              if (!altResponse.ok) {
                throw new Error(\`Failed to fetch from alternate CDN: \${altResponse.status}\`);
              }
              
              const scriptText = await altResponse.text();
              console.log('📜 Alternative CDN script loaded, size:', scriptText.length, 'bytes');
              
              const script = document.createElement('script');
              script.textContent = scriptText;
              document.head.appendChild(script);
              
              await new Promise(resolve => setTimeout(resolve, 200));
              
              if (window.Recharts) {
                console.log('✅ Recharts loaded successfully via alternative CDN');
                
                // Make components available globally
                const recharts = window.Recharts;
                window.LineChart = recharts.LineChart;
                window.AreaChart = recharts.AreaChart;
                window.BarChart = recharts.BarChart;
                window.PieChart = recharts.PieChart;
                window.XAxis = recharts.XAxis;
                window.YAxis = recharts.YAxis;
                window.CartesianGrid = recharts.CartesianGrid;
                window.Tooltip = recharts.Tooltip;
                window.Legend = recharts.Legend;
                window.ResponsiveContainer = recharts.ResponsiveContainer;
                window.Line = recharts.Line;
                window.Bar = recharts.Bar;
                
                return true;
              }
              
              throw new Error('Recharts not found after alternative CDN load');
            } catch (altError) {
              console.error('❌ Alternative CDN also failed:', altError.message);
              
              // Try direct script tag approach
              try {
                console.log('🔄 Trying direct script tag approach...');
                
                return new Promise((resolve) => {
                  const script = document.createElement('script');
                  script.src = 'https://unpkg.com/recharts@2.12.7/umd/Recharts.min.js';
                  script.async = true;
                  
                  script.onload = () => {
                    console.log('✅ Recharts loaded via direct script tag');
                    
                    if (window.Recharts) {
                      const recharts = window.Recharts;
                      window.LineChart = recharts.LineChart;
                      window.AreaChart = recharts.AreaChart;
                      window.BarChart = recharts.BarChart;
                      window.PieChart = recharts.PieChart;
                      window.XAxis = recharts.XAxis;
                      window.YAxis = recharts.YAxis;
                      window.CartesianGrid = recharts.CartesianGrid;
                      window.Tooltip = recharts.Tooltip;
                      window.Legend = recharts.Legend;
                      window.ResponsiveContainer = recharts.ResponsiveContainer;
                      window.Line = recharts.Line;
                      window.Bar = recharts.Bar;
                      
                      resolve(true);
                    } else {
                      console.error('❌ Script loaded but Recharts not found in window');
                      resolve(false);
                    }
                  };
                  
                  script.onerror = () => {
                    console.error('❌ Script tag load failed');
                    resolve(false);
                  };
                  
                  document.head.appendChild(script);
                });
              } catch (scriptError) {
                console.error('❌ Script tag approach failed:', scriptError);
                return false;
              }
            }
          }
        }`;
};

export const generateRechartsFallbacks = (): string => {
  return `
            window.LineChart = ({ children, data, width = 400, height = 300, ...props }) => 
              React.createElement('div', { 
                className: 'w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500',
                style: { width: width || '100%', height: height || 300 }
              }, 'LineChart - Recharts not loaded');
            
            window.BarChart = ({ children, data, width = 400, height = 300, ...props }) => 
              React.createElement('div', { 
                className: 'w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500',
                style: { width: width || '100%', height: height || 300 }
              }, 'BarChart - Recharts not loaded');
            
            window.PieChart = ({ children, data, width = 400, height = 300, ...props }) => 
              React.createElement('div', { 
                className: 'w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500',
                style: { width: width || '100%', height: height || 300 }
              }, 'PieChart - Recharts not loaded');
            
            window.XAxis = () => null;
            window.YAxis = () => null;
            window.CartesianGrid = () => null;
            window.Tooltip = () => null;
            window.Legend = () => null;
            window.Line = () => null;
            window.Area = () => null;
            window.Bar = () => null;
            window.ResponsiveContainer = ({ children, width, height }) => 
              React.createElement('div', { 
                className: 'w-full h-full',
                style: { width: width || '100%', height: height || '100%' }
              }, children);`;
};
