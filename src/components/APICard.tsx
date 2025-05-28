
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { API } from '@/types/api';

interface APICardProps {
  api: API;
  isSelected: boolean;
  onToggle: (apiId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'beta': return 'bg-yellow-100 text-yellow-800';
    case 'deprecated': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const APICard = ({ api, isSelected, onToggle }: APICardProps) => {
  const IconComponent = api.icon;

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => onToggle(api.id)}
    >
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={isSelected}
          onChange={() => onToggle(api.id)}
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
};
