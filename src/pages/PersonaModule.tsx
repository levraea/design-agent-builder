
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Target, Heart, Lightbulb, Smartphone, Quote } from 'lucide-react';
import { PersonaConversation } from '@/components/PersonaConversation';
import { PersonaOutput } from '@/components/PersonaOutput';
import { Persona } from '@/types/persona';

export const PersonaModule = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'conversation' | 'output'>('intro');
  const [persona, setPersona] = useState<Persona | null>(null);

  const handleStartConversation = () => {
    setCurrentStep('conversation');
  };

  const handlePersonaComplete = (completedPersona: Persona) => {
    setPersona(completedPersona);
    setCurrentStep('output');
  };

  const handleStartOver = () => {
    setPersona(null);
    setCurrentStep('intro');
  };

  if (currentStep === 'conversation') {
    return (
      <PersonaConversation 
        onPersonaComplete={handlePersonaComplete}
        onBack={() => setCurrentStep('intro')}
      />
    );
  }

  if (currentStep === 'output' && persona) {
    return (
      <PersonaOutput 
        persona={persona}
        onStartOver={handleStartOver}
        onEditPersona={() => setCurrentStep('conversation')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/5 via-brand-green/5 to-brand-red/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-8 h-8 text-brand-blue" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Persona Creation Module
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Create detailed user personas to build empathy, inform product decisions, and ensure user-centered design
            </p>
          </div>

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
                <p className="text-gray-600">Guided conversation to create research-based fictional characters</p>
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

          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <User className="w-16 h-16 text-brand-blue mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Create Your Persona?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                I'll guide you through a conversation to build a detailed, research-based persona that represents 
                your target users. This will help you make better product decisions and create more user-centered designs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-brand-blue" />
                    <span>What We'll Cover:</span>
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Background and demographics</li>
                    <li>• Goals and motivations</li>
                    <li>• Pain points and challenges</li>
                    <li>• Technology comfort level</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Quote className="w-4 h-4 text-brand-green" />
                    <span>You'll Get:</span>
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Detailed persona profile</li>
                    <li>• Empathy map visualization</li>
                    <li>• Behavioral insights</li>
                    <li>• Actionable design recommendations</li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleStartConversation}
                className="bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-blue/90 hover:to-brand-green/90 text-white px-8 py-3 text-lg"
              >
                Start Creating Persona
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
