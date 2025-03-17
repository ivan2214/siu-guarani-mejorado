import { AppSidebar } from "@/components/app-sidebar";
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
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="w-full flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>

        <SonnerProvider />
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
