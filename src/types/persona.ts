
export interface Persona {
  id: string;
  name: string;
  purpose: string;
  role: string;
  lifestyle: string;
  goals: string;
  challenges: string;
  motivation: string;
  techComfort: string;
  personalTouch: string;
  createdAt: Date;
}

export interface ConversationStep {
  id: string;
  title: string;
  aiMessage: string;
  inputType: 'input' | 'textarea';
  placeholder: string;
}
