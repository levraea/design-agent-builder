
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  completedModules?: string[];
}

export function MainLayout({ children, completedModules = [] }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar completedModules={completedModules} />
        <SidebarInset className="flex-1">
          <div className="flex h-14 items-center px-4 border-b">
            <SidebarTrigger className="mr-2" />
          </div>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
