"use client";

import {} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { NavMainItem } from "@/types";
import Link from "next/link";

export function NavMain({ items }: { items: NavMainItem[] }) {
  return (
    <SidebarGroup className="h-full">
      <SidebarGroupLabel>Links principales</SidebarGroupLabel>
      <SidebarGroupContent className="h-full bg-red-500">
        <SidebarMenu className="h-full bg-red-500">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <Link
                  className={cn(
                    !item.isActive && "text-muted-foreground",
                    "w-full"
                  )}
                  href={item.url}
                >
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
