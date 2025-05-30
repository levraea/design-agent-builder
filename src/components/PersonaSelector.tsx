
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, X, Check } from 'lucide-react';
import { Persona } from '@/types/persona';

interface PersonaSelectorProps {
  selectedPersona: Persona | null;
  onPersonaSelect: (persona: Persona | null) => void;
}

export const PersonaSelector = ({ selectedPersona, onPersonaSelect }: PersonaSelectorProps) => {
  const [availablePersonas, setAvailablePersonas] = useState<Persona[]>([]);

  useEffect(() => {
    // Load personas from localStorage (since we don't have a backend)
    const savedPersonas = localStorage.getItem('saved-personas');
    if (savedPersonas) {
      try {
        const personas = JSON.parse(savedPersonas);
        setAvailablePersonas(Array.isArray(personas) ? personas : []);
      } catch (error) {
        console.error('Error loading personas:', error);
        setAvailablePersonas([]);
      }
    }
  }, []);

  const handlePersonaChange = (personaId: string) => {
    if (personaId === 'none') {
      onPersonaSelect(null);
      return;
    }
    
    const persona = availablePersonas.find(p => p.id === personaId);
    if (persona) {
      onPersonaSelect(persona);
    }
  };

  const clearPersona = () => {
    onPersonaSelect(null);
  };

  if (availablePersonas.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span>No Personas Available</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Create a persona first to enable user-centered code generation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-brand-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-brand-blue">
          <User className="w-5 h-5" />
          <span>Persona Context</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedPersona ? (
          <div className="bg-brand-blue/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-brand-blue">{selectedPersona.name}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearPersona}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedPersona.purpose}</p>
            <div className="flex items-center text-xs text-green-600">
              <Check className="w-3 h-3 mr-1" />
              Active - AI will generate code for this persona
            </div>
          </div>
        ) : (
          <div>
            <Select onValueChange={handlePersonaChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a persona to guide code generation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No persona (generic generation)</SelectItem>
                {availablePersonas.map((persona) => (
                  <SelectItem key={persona.id} value={persona.id}>
                    {persona.name} - {persona.purpose.slice(0, 50)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-2">
              Selecting a persona will make AI generate user-centered code
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
