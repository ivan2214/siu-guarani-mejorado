import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SonnerProvider } from "@/components/sonner-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import type { ReactNode } from "react";
interface DashboardLayoutFormProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardLayout: React.FC<DashboardLayoutFormProps> = ({ children }) => {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <main className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <section className="w-full flex-1 p-4 md:p-6">{children}</section>
          </SidebarInset>
        </main>

        <SonnerProvider />
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
