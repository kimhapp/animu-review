import { route } from 'ziggy-js';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid, Users ,Film} from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard', undefined, false, Ziggy),
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
        icon: Film, // You can also use Tv or Video if preferred
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
