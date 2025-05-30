
import { useState } from 'react';
import { User } from 'lucide-react';
import { PersonaOutput } from '@/components/PersonaOutput';
import { PersonaForm } from '@/components/PersonaForm';
import { PersonaInfoCards } from '@/components/PersonaInfoCards';
import { PersonaLoadingState } from '@/components/PersonaLoadingState';
import { Persona } from '@/types/persona';
import { callGeminiAPI } from '@/services/geminiApiService';
import { savePersonaToStorage, extractSection, cleanMarkdownText } from '@/utils/personaUtils';

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

  const handleFormDataChange = (field: keyof PersonaFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

      // Extract and preserve markdown in all persona data
      const richPersonaData = {
        name: cleanMarkdownText(extractSection(lines, 'NAME') || ''),
        role: cleanMarkdownText(extractSection(lines, 'ROLE') || ''),
        lifestyle: cleanMarkdownText(extractSection(lines, 'LIFESTYLE') || ''),
        goals: cleanMarkdownText(extractSection(lines, 'GOALS') || ''),
        challenges: cleanMarkdownText(extractSection(lines, 'CHALLENGES') || ''),
        motivation: cleanMarkdownText(extractSection(lines, 'MOTIVATION') || ''),
        techComfort: cleanMarkdownText(extractSection(lines, 'TECH_COMFORT') || ''),
        personalTouch: cleanMarkdownText(extractSection(lines, 'PERSONAL_TOUCH') || ''),
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
      
      // Save persona to localStorage for use in other modules
      savePersonaToStorage(newPersona);
      
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
      
      // Save fallback persona as well
      savePersonaToStorage(fallbackPersona);
      
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
    return <PersonaLoadingState />;
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

          <PersonaInfoCards />

          <PersonaForm 
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onSubmit={handleFormSubmit}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};
