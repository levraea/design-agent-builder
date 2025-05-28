
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Checkbox } from "@/components/ui/checkbox"
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
  Code,
  Brain,
  Sparkles
} from 'lucide-react';

const modules = [
  {
    title: "Problem Framing",
    url: "/problem-framing",
    icon: Target,
    description: "Reframe ideas as outcomes"
  },
  {
    title: "Journey Mapping",
    url: "/journey-mapping",
    icon: Map,
    description: "Map user flows and touchpoints"
  },
  {
    title: "Concept Generation",
    url: "/concept-generation",
    icon: Lightbulb,
    description: "Generate design variants"
  },
  {
    title: "Information Architecture",
    url: "/information-architecture",
    icon: Network,
    description: "Structure and flows"
  },
  {
    title: "User Stories & Dev Handoff",
    url: "/user-stories",
    icon: FileText,
    description: "Dev-ready stories"
  },
  {
    title: "Accessibility Module",
    url: "/accessibility",
    icon: Shield,
    description: "WCAG compliance checks"
  },
  {
    title: "SEO Optimization",
    url: "/seo",
    icon: Search,
    description: "Metadata and structure"
  },
  {
    title: "Testing & Metrics",
    url: "/testing-metrics",
    icon: BarChart3,
    description: "Testing scenarios and KPIs"
  },
  {
    title: "Research Repository",
    url: "/research",
    icon: Database,
    description: "Past research insights"
  },
  {
    title: "User Recruiting",
    url: "/user-recruiting",
    icon: Users,
    description: "Target user outreach"
  },
  {
    title: "Design System",
    url: "/design-system",
    icon: Palette,
    description: "Component validation"
  },
  {
    title: "Designer Onboarding",
    url: "/onboarding",
    icon: GraduationCap,
    description: "Training and resources"
  },
  {
    title: "Design-to-Code Generation",
    url: "/design-to-code",
    icon: Code,
    description: "Generate front-end code"
  },
];

interface AppSidebarProps {
  completedModules?: string[];
}

export function AppSidebar({ completedModules = [] }: AppSidebarProps) {
  const location = useLocation();

  const isModuleCompleted = (moduleUrl: string) => {
    return completedModules.includes(moduleUrl);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <div className="relative">
            <Brain className="w-6 h-6 text-blue-600" />
            <Sparkles className="w-3 h-3 text-purple-500 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
          <span>Design Agent</span>
        </h2>
        <p className="text-sm text-gray-600">Turn ideas into digital products</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center space-x-3">
                      <Checkbox 
                        checked={isModuleCompleted(item.url)}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        readOnly
                      />
                      <item.icon className="w-4 h-4" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-gray-500">{item.description}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
