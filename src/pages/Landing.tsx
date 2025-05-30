import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Map, 
  Lightbulb, 
  Code, 
  ArrowRight, 
  Users, 
  Briefcase, 
  BarChart3, 
  Palette,
  Brain,
  Sparkles,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      icon: Target,
      title: "Problem Framing",
      description: "Reframe business requests into real user needs",
      color: "text-brand-blue"
    },
    {
      icon: Map,
      title: "Journey Mapping",
      description: "Visualize how users experience your product",
      color: "text-brand-green"
    },
    {
      icon: Lightbulb,
      title: "Concept Generation",
      description: "Generate A/B concepts with your design system",
      color: "text-brand-red"
    },
    {
      icon: Code,
      title: "Code Generation",
      description: "Transform designs into clean, scalable front-end code",
      color: "text-brand-blue"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Enter an idea or feature request",
      description: "Share your vision, business requirement, or user story with our AI assistant."
    },
    {
      number: "02",
      title: "Collaborate with AI to define the solution",
      description: "Work through problem framing, user journeys, and concept generation together."
    },
    {
      number: "03",
      title: "Export flows, wireframes, and code",
      description: "Get production-ready deliverables including user stories and front-end code."
    }
  ];

  const personas = [
    {
      icon: Briefcase,
      title: "Product Managers",
      description: "Turn requirements into user-centered solutions"
    },
    {
      icon: Users,
      title: "Marketing Teams",
      description: "Create compelling user experiences for campaigns"
    },
    {
      icon: BarChart3,
      title: "Business Strategists",
      description: "Validate ideas with structured design thinking"
    },
    {
      icon: Palette,
      title: "Designers",
      description: "Streamline workflows with AI-powered assistance"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-roboto">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-8 h-8 text-brand-blue" />
                <Sparkles className="w-4 h-4 text-brand-green absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Design Agent</h1>
                <p className="text-xs text-gray-600">AI-Powered Design Platform</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-brand-blue transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-brand-blue transition-colors">How it Works</a>
              <a href="#use-cases" className="text-gray-600 hover:text-brand-blue transition-colors">Use Cases</a>
              <Link to="/design-to-code">
                <Button variant="outline" className="mr-2">
                  Try Demo
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="outline" className="text-brand-blue border-brand-blue/20 bg-brand-blue/5">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Design
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Design Smarter.{" "}
                  <span className="text-brand-blue">Collaborate</span>{" "}
                  Better.
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  AI-powered guidance for turning your ideas into intuitive, user-centered digital experiences.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-lg">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-500">
                      Design Agent - Problem Framing
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-brand-blue/10 rounded-lg p-4">
                      <p className="text-sm text-brand-blue font-medium">AI Assistant</p>
                      <p className="text-gray-700 mt-1">Let's reframe your feature request. What specific user problem are we solving?</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">You</p>
                      <p className="text-gray-700 mt-1">We need a better dashboard for our analytics platform...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to design better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From initial idea to production-ready code, our AI guides you through every step of the design process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process takes you from idea to implementation.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-brand-blue to-brand-green rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-brand-blue to-brand-green opacity-30"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by teams everywhere
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From product managers to designers, see how different roles benefit from AI-powered design guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {personas.map((persona, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform duration-300">
                    <persona.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{persona.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{persona.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-green">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your design process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using AI to create better user experiences.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-50 px-8 py-6 text-lg font-semibold">
              Start Designing with AI
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8 text-brand-blue" />
                <span className="text-xl font-bold">Design Agent</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                AI-powered guidance for turning your ideas into intuitive, user-centered digital experiences.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                <li><Link to="/design-to-code" className="text-gray-400 hover:text-white transition-colors">Design to Code</Link></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Modules</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Design Agent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
