
interface PersonaOutputHeaderProps {
  personaName: string;
}

export const PersonaOutputHeader = ({ personaName }: PersonaOutputHeaderProps) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent mb-4">
        Your Persona is Ready!
      </h1>
      <p className="text-gray-600 text-lg">
        Here's the detailed persona profile based on your input
      </p>
    </div>
  );
};
