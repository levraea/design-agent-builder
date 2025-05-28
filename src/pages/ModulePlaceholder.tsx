
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  input: string;
  aiFunction: string;
  output: string;
}

export const ModulePlaceholder = ({ title, description, icon: Icon, input, aiFunction, output }: ModulePlaceholderProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Icon className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>
            <p className="text-gray-600 text-lg">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Input</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{input}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Function</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{aiFunction}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Output</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{output}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="text-center py-12">
              <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
              <p className="text-gray-500 mb-6">This module is currently under development</p>
              <Button disabled>
                Launch Module
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
