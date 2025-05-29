
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Target, Heart, Lightbulb, Smartphone, Quote } from 'lucide-react';
import { PromptInput } from '@/components/PromptInput';
import { ConversationHistory } from '@/components/ConversationHistory';
import { ConversationMessage } from '@/types/conversation';

export const PersonaModule = () => {
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setShowIntro(false);

    // Add user message to conversation
    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setConversationHistory(prev => [...prev, userMessage]);

    // Simulate AI response (replace with actual AI call)
    setTimeout(() => {
      const aiMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'll help you create a detailed user persona. Based on your input: "${prompt}", let me start building a comprehensive persona profile.

**Understanding Your Request:**
I see you want to create a persona for this context. Let me guide you through creating a research-based persona that will help with empathy building and user-centered design decisions.

**Persona Framework:**
I'll use empathy mapping and behavioral analysis to create a realistic persona. What specific aspects would you like me to focus on first?

- Demographics and background
- Goals and motivations  
- Pain points and challenges
- Technology comfort level
- Daily behaviors and habits

Would you like me to start with a specific persona archetype, or do you have particular user research data I should consider?`,
        timestamp: new Date(),
      };
      
      setConversationHistory(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/5 via-brand-green/5 to-brand-red/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-8 h-8 text-brand-blue" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Persona Creation Module
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Create detailed user personas to build empathy, inform product decisions, and ensure user-centered design
            </p>
          </div>

          {showIntro && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-brand-blue/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-brand-blue">
                      <Target className="w-5 h-5" />
                      <span>Purpose</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Build empathy for your target users and inform design decisions</p>
                  </CardContent>
                </Card>

                <Card className="border-brand-green/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-brand-green">
                      <Heart className="w-5 h-5" />
                      <span>Process</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">AI-powered conversation to create research-based personas</p>
                  </CardContent>
                </Card>

                <Card className="border-brand-red/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-brand-red">
                      <Lightbulb className="w-5 h-5" />
                      <span>Output</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Empathy map, persona card, and actionable insights</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
                <CardContent className="text-center py-12">
                  <User className="w-16 h-16 text-brand-blue mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">AI-Powered Persona Creation</h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Describe your project, target audience, or specific persona requirements. I'll guide you through 
                    creating a detailed, research-based persona using empathy mapping and behavioral frameworks.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-brand-blue" />
                        <span>What We'll Cover:</span>
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Background and demographics</li>
                        <li>• Goals and motivations</li>
                        <li>• Pain points and challenges</li>
                        <li>• Technology comfort level</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                        <Quote className="w-4 h-4 text-brand-green" />
                        <span>You'll Get:</span>
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Detailed persona profile</li>
                        <li>• Empathy map visualization</li>
                        <li>• Behavioral insights</li>
                        <li>• Actionable design recommendations</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Conversation History */}
          {conversationHistory.length > 0 && (
            <div className="mb-6">
              <ConversationHistory messages={conversationHistory} />
            </div>
          )}

          {/* Prompt Input */}
          <PromptInput 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            conversationHistory={conversationHistory}
          />
        </div>
      </div>
    </div>
  );
};
