
export const generatePropTypesLoader = (): string => {
  return `
        async function loadPropTypes() {
          if (window.PropTypes) {
            console.log('✅ PropTypes already available');
            return true;
          }
          
          console.log('📦 Loading PropTypes for Recharts...');
          try {
            const propTypesResponse = await fetch('https://unpkg.com/prop-types@15.8.1/prop-types.min.js');
            if (propTypesResponse.ok) {
              const propTypesScript = await propTypesResponse.text();
              const script = document.createElement('script');
              script.textContent = propTypesScript;
              document.head.appendChild(script);
              await new Promise(resolve => setTimeout(resolve, 100));
              console.log('✅ PropTypes loaded');
              return true;
            }
            throw new Error('Failed to load PropTypes');
          } catch (error) {
            console.warn('⚠️ PropTypes loading failed, providing fallback');
            // Provide minimal PropTypes fallback
            window.PropTypes = {
              oneOfType: () => null,
              string: null,
              number: null,
              bool: null,
              func: null,
              object: null,
              array: null,
              node: null,
              element: null,
              instanceOf: () => null,
              oneOf: () => null,
              arrayOf: () => null,
              objectOf: () => null,
              shape: () => null,
              any: null
            };
            return false;
          }
        }`;
};
