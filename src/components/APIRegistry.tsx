
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Database } from 'lucide-react';
import { API, APIRegistryProps } from '@/types/api';
import { fetchAPIs } from '@/services/apiService';
import { APICard } from '@/components/APICard';

export const APIRegistry = ({ selectedAPIs, onSelectionChange }: APIRegistryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apis, setApis] = useState<API[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAPIs = async () => {
      setLoading(true);
      const { apis, error } = await fetchAPIs();
      setApis(apis);
      setError(error);
      setLoading(false);
    };

    loadAPIs();
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

  // Only show error screen if we have no APIs at all
  if (error && apis.length === 0) {
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
        {filteredAPIs.map((api) => (
          <APICard
            key={api.id}
            api={api}
            isSelected={selectedAPIs.includes(api.id)}
            onToggle={handleAPIToggle}
          />
        ))}
        
        {filteredAPIs.length === 0 && searchTerm && (
          <div className="text-center text-gray-500 py-8">
            <p>No APIs found matching "{searchTerm}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
