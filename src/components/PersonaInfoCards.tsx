
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Heart, Lightbulb } from 'lucide-react';

export const PersonaInfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="border-brand-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-brand-blue">
            <Target className="w-5 h-5" />
            <span>Purpose</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Build empathy for your target users and inform design decisions</p>
        </CardContent>
      </Card>

      <Card className="border-brand-green/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-brand-green">
            <Heart className="w-5 h-5" />
            <span>Process</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">AI-powered persona generation based on your product and audience</p>
        </CardContent>
      </Card>

      <Card className="border-brand-red/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-brand-red">
            <Lightbulb className="w-5 h-5" />
            <span>Output</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Empathy map, persona card, and actionable insights</p>
        </CardContent>
      </Card>
    </div>
  );
};
