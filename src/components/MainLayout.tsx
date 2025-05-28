
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  completedModules?: string[];
}

export function MainLayout({ children, completedModules = [] }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
        <ResizablePanel defaultSize={25} minSize={15} maxSize={50} className="min-w-0">
          <AppSidebar completedModules={completedModules} />
        </ResizablePanel>
        <ResizableHandle withHandle className="w-1 bg-border hover:bg-accent transition-colors" />
        <ResizablePanel defaultSize={75} className="min-w-0">
          <SidebarInset className="w-full h-full">
            <div className="flex h-14 items-center px-4 border-b">
              <SidebarTrigger className="mr-2" />
            </div>
            <div className="p-4 h-[calc(100vh-3.5rem)] overflow-auto">
              {children}
            </div>
          </SidebarInset>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
}
