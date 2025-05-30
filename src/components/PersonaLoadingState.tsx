
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const PersonaLoadingState = () => {
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
};
