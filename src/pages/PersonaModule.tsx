
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Target, Heart, Lightbulb, Smartphone, Quote, Loader2 } from 'lucide-react';
import { PersonaOutput } from '@/components/PersonaOutput';
import { Persona } from '@/types/persona';
import { callGeminiAPI } from '@/services/geminiApiService';

interface PersonaFormData {
  product: string;
  targetAudience: string;
  businessGoal: string;
  specialTraits: string;
}

export const PersonaModule = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'generating' | 'output'>('form');
  const [persona, setPersona] = useState<Persona | null>(null);
  const [formData, setFormData] = useState<PersonaFormData>({
    product: '',
    targetAudience: '',
    businessGoal: '',
    specialTraits: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.product || !formData.targetAudience || !formData.businessGoal) return;

    setIsGenerating(true);
    setCurrentStep('generating');

    try {
      const prompt = `Create a detailed buyer persona for:

Product/Service: "${formData.product}"
Target Audience: "${formData.targetAudience}"
Business Goal: "${formData.businessGoal}"
Special Focus: "${formData.specialTraits || 'N/A'}"

Generate a comprehensive persona including demographics, motivations, pain points, behaviors, preferred channels, and messaging that would resonate. Make it realistic with specific details and quotes.

Please format your response as follows:
NAME: [Persona name]
ROLE: [Their occupation and daily routine]
LIFESTYLE: [Interests, habits, and lifestyle traits]
GOALS: [Primary objectives and aspirations]
CHALLENGES: [Pain points and obstacles]
MOTIVATION: [What drives them and how they discover tools]
TECH_COMFORT: [Technology comfort level and preferred devices]
PERSONAL_TOUCH: [A personal quote or humanizing detail]`;

      console.log('Sending prompt to AI:', prompt);
      const response = await callGeminiAPI(prompt);
      console.log('AI Response received:', response);
      
      // Parse the AI response to extract persona data
      const lines = response.split('\n').filter(line => line.trim());
      const personaData: any = {};
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('NAME:')) personaData.name = trimmedLine.replace('NAME:', '').trim();
        if (trimmedLine.startsWith('ROLE:')) personaData.role = trimmedLine.replace('ROLE:', '').trim();
        if (trimmedLine.startsWith('LIFESTYLE:')) personaData.lifestyle = trimmedLine.replace('LIFESTYLE:', '').trim();
        if (trimmedLine.startsWith('GOALS:')) personaData.goals = trimmedLine.replace('GOALS:', '').trim();
        if (trimmedLine.startsWith('CHALLENGES:')) personaData.challenges = trimmedLine.replace('CHALLENGES:', '').trim();
        if (trimmedLine.startsWith('MOTIVATION:')) personaData.motivation = trimmedLine.replace('MOTIVATION:', '').trim();
        if (trimmedLine.startsWith('TECH_COMFORT:')) personaData.techComfort = trimmedLine.replace('TECH_COMFORT:', '').trim();
        if (trimmedLine.startsWith('PERSONAL_TOUCH:')) personaData.personalTouch = trimmedLine.replace('PERSONAL_TOUCH:', '').trim();
      });

      console.log('Parsed persona data:', personaData);

      const newPersona: Persona = {
        id: Date.now().toString(),
        name: personaData.name || `${formData.targetAudience} Persona`,
        purpose: `Persona for ${formData.product} targeting ${formData.targetAudience}`,
        role: personaData.role || 'Professional seeking solutions for their daily challenges',
        lifestyle: personaData.lifestyle || 'Active lifestyle with focus on efficiency and personal growth',
        goals: personaData.goals || 'Achieve success while maintaining work-life balance and personal wellbeing',
        challenges: personaData.challenges || 'Time constraints, information overload, and competing priorities',
        motivation: personaData.motivation || 'Driven by results and recommendations from trusted sources',
        techComfort: personaData.techComfort || 'Comfortable with technology but prefers intuitive, user-friendly interfaces',
        personalTouch: personaData.personalTouch || 'Values authenticity and practical solutions that fit into their busy lifestyle',
        createdAt: new Date()
      };

      console.log('Final persona object:', newPersona);
      setPersona(newPersona);
      setCurrentStep('output');
    } catch (error) {
      console.error('Error generating persona:', error);
      // Create a fallback persona with meaningful content
      const fallbackPersona: Persona = {
        id: Date.now().toString(),
        name: `${formData.targetAudience} Persona`,
        purpose: `Persona for ${formData.product} targeting ${formData.targetAudience}`,
        role: 'Professional in their field with typical daily responsibilities and goals',
        lifestyle: 'Balanced lifestyle with focus on efficiency, quality, and personal growth',
        goals: 'Achieve success while maintaining work-life balance and pursuing personal interests',
        challenges: 'Time constraints, information overload, and balancing multiple priorities',
        motivation: 'Driven by results, peer recommendations, and solutions that provide clear value',
        techComfort: 'Comfortable with technology but prefers intuitive interfaces and clear user experiences',
        personalTouch: 'Values authenticity, practical solutions, and tools that integrate seamlessly into their routine',
        createdAt: new Date()
      };
      console.log('Using fallback persona:', fallbackPersona);
      setPersona(fallbackPersona);
      setCurrentStep('output');
    }

    setIsGenerating(false);
  };

  const handleStartOver = () => {
    setPersona(null);
    setCurrentStep('form');
    setFormData({
      product: '',
      targetAudience: '',
      businessGoal: '',
      specialTraits: ''
    });
  };

  const handleEditPersona = () => {
    setCurrentStep('form');
  };

  if (currentStep === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-blue/5 via-brand-green/5 to-brand-red/5 flex items-center justify-center">
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm p-8">
          <CardContent className="text-center">
            <Loader2 className="w-16 h-16 text-brand-blue mx-auto mb-6 animate-spin" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Generating Your Persona</h3>
            <p className="text-gray-600">
              AI is creating a detailed persona based on your input...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'output' && persona) {
    console.log('Rendering PersonaOutput with persona:', persona);
    return (
      <PersonaOutput 
        persona={persona}
        onStartOver={handleStartOver}
        onEditPersona={handleEditPersona}
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

          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-6 h-6 text-brand-blue" />
                <span>Create Your Persona</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                    What product/service are you building personas for? *
                  </label>
                  <Input
                    id="product"
                    value={formData.product}
                    onChange={(e) => setFormData(prev => ({ ...prev, product: e.target.value }))}
                    placeholder="e.g., Meditation app for busy professionals"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-2">
                    Who is your primary target audience? *
                  </label>
                  <Textarea
                    id="audience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    placeholder="e.g., Working parents, 30-45, stressed about work-life balance"
                    className="min-h-[80px]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                    What's your main business goal? *
                  </label>
                  <Select value={formData.businessGoal} onValueChange={(value) => setFormData(prev => ({ ...prev, businessGoal: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary business goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="increase-sales">Increase Sales</SelectItem>
                      <SelectItem value="improve-ux">Improve User Experience</SelectItem>
                      <SelectItem value="better-marketing">Better Marketing Targeting</SelectItem>
                      <SelectItem value="user-acquisition">User Acquisition</SelectItem>
                      <SelectItem value="retention">Improve User Retention</SelectItem>
                      <SelectItem value="product-development">Product Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="traits" className="block text-sm font-medium text-gray-700 mb-2">
                    Any specific traits or behaviors you want emphasized? (optional)
                  </label>
                  <Textarea
                    id="traits"
                    value={formData.specialTraits}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialTraits: e.target.value }))}
                    placeholder="e.g., Time-constrained, skeptical of wellness trends"
                    className="min-h-[80px]"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={!formData.product || !formData.targetAudience || !formData.businessGoal || isGenerating}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-blue/90 hover:to-brand-green/90 text-white"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Persona...
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-2" />
                      Generate Persona with AI
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
