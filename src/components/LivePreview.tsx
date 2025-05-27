
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Loader2 } from 'lucide-react';

interface LivePreviewProps {
  code: string;
  isGenerating: boolean;
}

export const LivePreview = ({ code, isGenerating }: LivePreviewProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Monitor className="w-4 h-4" />
          <span className="text-sm font-medium">Live Preview</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="flex-1 bg-white overflow-auto">
        {isGenerating ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
              <p className="text-lg font-medium text-gray-700">Generating Application...</p>
              <p className="text-sm text-gray-500 mt-2">
                AI is analyzing your prompt and selecting the best APIs and components
              </p>
            </div>
          </div>
        ) : code ? (
          <div className="p-6">
            {/* Live Preview Content - This would normally render the actual generated React component */}
            <div className="max-w-4xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Generated Application Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <h3 className="font-semibold mb-2">Metric 1</h3>
                        <p className="text-2xl font-bold text-blue-600">1,234</p>
                        <p className="text-sm text-gray-500">+12% from last month</p>
                      </Card>
                      <Card className="p-4">
                        <h3 className="font-semibold mb-2">Metric 2</h3>
                        <p className="text-2xl font-bold text-green-600">5,678</p>
                        <p className="text-sm text-gray-500">+8% from last month</p>
                      </Card>
                      <Card className="p-4">
                        <h3 className="font-semibold mb-2">Metric 3</h3>
                        <p className="text-2xl font-bold text-purple-600">910</p>
                        <p className="text-sm text-gray-500">-3% from last month</p>
                      </Card>
                    </div>
                    
                    <Card className="p-4">
                      <h3 className="font-semibold mb-4">Interactive Elements</h3>
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="Sample input field" 
                          className="w-full p-2 border rounded-md"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                          Sample Button
                        </button>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-semibold mb-4">Data Display</h3>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex justify-between items-center p-2 border-b">
                            <span>Data Item {i}</span>
                            <span className="text-sm text-gray-500">Value {i}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Live Preview</h3>
              <p>Your generated application will appear here</p>
              <p className="text-sm mt-2">Enter a prompt to start building</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
