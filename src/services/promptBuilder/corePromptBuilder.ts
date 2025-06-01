
import { Persona } from '@/types/persona';
import { buildConversationContext, buildCurrentCodeContext, buildPersonaContext, buildDesignGuidelines } from './contextBuilders';
import { CRITICAL_SYNTAX_RULES, API_USAGE_EXAMPLES, ROBUST_API_HANDLING } from './syntaxRules';
import { SANDPACK_REQUIREMENTS, AVAILABLE_COMPONENTS, RECHARTS_USAGE, RETURN_FORMAT_INSTRUCTIONS, EXAMPLE_FORMAT } from './templateConstants';

export const buildPrompt = (
  userPrompt: string,
  selectedAPIDetails: any[],
  selectedAPIs: string[],
  conversationHistory: any[],
  generatedCode: string,
  augmentedPrompt: string,
  persona?: Persona | null
): string => {
  // Build all context sections
  const conversationContext = buildConversationContext(conversationHistory, userPrompt);
  const currentCodeContext = buildCurrentCodeContext(generatedCode);
  const personaContext = buildPersonaContext(persona);
  const finalAugmentedPrompt = buildDesignGuidelines(augmentedPrompt, persona);

  const conversationHistoryNote = conversationContext ? 'Based on the conversation history above, ' : '';
  const personaNote = persona ? ` Make sure the design is tailored for ${persona.name}'s needs and preferences.` : '';

  return `You are a React component generator. Generate a complete React functional component using JSX syntax that works directly with Sandpack (CodeSandbox) environment.

${personaContext}${conversationContext}${currentCodeContext}

${SANDPACK_REQUIREMENTS}

${CRITICAL_SYNTAX_RULES}

${AVAILABLE_COMPONENTS}

${RETURN_FORMAT_INSTRUCTIONS}

${RECHARTS_USAGE}

${API_USAGE_EXAMPLES}

${ROBUST_API_HANDLING}

${EXAMPLE_FORMAT}

${conversationHistoryNote}User prompt: ${finalAugmentedPrompt}

REMEMBER: Return ONLY in the DESCRIPTION/CODE format shown above. The description should be conversational and explain what you built. USE JSX SYNTAX, NOT React.createElement(). ALWAYS use enhancedFetch for external API calls. NO EXTERNAL UI LIBRARIES - use only HTML elements with Tailwind CSS. CRITICAL: Use string concatenation instead of template literals for better Sandpack compatibility. Follow all CRITICAL SYNTAX RULES above.${personaNote}`;
};
