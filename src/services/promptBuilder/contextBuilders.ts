
import { Persona } from '@/types/persona';

export const buildConversationContext = (conversationHistory: any[], userPrompt: string): string => {
  if (conversationHistory.length === 0) {
    return '';
  }

  return `
CONVERSATION HISTORY:
${conversationHistory.map(msg => `${msg.type.toUpperCase()}: ${msg.content}`).join('\n')}

CURRENT REQUEST:
USER: ${userPrompt}

Please consider the above conversation history when generating the component. Build upon previous requests and maintain consistency with what was discussed before.

`;
};

export const buildCurrentCodeContext = (generatedCode: string): string => {
  if (!generatedCode.trim()) {
    return '';
  }

  return `
CURRENT GENERATED CODE:
The following is the last code you generated. Please build upon this code and modify it according to the new request while maintaining existing functionality:

\`\`\`javascript
${generatedCode}
\`\`\`

MODIFICATION INSTRUCTIONS:
- Modify the existing GeneratedApp function above to incorporate the new request
- Keep all existing functionality that is not being changed
- Only update the parts that are specifically requested by the user
- Ensure the component still works correctly after modifications

`;
};

export const buildPersonaContext = (persona?: Persona | null): string => {
  if (!persona) {
    return '';
  }

  return `
PERSONA-CENTERED DESIGN:
You are designing for ${persona.name}: ${persona.purpose}

Key Persona Insights:
- Role: ${persona.role}
- Tech Comfort: ${persona.techComfort}
- Goals: ${persona.goals}
- Challenges: ${persona.challenges}
- Motivation: ${persona.motivation}

DESIGN FOR THIS PERSONA:
- Match the UI complexity to their tech comfort level
- Structure the interface to support their primary goals
- Minimize friction around their main challenges
- Use interaction patterns that align with their motivation style
- Choose appropriate information density and visual hierarchy

`;
};

export const buildDesignGuidelines = (augmentedPrompt: string, persona?: Persona | null): string => {
  const personaNote = persona ? `
- PERSONA-SPECIFIC: Design for ${persona.name}'s tech comfort level and workflow preferences` : '';

  return `${augmentedPrompt}

DESIGN GUIDELINES:
- Create visually stunning, modern applications with rich interactions
- Use gradients, shadows, animations, and visual effects for maximum impact
- Implement responsive layouts with beautiful card-based designs
- Use vibrant color schemes with #0091DF (blue), #66B512 (green), and #D30F4B (red)
- Add hover effects, transitions, and micro-interactions
- Include loading states, success states, and engaging visual feedback
- Create rich data visualizations and interactive elements
- Use proper spacing, typography, and visual hierarchy
- Ensure accessibility with ARIA labels and semantic HTML${personaNote}`;
};
