import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users ,Film} from 'lucide-react';
import { route } from 'ziggy-js'; // 👈 Import Ziggy route helper
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'), // 👈 Use named route
        icon: LayoutGrid,
    },
    {
        title: 'Reviewers',
        href: route('admin.reviewer'),
        icon: Users,
    },
    {
        title: 'Genres',
        href: route('admin.genre'),
        icon: BookOpen,
    },
    {
        title: 'Categories',
        href: route('admin.category'),
        icon: Folder,
    },
    {
        title: 'Animes',
        href: route('admin.anime'),
        icon: Film,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton variant="plain" isActive={false} size="lg" asChild>
                            <Link href={route('home.index')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
