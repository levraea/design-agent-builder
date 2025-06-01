
import { generateHTMLTemplate } from './iframe/htmlTemplate';
import { generateRechartsLoader, generateRechartsFallbacks } from './iframe/rechartsLoader';
import { generateApiUtilities } from './iframe/apiUtils';
import { generateAppInitializer } from './iframe/appInitializer';

export const generateIframeContent = (cleanCode: string): string => {
  const htmlTemplate = generateHTMLTemplate();
  const rechartsLoader = generateRechartsLoader();
  const rechartsFallbacks = generateRechartsFallbacks();
  const apiUtilities = generateApiUtilities();
  const appInitializer = generateAppInitializer(cleanCode);

  // Insert the scripts into the HTML template
  const scriptsSection = `
      <script type="module">
        ${rechartsLoader}

        // Load recharts and then initialize the app
        loadRecharts().then((success) => {
          if (!success) {
            console.warn('Recharts failed to load, providing fallback components');
            // Provide fallback chart components if recharts fails to load
            ${rechartsFallbacks}
          } else {
            console.log('All Recharts components are now available globally');
          }
          
          initializeApp();
        });
      </script>
      <script>
        ${apiUtilities}

        ${appInitializer}
      </script>
    </body>
    </html>
  `;

  return htmlTemplate.replace('</body>\n    </html>', scriptsSection);
};
