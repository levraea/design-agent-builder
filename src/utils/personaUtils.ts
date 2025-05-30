import { Persona } from '@/types/persona';

// Helper function to clean markdown formatting
export const cleanMarkdownText = (text: string): string => {
  if (!text) return '';
  
  // Keep the markdown formatting instead of removing it
  return text
    // Clean up extra whitespace but preserve formatting
    .replace(/\s+/g, ' ')
    .trim();
};

// Helper function to save persona to localStorage
export const savePersonaToStorage = (persona: Persona) => {
  try {
    const existingPersonas = localStorage.getItem('saved-personas');
    const personas = existingPersonas ? JSON.parse(existingPersonas) : [];
    
    // Add the new persona to the array
    personas.push(persona);
    
    // Save back to localStorage
    localStorage.setItem('saved-personas', JSON.stringify(personas));
    console.log('Persona saved to localStorage:', persona.name);
  } catch (error) {
    console.error('Error saving persona to localStorage:', error);
  }
};

// Helper function to extract section content while preserving markdown
export const extractSection = (lines: string[], sectionName: string) => {
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
