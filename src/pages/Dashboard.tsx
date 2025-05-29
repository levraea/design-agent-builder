
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Map, 
  Lightbulb, 
  Network, 
  FileText, 
  Shield, 
  Search, 
  BarChart3, 
  Database, 
  Users, 
  Palette, 
  GraduationCap,
  User,
  Code,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2
} from 'lucide-react';

const Dashboard = () => {
  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Mobile App",
      lastEdited: "2 hours ago",
      progress: 75,
      currentPhase: "Concept Generation"
    },
    {
      id: 2,
      name: "Healthcare Dashboard",
      lastEdited: "1 day ago",
      progress: 45,
      currentPhase: "Journey Mapping"
    },
    {
      id: 3,
      name: "SaaS Landing Page",
      lastEdited: "3 days ago",
      progress: 90,
      currentPhase: "User Stories"
    }
  ];

  const designPhases = [
    { name: "Problem Framing", completed: true, current: false },
    { name: "Journey Mapping", completed: true, current: false },
    { name: "Concept Generation", completed: false, current: true },
    { name: "Information Architecture", completed: false, current: false },
    { name: "User Stories & Dev Handoff", completed: false, current: false }
  ];

  const modules = [
    {
      title: "Problem Framing",
      description: "Translate vague ideas and outputs into clear outcomes",
      icon: Target,
      path: "/problem-framing",
      color: "from-purple-50 to-purple-100"
    },
    {
      title: "Personas",
      description: "Define detailed user personas based on research",
      icon: User,
      path: "/personas",
      color: "from-blue-50 to-blue-100"
    },
    {
      title: "Journey Mapping",
      description: "Map user flows and identify key touchpoints",
      icon: Map,
      path: "/journey-mapping",
      color: "from-green-50 to-green-100"
    },
    {
      title: "Concept Generation",
      description: "Generate design variants using your design system",
      icon: Lightbulb,
      path: "/concept-generation",
      color: "from-yellow-50 to-yellow-100"
    },
    {
      title: "Information Architecture",
      description: "Structure app flows and navigation patterns",
      icon: Network,
      path: "/information-architecture",
      color: "from-indigo-50 to-indigo-100"
    },
    {
      title: "Design-to-Code",
      description: "Generate front-end code from your designs",
      icon: Code,
      path: "/design-to-code",
      color: "from-pink-50 to-pink-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome to DesignAI</h1>
            <p className="text-gray-600 mt-1">Transform ideas into digital products with AI-powered design tools</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Projects & Process Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Projects */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">Recent Projects</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{project.name}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {project.lastEdited}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-3">
                        Continue
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-600">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <p className="text-xs text-purple-600 font-medium">{project.currentPhase}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Design Process Overview */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">Design Process</CardTitle>
                <CardDescription>Track your progress through key phases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {designPhases.map((phase, index) => (
                  <div key={phase.name} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      phase.completed 
                        ? 'bg-green-100 text-green-600' 
                        : phase.current 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {phase.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        phase.completed || phase.current ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {phase.name}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Design Modules Grid */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Design Modules</h2>
              <p className="text-gray-600">Choose a module to begin your design process</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => (
                <Card key={module.title} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-4`}>
                      <module.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{module.description}</p>
                      </div>
                      <Link to={module.path}>
                        <Button 
                          variant="outline" 
                          className="w-full justify-between border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                        >
                          Begin
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
