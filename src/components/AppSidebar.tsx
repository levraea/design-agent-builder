
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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  LayoutDashboard,
  FolderOpen
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

// Mock project data - in a real app this would come from your data store
const projects = [
  { id: "1", name: "E-commerce Redesign", lastEdited: "2024-05-28" },
  { id: "2", name: "Mobile Banking App", lastEdited: "2024-05-27" },
  { id: "3", name: "SaaS Dashboard", lastEdited: "2024-05-26" },
  { id: "4", name: "Healthcare Portal", lastEdited: "2024-05-25" },
];

interface AppSidebarProps {
  completedModules?: string[];
}

export function AppSidebar({ completedModules = [] }: AppSidebarProps) {
  const location = useLocation();

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 bg-gradient-to-r from-brand-blue/5 to-brand-green/5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-1 group-data-[collapsible=icon]:hidden">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 hover:text-brand-blue transition-colors cursor-pointer">
                <div className="relative">
                  <Brain className="w-6 h-6 text-brand-blue" />
                  <Sparkles className="w-3 h-3 text-brand-green absolute -top-0.5 -right-0.5 animate-pulse" />
                </div>
                <span>Design Agent</span>
              </h2>
              <p className="text-sm text-gray-600">Turn ideas into digital products</p>
            </Link>
            <div className="group-data-[collapsible=icon]:mx-auto">
              <SidebarTrigger className="ml-2 group-data-[collapsible=icon]:ml-0" />
            </div>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <Brain className="w-8 h-8 text-brand-blue mx-auto" />
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          {/* Project Context Dropdown - hidden when collapsed */}
          <div className="px-4 py-3 border-b border-gray-200 group-data-[collapsible=icon]:hidden">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Current Project</label>
            <Select defaultValue="1">
              <SelectTrigger className="w-full h-9 text-sm">
                <div className="flex items-center space-x-2">
                  <FolderOpen className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Select project..." />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id} className="text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-xs text-gray-500">Last edited: {project.lastEdited}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
