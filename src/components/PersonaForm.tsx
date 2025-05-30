
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Loader2 } from 'lucide-react';
import { PersonaFormFields } from '@/components/PersonaFormFields';

interface PersonaFormData {
  product: string;
  targetAudience: string;
  businessGoal: string;
  specialTraits: string;
}

interface PersonaFormProps {
  formData: PersonaFormData;
  onFormDataChange: (field: keyof PersonaFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
}

export const PersonaForm = ({ formData, onFormDataChange, onSubmit, isGenerating }: PersonaFormProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-6 h-6 text-brand-blue" />
          <span>Create Your Persona</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <PersonaFormFields formData={formData} onFormDataChange={onFormDataChange} />
          
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
  );
};
