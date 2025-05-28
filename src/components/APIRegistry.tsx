import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Database, Cloud, Users, ShoppingCart, FileText, Globe, Camera, Music, BookOpen, Gamepad2, Heart } from 'lucide-react';

interface API {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: 'active' | 'deprecated' | 'beta';
  icon: React.ComponentType<any>;
  link: string;
  auth: string;
  https: boolean;
  cors: string;
}

interface APIRegistryProps {
  selectedAPIs: string[];
  onSelectionChange: (apis: string[]) => void;
}

const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('social') || categoryLower.includes('auth')) return Users;
  if (categoryLower.includes('shopping') || categoryLower.includes('business')) return ShoppingCart;
  if (categoryLower.includes('data') || categoryLower.includes('analytics')) return Database;
  if (categoryLower.includes('cloud') || categoryLower.includes('weather')) return Cloud;
  if (categoryLower.includes('document') || categoryLower.includes('text')) return FileText;
  if (categoryLower.includes('photo') || categoryLower.includes('image')) return Camera;
  if (categoryLower.includes('music') || categoryLower.includes('audio')) return Music;
  if (categoryLower.includes('books') || categoryLower.includes('news')) return BookOpen;
  if (categoryLower.includes('games') || categoryLower.includes('entertainment')) return Gamepad2;
  if (categoryLower.includes('health') || categoryLower.includes('medical')) return Heart;
  return Globe;
};

// Fallback mock data when API fails
const mockAPIs: API[] = [
  {
    id: 'jsonplaceholder',
    name: 'JSONPlaceholder',
    description: 'Free fake REST API for testing and prototyping',
    category: 'Development',
    version: 'v1.0.0',
    status: 'active',
    icon: Database,
    link: 'https://jsonplaceholder.typicode.com',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'openweather',
    name: 'OpenWeatherMap',
    description: 'Weather data including current weather, forecasts, and historical data',
    category: 'Weather',
    version: 'v2.5',
    status: 'active',
    icon: Cloud,
    link: 'https://openweathermap.org/api',
    auth: 'API Key',
    https: true,
    cors: 'yes'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    description: 'Beautiful, free photos gifted by the worlds most generous community',
    category: 'Photography',
    version: 'v1.0',
    status: 'active',
    icon: Camera,
    link: 'https://unsplash.com/developers',
    auth: 'API Key',
    https: true,
    cors: 'yes'
  },
  {
    id: 'restcountries',
    name: 'REST Countries',
    description: 'Get information about countries via a RESTful API',
    category: 'Geography',
    version: 'v3.1',
    status: 'active',
    icon: Globe,
    link: 'https://restcountries.com',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'quotegarden',
    name: 'QuoteGarden',
    description: 'REST API for famous quotes',
    category: 'Text',
    version: 'v3.0',
    status: 'active',
    icon: BookOpen,
    link: 'https://quotegarden.herokuapp.com',
    auth: 'None',
    https: true,
    cors: 'yes'
  }
];

export const APIRegistry = ({ selectedAPIs, onSelectionChange }: APIRegistryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apis, setApis] = useState<API[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Attempting to fetch APIs from public registry...');
        
        // Try using a CORS proxy first
        const corsProxy = 'https://api.allorigins.win/get?url=';
        const apiUrl = encodeURIComponent('https://api.publicapis.org/entries');
        const response = await fetch(`${corsProxy}${apiUrl}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch from CORS proxy');
        }
        
        const proxyData = await response.json();
        const data = JSON.parse(proxyData.contents);
        
        console.log('Successfully fetched API data:', data);
        
        // Transform the data to match our interface
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
        
        setApis(transformedAPIs);
        console.log('APIs loaded successfully:', transformedAPIs.length);
      } catch (err) {
        console.error('Error fetching APIs, falling back to mock data:', err);
        setApis(mockAPIs);
        setError('Using sample APIs (live registry unavailable)');
      } finally {
        setLoading(false);
      }
    };

    fetchAPIs();
  }, []);

  const filteredAPIs = apis.filter(api =>
    api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    api.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAPIToggle = (apiId: string) => {
    const updated = selectedAPIs.includes(apiId)
      ? selectedAPIs.filter(id => id !== apiId)
      : [...selectedAPIs, apiId];
    onSelectionChange(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card className="h-[500px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>API Registry</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>Loading APIs...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-[500px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>API Registry</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-500">
            <p className="font-medium">Error loading APIs</p>
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span>API Registry ({apis.length} APIs)</span>
          {error && (
            <Badge className="text-xs bg-yellow-100 text-yellow-800 ml-2">
              Sample Data
            </Badge>
          )}
        </CardTitle>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search APIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {filteredAPIs.map((api) => {
          const IconComponent = api.icon;
          return (
            <div
              key={api.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedAPIs.includes(api.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => handleAPIToggle(api.id)}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedAPIs.includes(api.id)}
                  onChange={() => handleAPIToggle(api.id)}
                  className="mt-1"
                />
                <IconComponent className="w-5 h-5 text-gray-600 mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 truncate">{api.name}</h4>
                    <div className="flex items-center space-x-2">
                      {api.https && (
                        <Badge className="text-xs bg-green-100 text-green-800">
                          HTTPS
                        </Badge>
                      )}
                      <Badge className={`text-xs ${getStatusColor(api.status)}`}>
                        {api.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{api.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{api.category}</span>
                    <span>•</span>
                    <span>Auth: {api.auth}</span>
                    {api.link && (
                      <>
                        <span>•</span>
                        <a 
                          href={api.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Documentation
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredAPIs.length === 0 && searchTerm && (
          <div className="text-center text-gray-500 py-8">
            <p>No APIs found matching "{searchTerm}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
