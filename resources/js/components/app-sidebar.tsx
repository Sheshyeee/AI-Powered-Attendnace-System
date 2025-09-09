import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: any; can: { manageDepartments: boolean; manageOwnDepartment: boolean, employees: boolean } } }>().props;

    const mainNavItems: NavItem[] = [
        ...(auth.can.manageDepartments
            ? [
                  {
                      title: 'Dashboard',
                      href: dashboard(),
                      icon: LayoutGrid,
                  },
              ]
            : []),
        ...(auth.can.manageDepartments
            ? [
                  {
                      title: 'Departments',
                      href: '/departments',
                      icon: LayoutGrid,
                  },
              ]
            : []),
        ...(auth.can.manageOwnDepartment
            ? [
                  {
                      title: 'Dashboard',
                      href: '/manager/employees',
                      icon: LayoutGrid,
                  },
              ]
            : []),
        ...(auth.can.manageOwnDepartment
            ? [
                  {
                      title: 'Employees',
                      href: '/manager/table/view',
                      icon: LayoutGrid,
                  },
              ]
            : []),
        ...(auth.can.employees
            ? [
                  {
                      title: 'Dashboard',
                      href: '/employees/dashboard',
                      icon: LayoutGrid,
                  },
              ]
            : []),
    ];

    const footerNavItems: NavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
