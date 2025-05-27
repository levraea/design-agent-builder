
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff } from 'lucide-react';

export const APIKeyInput = () => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isStored, setIsStored] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsStored(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setIsStored(true);
  };

  const handleClear = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsStored(false);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="w-4 h-4" />
          <span>OpenAI API Key</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            type={showKey ? 'text' : 'password'}
            placeholder="Enter your OpenAI API key (sk-...)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleSave}
            disabled={!apiKey || isStored}
            size="sm"
          >
            {isStored ? 'Saved' : 'Save'}
          </Button>
          <Button 
            variant="outline"
            onClick={handleClear}
            size="sm"
          >
            Clear
          </Button>
        </div>
        
        <p className="text-xs text-gray-500">
          Your API key is stored locally in your browser and never sent to our servers. 
          Get your free API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a>.
        </p>
      </CardContent>
    </Card>
  );
};
