
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Target, Brain } from 'lucide-react';
import { Persona } from '@/types/persona';
import { MarkdownRenderer } from '@/utils/markdownRenderer';

interface PersonaOutputEmpathyMapProps {
  persona: Persona;
}

export const PersonaOutputEmpathyMap = ({ persona }: PersonaOutputEmpathyMapProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-brand-red" />
          <span>Empathy Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-brand-green/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-brand-green">
                <Target className="w-5 h-5" />
                <span>Goals & Aspirations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <MarkdownRenderer content={persona.goals} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-red/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-brand-red">
                <Brain className="w-5 h-5" />
                <span>Pain Points & Challenges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <MarkdownRenderer content={persona.challenges} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-blue/20 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-brand-blue">
                <Heart className="w-5 h-5" />
                <span>Motivation & Behavior</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <MarkdownRenderer content={persona.motivation} />
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
