
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';
import { Persona } from '@/types/persona';

interface PersonaOutputDesignRecsProps {
  persona: Persona;
}

export const PersonaOutputDesignRecs = ({ persona }: PersonaOutputDesignRecsProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Smartphone className="w-6 h-6 text-brand-blue" />
          <span>Design Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-brand-blue/5 rounded-lg p-4">
            <h4 className="font-semibold text-brand-blue mb-2">User-Centered Design</h4>
            <p className="text-sm text-gray-600">
              Keep {persona.name}'s goals and challenges in mind when making design decisions
            </p>
          </div>
          <div className="bg-brand-green/5 rounded-lg p-4">
            <h4 className="font-semibold text-brand-green mb-2">Technology Approach</h4>
            <p className="text-sm text-gray-600">
              Consider their tech comfort level when designing interfaces and interactions
            </p>
          </div>
          <div className="bg-brand-red/5 rounded-lg p-4">
            <h4 className="font-semibold text-brand-red mb-2">Validation Testing</h4>
            <p className="text-sm text-gray-600">
              Use this persona to validate design decisions and test user flows
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
