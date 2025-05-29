
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Target, Heart, Brain, Smartphone, Quote, Edit, RotateCcw, Download } from 'lucide-react';
import { Persona } from '@/types/persona';

interface PersonaOutputProps {
  persona: Persona;
  onStartOver: () => void;
  onEditPersona: () => void;
}

export const PersonaOutput = ({ persona, onStartOver, onEditPersona }: PersonaOutputProps) => {
  const handleDownload = () => {
    // Create a simple text export of the persona
    const personaText = `
PERSONA: ${persona.name}

PURPOSE: ${persona.purpose}

ROLE & OCCUPATION: ${persona.role}

LIFESTYLE & BACKGROUND: ${persona.lifestyle}

GOALS: ${persona.goals}

CHALLENGES: ${persona.challenges}

MOTIVATION & BEHAVIOR: ${persona.motivation}

TECH COMFORT: ${persona.techComfort}

PERSONAL TOUCH: ${persona.personalTouch}

Created: ${persona.createdAt.toLocaleDateString()}
    `.trim();

    const blob = new Blob([personaText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${persona.name.replace(/\s+/g, '_')}_persona.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/5 via-brand-green/5 to-brand-red/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent mb-4">
              Your Persona is Ready!
            </h1>
            <p className="text-gray-600 text-lg">
              Here's the detailed persona profile based on your input
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant="outline"
              onClick={onEditPersona}
              className="border-brand-blue text-brand-blue hover:bg-brand-blue/5"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Persona
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="border-brand-green text-brand-green hover:bg-brand-green/5"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={onStartOver}
              className="border-brand-red text-brand-red hover:bg-brand-red/5"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>

          {/* Persona Summary Card */}
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
                  <p className="text-gray-600 mb-4">{persona.role}</p>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">Lifestyle & Background</h3>
                  <p className="text-gray-600">{persona.lifestyle}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Tech Comfort</h3>
                  <p className="text-gray-600 mb-4">{persona.techComfort}</p>
                  
                  {persona.personalTouch && (
                    <>
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center space-x-1">
                        <Quote className="w-4 h-4" />
                        <span>Personal Touch</span>
                      </h3>
                      <p className="text-gray-600 italic">"{persona.personalTouch}"</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Empathy Map */}
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
                    <p className="text-gray-700">{persona.goals}</p>
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
                    <p className="text-gray-700">{persona.challenges}</p>
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
                    <p className="text-gray-700">{persona.motivation}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Design Recommendations */}
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
        </div>
      </div>
    </div>
  );
};
