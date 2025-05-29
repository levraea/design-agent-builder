
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, User, MessageCircle } from 'lucide-react';
import { Persona, ConversationStep } from '@/types/persona';

interface PersonaConversationProps {
  onPersonaComplete: (persona: Persona) => void;
  onBack: () => void;
}

const conversationSteps: ConversationStep[] = [
  {
    id: 'purpose',
    title: 'Define Purpose',
    aiMessage: "What product or project are you creating this persona for? What do you hope to learn from it?",
    inputType: 'textarea',
    placeholder: 'Describe your product/project and goals for this persona...'
  },
  {
    id: 'name',
    title: 'Name & Role',
    aiMessage: "What would you like to name your persona?",
    inputType: 'input',
    placeholder: 'Enter a name for your persona...'
  },
  {
    id: 'role',
    title: 'Occupation',
    aiMessage: "What is their occupation or role? What does a typical day look like for them?",
    inputType: 'textarea',
    placeholder: 'Describe their job, daily routine, and responsibilities...'
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle & Background',
    aiMessage: "What are some hobbies, behaviors, or lifestyle traits that affect their product usage?",
    inputType: 'textarea',
    placeholder: 'Describe their interests, habits, and lifestyle...'
  },
  {
    id: 'goals',
    title: 'Goals',
    aiMessage: "What are the primary goals your persona is trying to achieve?",
    inputType: 'textarea',
    placeholder: 'List their main objectives and aspirations...'
  },
  {
    id: 'challenges',
    title: 'Challenges',
    aiMessage: "What challenges or frustrations stand in the way of achieving their goals?",
    inputType: 'textarea',
    placeholder: 'Describe their pain points and obstacles...'
  },
  {
    id: 'motivation',
    title: 'Motivation & Behavior',
    aiMessage: "What motivates this persona to act? How do they typically find tools or information—search, word of mouth, social?",
    inputType: 'textarea',
    placeholder: 'Describe what drives them and how they discover new tools...'
  },
  {
    id: 'tech',
    title: 'Tech Comfort',
    aiMessage: "How tech-savvy is this persona? What devices do they primarily use?",
    inputType: 'textarea',
    placeholder: 'Describe their technology comfort level and preferred devices...'
  },
  {
    id: 'extras',
    title: 'Personal Touch',
    aiMessage: "Would you like to include a quote, brand sentiment, or personal detail to humanize them further?",
    inputType: 'textarea',
    placeholder: 'Add a personal quote or additional humanizing details...'
  }
];

export const PersonaConversation = ({ onPersonaComplete, onBack }: PersonaConversationProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState('');

  const currentStep = conversationSteps[currentStepIndex];
  const isLastStep = currentStepIndex === conversationSteps.length - 1;

  const handleNext = () => {
    const newResponses = { ...responses, [currentStep.id]: currentInput };
    setResponses(newResponses);
    setCurrentInput('');

    if (isLastStep) {
      // Create the persona object
      const persona: Persona = {
        id: Date.now().toString(),
        name: newResponses.name || 'Unnamed Persona',
        purpose: newResponses.purpose || '',
        role: newResponses.role || '',
        lifestyle: newResponses.lifestyle || '',
        goals: newResponses.goals || '',
        challenges: newResponses.challenges || '',
        motivation: newResponses.motivation || '',
        techComfort: newResponses.tech || '',
        personalTouch: newResponses.extras || '',
        createdAt: new Date()
      };
      onPersonaComplete(persona);
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const prevStep = conversationSteps[currentStepIndex - 1];
      setCurrentInput(responses[prevStep.id] || '');
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const progress = ((currentStepIndex + 1) / conversationSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/5 via-brand-green/5 to-brand-red/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Overview
            </Button>
            
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-6 h-6 text-brand-blue" />
              <h1 className="text-2xl font-bold text-gray-800">Creating Your Persona</h1>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-brand-blue to-brand-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Step {currentStepIndex + 1} of {conversationSteps.length}: {currentStep.title}
            </p>
          </div>

          {/* Conversation Card */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-brand-blue" />
                <span>AI Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-brand-blue/5 rounded-lg p-4 mb-6">
                <p className="text-gray-800">{currentStep.aiMessage}</p>
              </div>
              
              {currentStep.inputType === 'textarea' ? (
                <Textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={currentStep.placeholder}
                  className="min-h-[120px] mb-4"
                />
              ) : (
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={currentStep.placeholder}
                  className="mb-4"
                />
              )}
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!currentInput.trim()}
                  className="bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-blue/90 hover:to-brand-green/90 text-white"
                >
                  {isLastStep ? 'Create Persona' : 'Next'}
                  {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Previous Responses Summary */}
          {Object.keys(responses).length > 0 && (
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your Responses So Far</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(responses).map(([stepId, response]) => {
                    const step = conversationSteps.find(s => s.id === stepId);
                    return (
                      <div key={stepId} className="text-sm">
                        <span className="font-medium text-gray-700">{step?.title}: </span>
                        <span className="text-gray-600">{response.substring(0, 100)}{response.length > 100 ? '...' : ''}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
