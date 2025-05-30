
import { useState, useEffect } from 'react';

interface ModuleLoaderProps {
  modules: string[];
  onLoaded: (loadedModules: Record<string, any>) => void;
  onError: (error: string) => void;
}

export const ModuleLoader = ({ modules, onLoaded, onError }: ModuleLoaderProps) => {
  const [loadingStatus, setLoadingStatus] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({});

  useEffect(() => {
    const loadModules = async () => {
      const loadedModules: Record<string, any> = {};
      const status: Record<string, 'loading' | 'loaded' | 'error'> = {};

      for (const moduleName of modules) {
        try {
          status[moduleName] = 'loading';
          setLoadingStatus({ ...status });

          // Map common module names to CDN URLs
          const moduleUrl = getModuleUrl(moduleName);
          
          if (moduleUrl) {
            // Dynamic import from CDN
            const module = await import(/* @vite-ignore */ moduleUrl);
            loadedModules[moduleName] = module;
            status[moduleName] = 'loaded';
          } else {
            // Try to load from local context
            const module = await loadLocalModule(moduleName);
            loadedModules[moduleName] = module;
            status[moduleName] = 'loaded';
          }
        } catch (error) {
          console.error(`Failed to load module ${moduleName}:`, error);
          status[moduleName] = 'error';
          // Don't call onError for chart modules as they're optional
          if (!moduleName.includes('chart')) {
            onError(`Failed to load module: ${moduleName}`);
          }
        }
        
        setLoadingStatus({ ...status });
      }

      onLoaded(loadedModules);
    };

    if (modules.length > 0) {
      loadModules();
    }
  }, [modules, onLoaded, onError]);

  return null; // This is a utility component with no UI
};

// Helper function to map module names to CDN URLs
const getModuleUrl = (moduleName: string): string | null => {
  const moduleMap: Record<string, string> = {
    'react': 'https://esm.sh/react@18',
    'react-dom': 'https://esm.sh/react-dom@18',
    'lodash': 'https://esm.sh/lodash',
    'axios': 'https://esm.sh/axios',
    'date-fns': 'https://esm.sh/date-fns',
    'lucide-react': 'https://esm.sh/lucide-react',
    'chart.js': 'https://esm.sh/chart.js',
    'react-chartjs-2': 'https://esm.sh/react-chartjs-2',
    'recharts': 'https://esm.sh/recharts',
  };

  return moduleMap[moduleName] || null;
};

// Helper function to load modules from local context
const loadLocalModule = async (moduleName: string): Promise<any> => {
  // This would be where you'd load from your local module registry
  // For now, we'll return a placeholder
  throw new Error(`Local module ${moduleName} not found`);
};
