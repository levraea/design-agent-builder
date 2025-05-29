
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Layout, Grid, List, BarChart, Calendar, Table } from 'lucide-react';

interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: 'simple' | 'medium' | 'complex';
  icon: React.ComponentType<any>;
}

interface ComponentLibraryProps {
  selectedComponents: string[];
  onSelectionChange: (components: string[]) => void;
}

const mockComponents: Component[] = [
  {
    id: 'data-table',
    name: 'Data Table',
    description: 'Sortable and filterable table with pagination',
    category: 'Data Display',
    complexity: 'medium',
    icon: Table
  },
  {
    id: 'dashboard-card',
    name: 'Dashboard Card',
    description: 'Metric display card with charts and KPIs',
    category: 'Layout',
    complexity: 'simple',
    icon: Layout
  },
  {
    id: 'chart-container',
    name: 'Chart Container',
    description: 'Configurable charts (bar, line, pie, etc.)',
    category: 'Data Visualization',
    complexity: 'complex',
    icon: BarChart
  },
  {
    id: 'form-builder',
    name: 'Dynamic Form',
    description: 'Auto-generated forms with validation',
    category: 'Forms',
    complexity: 'complex',
    icon: List
  },
  {
    id: 'grid-layout',
    name: 'Responsive Grid',
    description: 'Flexible grid system for layouts',
    category: 'Layout',
    complexity: 'simple',
    icon: Grid
  },
  {
    id: 'date-picker',
    name: 'Date Range Picker',
    description: 'Advanced date selection with ranges',
    category: 'Input',
    complexity: 'medium',
    icon: Calendar
  }
];

export const ComponentLibrary = ({ selectedComponents, onSelectionChange }: ComponentLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComponents = mockComponents.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleComponentToggle = (componentId: string) => {
    const updated = selectedComponents.includes(componentId)
      ? selectedComponents.filter(id => id !== componentId)
      : [...selectedComponents, componentId];
    onSelectionChange(updated);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Layout className="w-5 h-5" style={{ color: '#66B512' }} />
          <span>Component Library</span>
        </CardTitle>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {filteredComponents.map((component) => {
          const IconComponent = component.icon;
          return (
            <div
              key={component.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedComponents.includes(component.id) ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
              }`}
              onClick={() => handleComponentToggle(component.id)}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedComponents.includes(component.id)}
                  onChange={() => handleComponentToggle(component.id)}
                  className="mt-1"
                />
                <IconComponent className="w-5 h-5 text-gray-600 mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 truncate">{component.name}</h4>
                    <Badge className={`text-xs ${getComplexityColor(component.complexity)}`}>
                      {component.complexity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {component.category}
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
