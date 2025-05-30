
import { Button } from '@/components/ui/button';
import { Edit, RotateCcw, Download } from 'lucide-react';
import { Persona } from '@/types/persona';

interface PersonaOutputActionsProps {
  persona: Persona;
  onEditPersona: () => void;
  onStartOver: () => void;
}

export const PersonaOutputActions = ({ persona, onEditPersona, onStartOver }: PersonaOutputActionsProps) => {
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
  );
};
