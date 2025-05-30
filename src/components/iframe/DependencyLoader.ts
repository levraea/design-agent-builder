
export class DependencyLoader {
  static createLoadScript(src: string): string {
    return `
      function loadScript(src) {
        return new Promise((resolve, reject) => {
          console.log('Iframe: Loading script:', src);
          const script = document.createElement('script');
          script.crossOrigin = 'anonymous';
          
          const timeout = setTimeout(() => {
            console.error('Iframe: Script load timeout:', src);
            reject(new Error('Script load timeout: ' + src));
          }, 8000);
          
          script.onload = () => {
            console.log('Iframe: Script loaded successfully:', src);
            clearTimeout(timeout);
            resolve();
          };
          
          script.onerror = () => {
            console.error('Iframe: Script load error:', src);
            clearTimeout(timeout);
            reject(new Error('Failed to load script: ' + src));
          };
          
          script.src = src;
          document.head.appendChild(script);
        });
      }
    `;
  }

  static createDependencyLoadingScript(): string {
    return `
      async function loadDependencies() {
        try {
          console.log('Iframe: Starting dependency loading');
          
          document.getElementById('root').innerHTML = '<div class="loading">Loading React...</div>';
          await loadScript('https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js');
          
          document.getElementById('root').innerHTML = '<div class="loading">Loading ReactDOM...</div>';
          await loadScript('https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js');
          
          console.log('Iframe: All dependencies loaded successfully');
          initializeApp();
          
        } catch (error) {
          console.error('Iframe: Failed to load dependencies:', error);
          document.getElementById('root').innerHTML = 
            '<div class="error"><strong>Dependency Load Error:</strong><br>' + 
            error.message + '<br><br>Network connectivity issue or CDN unavailable.</div>';
          
          window.parent.postMessage({ 
            type: 'error', 
            message: 'Failed to load dependencies: ' + error.message
          }, '*');
        }
      }
    `;
  }
}
