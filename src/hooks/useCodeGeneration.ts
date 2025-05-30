
import { useState } from 'react';
import { analyzePromptForAPIs } from '@/utils/promptAnalyzer';
import { parseAIResponse } from '@/utils/aiResponseParser';
import { generateSampleCode, buildPrompt } from '@/services/codeGenerationService';
import { callGeminiAPI } from '@/services/geminiApiService';
import { useConversationHistory } from '@/hooks/useConversationHistory';

export const useCodeGeneration = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { conversationHistory, addToConversationHistory } = useConversationHistory();

  const handleGenerateApp = async (
    userPrompt: string, 
    selectedAPIs: string[], 
    selectedComponents: string[],
    onModuleComplete?: (moduleUrl: string) => void
  ) => {
    setIsGenerating(true);
    
    // Add user prompt to conversation history
    addToConversationHistory('user', userPrompt);
    
    try {
      // Get selected API details from mockAPIs
      const { mockAPIs } = await import('@/data/mockAPIs');
      
      // Use intelligent API selection if none are explicitly selected
      let apisToUse: string[];
      if (selectedAPIs.length > 0) {
        apisToUse = selectedAPIs;
        console.log('Using explicitly selected APIs:', apisToUse);
      } else {
        apisToUse = analyzePromptForAPIs(userPrompt, mockAPIs);
        console.log('Using AI-inferred APIs based on prompt:', apisToUse);
      }
      
      const selectedAPIDetails = mockAPIs.filter(api => apisToUse.includes(api.id));
      
      // Augment the prompt with API information and design requirements
      let augmentedPrompt = userPrompt;
      
      if (selectedAPIDetails.length > 0) {
        const apiContext = selectedAPIDetails.map(api => 
          `- ${api.name} (${api.link}): ${api.description}. Auth: ${api.auth}, HTTPS: ${api.https}, CORS: ${api.cors}`
        ).join('\n');
        
        const apiSelectionNote = selectedAPIs.length === 0 
          ? '\nNOTE: Based on your prompt, these relevant APIs were automatically selected:'
          : '\nIMPORTANT: Use the following selected APIs in your implementation:';
        
        augmentedPrompt = `${userPrompt}${apiSelectionNote}
${apiContext}

Make sure to integrate these APIs into the generated component to fetch and display relevant data.`;
      }

      // Add comprehensive design requirements to the prompt
      augmentedPrompt = `${augmentedPrompt}

DESIGN GUIDELINES:
- Create visually stunning, modern applications with rich interactions
- Use gradients, shadows, animations, and visual effects for maximum impact
- Implement responsive layouts with beautiful card-based designs
- Use vibrant color schemes with #0091DF (blue), #66B512 (green), and #D30F4B (red)
- Add hover effects, transitions, and micro-interactions
- Include loading states, success states, and engaging visual feedback
- Create rich data visualizations and interactive elements
- Use proper spacing, typography, and visual hierarchy
- Ensure accessibility with ARIA labels and semantic HTML`;

      const fullPrompt = buildPrompt(userPrompt, selectedAPIDetails, selectedAPIs, conversationHistory, generatedCode, augmentedPrompt);

      // Log the complete prompt that will be sent to the AI
      console.log('=== FULL PROMPT SENT TO GEMINI API ===');
      console.log(fullPrompt);
      console.log('=== END OF PROMPT ===');

      const rawResponse = await callGeminiAPI(fullPrompt);
      
      // Parse the AI response to extract description and code
      const { description, code } = parseAIResponse(rawResponse);
      
      setGeneratedCode(code);
      
      // Add AI response to conversation history using the extracted description
      addToConversationHistory('ai', description);
      
      // Mark the Design-to-Code Generation module as complete
      if (onModuleComplete) {
        onModuleComplete('/design-to-code');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      // Use the actual APIs (selected or inferred) for fallback code
      const { mockAPIs } = await import('@/data/mockAPIs');
      const apisToUse = selectedAPIs.length > 0 ? selectedAPIs : analyzePromptForAPIs(userPrompt, mockAPIs);
      const fallbackCode = generateSampleCode(userPrompt, apisToUse, selectedComponents, error.message);
      setGeneratedCode(fallbackCode);
      
      // Add AI response to conversation history for fallback
      addToConversationHistory('ai', `I encountered an API error: ${error.message}. I've generated a fallback React component instead that demonstrates the basic structure of what you requested.`);
      
      // Still mark as complete even with fallback
      if (onModuleComplete) {
        onModuleComplete('/design-to-code');
      }
    }
    
    setIsGenerating(false);
  };

  return {
    generatedCode,
    isGenerating,
    conversationHistory,
    handleGenerateApp,
    addToConversationHistory
  };
};
