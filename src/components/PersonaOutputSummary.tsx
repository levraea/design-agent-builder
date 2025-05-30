
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Quote } from 'lucide-react';
import { Persona } from '@/types/persona';
import { MarkdownRenderer } from '@/utils/markdownRenderer';

interface PersonaOutputSummaryProps {
  persona: Persona;
}

export const PersonaOutputSummary = ({ persona }: PersonaOutputSummaryProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
      <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-brand-green/10">
        <CardTitle className="flex items-center space-x-3">
          <User className="w-8 h-8 text-brand-blue" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{persona.name}</h2>
            <p className="text-gray-600 font-normal">User Persona Profile</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Role & Occupation</h3>
            <div className="text-gray-600 mb-4">
              <MarkdownRenderer content={persona.role} />
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">Lifestyle & Background</h3>
            <div className="text-gray-600">
              <MarkdownRenderer content={persona.lifestyle} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Tech Comfort</h3>
            <div className="text-gray-600 mb-4">
              <MarkdownRenderer content={persona.techComfort} />
            </div>
            
            {persona.personalTouch && (
              <>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center space-x-1">
                  <Quote className="w-4 h-4" />
                  <span>Personal Touch</span>
                </h3>
                <div className="text-gray-600 italic">
                  <MarkdownRenderer content={`"${persona.personalTouch}"`} />
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
