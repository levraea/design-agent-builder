
import { Brain, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-brand-blue" />
              <Sparkles className="w-4 h-4 text-brand-red absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Design Agent
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Application Builder</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
              <span>AI Model Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
