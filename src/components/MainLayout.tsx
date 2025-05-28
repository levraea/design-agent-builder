
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
      <ResizablePanelGroup direction="horizontal" className="min-h-screen flex w-full">
        <ResizablePanel defaultSize={25} minSize={15} maxSize={50}>
          <AppSidebar completedModules={completedModules} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <SidebarInset className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {children}
            </div>
          </SidebarInset>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
}
