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

// Helper function to clean markdown formatting
const cleanMarkdownText = (text: string): string => {
  if (!text) return '';
  
  // Keep the markdown formatting instead of removing it
  return text
    // Clean up extra whitespace but preserve formatting
    .replace(/\s+/g, ' ')
    .trim();
};

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

Please format your response as follows with markdown formatting for emphasis and lists:
NAME: [Persona name]
ROLE: [Their occupation and daily routine - use **bold** for key points and bullet lists with - for multiple items]
LIFESTYLE: [Interests, habits, and lifestyle traits - use **bold** for key points and bullet lists with - for multiple items]
GOALS: [Primary objectives and aspirations - use **bold** for key points and bullet lists with - for multiple items]
CHALLENGES: [Pain points and obstacles - use **bold** for key points and bullet lists with - for multiple items]
MOTIVATION: [What drives them and how they discover tools - use **bold** for key points and bullet lists with - for multiple items]
TECH_COMFORT: [Technology comfort level and preferred devices - use **bold** for key points and bullet lists with - for multiple items]
PERSONAL_TOUCH: [A personal quote or humanizing detail]`;

      console.log('Sending prompt to AI:', prompt);
      const response = await callGeminiAPI(prompt);
      console.log('AI Response received:', response);
      
      // Enhanced parsing logic to preserve markdown formatting
      const lines = response.split('\n').filter(line => line.trim());
      const personaData: any = {};
      
      // Helper function to extract section content while preserving markdown
      const extractSection = (sectionName: string) => {
        const startPattern = new RegExp(`\\*?\\*?${sectionName}:\\*?\\*?`, 'i');
        const nextSectionPattern = /\*?\*?(NAME|ROLE|LIFESTYLE|GOALS|CHALLENGES|MOTIVATION|TECH_COMFORT|PERSONAL_TOUCH|PREFERRED_CHANNELS|MESSAGING_THAT_RESONATES):\*?\*?/i;
        
        const startIndex = lines.findIndex(line => startPattern.test(line));
        if (startIndex === -1) return null;
        
        let content = [];
        let currentIndex = startIndex;
        
        // Get the content from the first line, removing the section header
        const firstLineMatch = lines[currentIndex].match(startPattern);
        if (firstLineMatch) {
          const remainingText = lines[currentIndex].substring(firstLineMatch.index + firstLineMatch[0].length).trim();
          if (remainingText) content.push(remainingText);
        }
        
        // Continue reading until we hit another section or end
        currentIndex++;
        while (currentIndex < lines.length) {
          const line = lines[currentIndex].trim();
          if (nextSectionPattern.test(line)) break;
          if (line) content.push(line);
          currentIndex++;
        }
        
        // Join content and preserve markdown formatting
        const rawContent = content.join('\n').trim();
        return cleanMarkdownText(rawContent);
      };

      // Extract and preserve markdown in all persona data
      const richPersonaData = {
        name: cleanMarkdownText(extractSection('NAME') || ''),
        role: cleanMarkdownText(extractSection('ROLE') || ''),
        lifestyle: cleanMarkdownText(extractSection('LIFESTYLE') || ''),
        goals: cleanMarkdownText(extractSection('GOALS') || ''),
        challenges: cleanMarkdownText(extractSection('CHALLENGES') || ''),
        motivation: cleanMarkdownText(extractSection('MOTIVATION') || ''),
        techComfort: cleanMarkdownText(extractSection('TECH_COMFORT') || ''),
        personalTouch: cleanMarkdownText(extractSection('PERSONAL_TOUCH') || ''),
      };

      console.log('Parsed persona data:', richPersonaData);

      const newPersona: Persona = {
        id: Date.now().toString(),
        name: richPersonaData.name || `${formData.targetAudience} Persona`,
        purpose: `Persona for ${formData.product} targeting ${formData.targetAudience}`,
        role: richPersonaData.role || 'Professional seeking solutions for their daily challenges',
        lifestyle: richPersonaData.lifestyle || 'Active lifestyle with focus on efficiency and personal growth',
        goals: richPersonaData.goals || 'Achieve success while maintaining work-life balance and personal wellbeing',
        challenges: richPersonaData.challenges || 'Time constraints, information overload, and competing priorities',
        motivation: richPersonaData.motivation || 'Driven by results and recommendations from trusted sources',
        techComfort: richPersonaData.techComfort || 'Comfortable with technology but prefers intuitive, user-friendly interfaces',
        personalTouch: richPersonaData.personalTouch || 'Values authenticity and practical solutions that fit into their busy lifestyle',
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
                    placeholder="e.g., Digital health platform for chronic disease management, new crop protection solution, or consumer pain relief product"
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
                    placeholder="e.g., Healthcare providers in primary care, farmers managing 500+ acres, or consumers aged 25-45 seeking wellness solutions"
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
                      <SelectItem value="improve-employee-experience">Improve Employee Experience</SelectItem>
                      <SelectItem value="enhance-internal-processes">Enhance Internal Processes</SelectItem>
                      <SelectItem value="drive-innovation">Drive Innovation & R&D</SelectItem>
                      <SelectItem value="strengthen-compliance">Strengthen Compliance & Safety</SelectItem>
                      <SelectItem value="optimize-operations">Optimize Operations & Efficiency</SelectItem>
                      <SelectItem value="improve-collaboration">Improve Cross-Team Collaboration</SelectItem>
                      <SelectItem value="accelerate-decision-making">Accelerate Decision Making</SelectItem>
                      <SelectItem value="enhance-training">Enhance Training & Development</SelectItem>
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
                    placeholder="e.g., Values scientific evidence and regulatory compliance, cost-conscious decision making, prefers digital solutions that integrate with existing workflows"
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
