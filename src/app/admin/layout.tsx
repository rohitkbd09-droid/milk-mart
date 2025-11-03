import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Package } from "lucide-react";

const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/admin/orders", label: "Orders", icon: <ShoppingCart /> },
    { href: "/admin/products", label: "Products", icon: <Package /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <div className="flex min-h-screen">
            <Sidebar>
                <SidebarHeader>
                    <Link href="/admin" className="flex items-center gap-2">
                        <Logo className="w-6 h-6 text-primary" />
                        <span className="font-bold text-lg font-headline">MilkRoute Admin</span>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {adminNavItems.map(item => (
                            <SidebarMenuItem key={item.label}>
                                <SidebarMenuButton asChild variant="ghost" className="w-full justify-start">
                                    <Link href={item.href}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <div className="flex-1 p-4 md:p-8">
                {children}
            </div>
        </div>
    </SidebarProvider>
  );
}
