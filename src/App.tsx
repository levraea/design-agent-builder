
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DesignToCode from "./pages/DesignToCode";
import { ModulePlaceholder } from "./pages/ModulePlaceholder";
import NotFound from "./pages/NotFound";
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
  User
} from 'lucide-react';
import { PersonaModule } from "./pages/PersonaModule";

const queryClient = new QueryClient();

const modules = [
  {
    path: "/problem-framing",
    title: "Problem Framing",
    description: "Reframe outputs as outcomes, identify user needs",
    icon: Target,
    input: "Feature idea or business request",
    aiFunction: "Reframe outputs as outcomes, identify user needs",
    output: "Clear problem statement and desired outcome"
  },
  {
    path: "/personas",
    title: "Personas",
    description: "Create detailed user personas based on research and data",
    icon: User,
    input: "User research data and business goals",
    aiFunction: "Generate detailed user personas with demographics, goals, and pain points",
    output: "Comprehensive persona profiles with scenarios"
  },
  {
    path: "/journey-mapping",
    title: "Journey Mapping",
    description: "Place feature in full user flow, find entry and exit points",
    icon: Map,
    input: "Feature or scenario",
    aiFunction: "Place feature in full user flow, find entry and exit points",
    output: "Journey map or contextual usage view"
  },
  {
    path: "/concept-generation",
    title: "Concept Generation",
    description: "Generate A/B design variants using a design system and brand font",
    icon: Lightbulb,
    input: "Framed problem",
    aiFunction: "Generate A/B design variants using a design system and brand font",
    output: "Low- to mid-fidelity UI concepts"
  },
  {
    path: "/information-architecture",
    title: "Information Architecture & Flows",
    description: "Generate app/site structure and key flows",
    icon: Network,
    input: "Approved concepts",
    aiFunction: "Generate app/site structure and key flows",
    output: "IA diagrams, user flow maps"
  },
  {
    path: "/user-stories",
    title: "User Stories & Dev Handoff",
    description: "Convert to user stories, reference components, and brand font",
    icon: FileText,
    input: "Final design concept",
    aiFunction: "Convert to user stories, reference components, and brand font",
    output: "Dev-ready stories, acceptance criteria, annotated flows"
  },
  {
    path: "/accessibility",
    title: "Accessibility Module",
    description: "Run WCAG checks, suggest fixes, apply updates if allowed",
    icon: Shield,
    input: "Design components",
    aiFunction: "Run WCAG checks, suggest fixes, apply updates if allowed",
    output: "Accessibility audit, fixed component suggestions"
  },
  {
    path: "/seo",
    title: "SEO Optimization",
    description: "Analyze metadata, page structure, and suggest improvements",
    icon: Search,
    input: "Web pages and content",
    aiFunction: "Analyze metadata, page structure, and suggest improvements",
    output: "SEO checklist, structured markup and keyword suggestions"
  },
  {
    path: "/testing-metrics",
    title: "Testing & Metrics",
    description: "Recommend user testing scenarios and success metrics",
    icon: BarChart3,
    input: "Product features",
    aiFunction: "Recommend user testing scenarios and success metrics",
    output: "Usability scripts, A/B ideas, experience KPIs"
  },
  {
    path: "/research",
    title: "Research Repository",
    description: "Upload and summarize past user research for reuse",
    icon: Database,
    input: "Research documents",
    aiFunction: "Upload and summarize past user research for reuse",
    output: "Linked insights, reusable findings and quotes"
  },
  {
    path: "/user-recruiting",
    title: "User Recruiting & Scheduling",
    description: "Define target users, generate outreach, sync scheduling",
    icon: Users,
    input: "Target user criteria",
    aiFunction: "Define target users, generate outreach, sync scheduling",
    output: "Screener, emails, calendar sync, consent forms"
  },
  {
    path: "/design-system",
    title: "Design System Contribution & Migration",
    description: "Validate proposed new components, flag duplicates, align tokens",
    icon: Palette,
    input: "Component proposals",
    aiFunction: "Validate proposed new components, flag duplicates, align tokens",
    output: "Contribution documentation, migration plan, changelog"
  },
  {
    path: "/onboarding",
    title: "Designer Onboarding & Training",
    description: "Build role-based onboarding plans and tool walkthroughs",
    icon: GraduationCap,
    input: "Role requirements",
    aiFunction: "Build role-based onboarding plans and tool walkthroughs",
    output: "Interactive learning path, training resources, task completion tracking"
  }
];

const App = () => {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const handleModuleComplete = (moduleUrl: string) => {
    setCompletedModules(prev => {
      if (!prev.includes(moduleUrl)) {
        return [...prev, moduleUrl];
      }
      return prev;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing page at root */}
            <Route path="/" element={<Landing />} />
            
            {/* Dashboard route with layout */}
            <Route path="/dashboard" element={
              <MainLayout completedModules={completedModules}>
                <Dashboard />
              </MainLayout>
            } />
            
            {/* Design tool routes with layout */}
            <Route path="/design-to-code" element={
              <MainLayout completedModules={completedModules}>
                <DesignToCode onModuleComplete={handleModuleComplete} />
              </MainLayout>
            } />

            {/* Personas module with custom component */}
            <Route path="/personas" element={
              <MainLayout completedModules={completedModules}>
                <PersonaModule />
              </MainLayout>
            } />
            
            {modules.filter(module => module.path !== "/personas").map((module) => (
              <Route 
                key={module.path}
                path={module.path} 
                element={
                  <MainLayout completedModules={completedModules}>
                    <ModulePlaceholder 
                      title={module.title}
                      description={module.description}
                      icon={module.icon}
                      input={module.input}
                      aiFunction={module.aiFunction}
                      output={module.output}
                    />
                  </MainLayout>
                } 
              />
            ))}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
