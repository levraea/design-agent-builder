
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Database, Cloud, Users, ShoppingCart, FileText } from 'lucide-react';

interface API {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: 'active' | 'deprecated' | 'beta';
  icon: React.ComponentType<any>;
}

interface APIRegistryProps {
  selectedAPIs: string[];
  onSelectionChange: (apis: string[]) => void;
}

const mockAPIs: API[] = [
  {
    id: 'user-service',
    name: 'User Management API',
    description: 'Handle user authentication, profiles, and permissions',
    category: 'Authentication',
    version: 'v2.1.0',
    status: 'active',
    icon: Users
  },
  {
    id: 'product-catalog',
    name: 'Product Catalog API',
    description: 'Manage product information, categories, and inventory',
    category: 'E-commerce',
    version: 'v1.5.2',
    status: 'active',
    icon: ShoppingCart
  },
  {
    id: 'analytics-service',
    name: 'Analytics & Reporting API',
    description: 'Generate reports, track metrics, and analyze data',
    category: 'Analytics',
    version: 'v3.0.1',
    status: 'active',
    icon: Database
  },
  {
    id: 'notification-service',
    name: 'Notification Service API',
    description: 'Send emails, SMS, and push notifications',
    category: 'Communication',
    version: 'v1.8.0',
    status: 'active',
    icon: Cloud
  },
  {
    id: 'document-processor',
    name: 'Document Processing API',
    description: 'Process, convert, and manage documents',
    category: 'Documents',
    version: 'v2.0.0',
    status: 'beta',
    icon: FileText
  }
];

export const APIRegistry = ({ selectedAPIs, onSelectionChange }: APIRegistryProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAPIs = mockAPIs.filter(api =>
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

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span>API Registry</span>
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
                    <Badge className={`text-xs ${getStatusColor(api.status)}`}>
                      {api.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{api.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{api.category}</span>
                    <span>•</span>
                    <span>{api.version}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
