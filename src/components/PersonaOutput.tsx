
import { Persona } from '@/types/persona';
import { PersonaOutputHeader } from '@/components/PersonaOutputHeader';
import { PersonaOutputActions } from '@/components/PersonaOutputActions';
import { PersonaOutputSummary } from '@/components/PersonaOutputSummary';
import { PersonaOutputEmpathyMap } from '@/components/PersonaOutputEmpathyMap';
import { PersonaOutputDesignRecs } from '@/components/PersonaOutputDesignRecs';

interface PersonaOutputProps {
  persona: Persona;
  onStartOver: () => void;
  onEditPersona: () => void;
}

export const PersonaOutput = ({ persona, onStartOver, onEditPersona }: PersonaOutputProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/5 via-brand-green/5 to-brand-red/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <PersonaOutputHeader personaName={persona.name} />
          <PersonaOutputActions 
            persona={persona}
            onEditPersona={onEditPersona}
            onStartOver={onStartOver}
          />
          <PersonaOutputSummary persona={persona} />
          <PersonaOutputEmpathyMap persona={persona} />
          <PersonaOutputDesignRecs persona={persona} />
        </div>
      </div>
    </div>
  );
};
