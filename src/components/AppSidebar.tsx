
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  Sparkles,
  User,
  LayoutDashboard
} from 'lucide-react';

const modules = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Your design workspace overview"
  },
  {
    title: "Problem Framing",
    url: "/problem-framing",
    icon: Target,
    description: "Reframe ideas as outcomes"
  },
  {
    title: "Personas",
    url: "/personas",
    icon: User,
    description: "Define target user personas"
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

  return (
    <TooltipProvider>
      <Sidebar>
        <SidebarHeader className="p-4 bg-gradient-to-r from-brand-blue/5 to-brand-green/5">
          <Link to="/" className="block">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 hover:text-brand-blue transition-colors cursor-pointer">
              <div className="relative">
                <Brain className="w-6 h-6 text-brand-blue" />
                <Sparkles className="w-3 h-3 text-brand-green absolute -top-0.5 -right-0.5 animate-pulse" />
              </div>
              <span>Design Agent</span>
            </h2>
            <p className="text-sm text-gray-600">Turn ideas into digital products</p>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-brand-blue font-medium">Core Modules</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {modules.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                          <Link to={item.url} className="flex items-center space-x-3 py-3 hover:bg-brand-blue/5 transition-colors">
                            <div className="flex-shrink-0">
                              <item.icon className={`w-4 h-4 ${location.pathname === item.url ? 'text-brand-blue' : 'text-gray-600'}`} />
                            </div>
                            <span className={`text-sm font-medium truncate ${location.pathname === item.url ? 'text-brand-blue' : 'text-gray-700'}`}>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-brand-blue text-white">
                        <p>{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  )
}
