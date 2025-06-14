import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header'; // <- make sure this exists
import { type BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';

interface AdminLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export default function AdminLayout({
  children,
  breadcrumbs,
  className,
}: PropsWithChildren<AdminLayoutProps>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <AppSidebar />

        {/* Right content area */}
        <div className="flex flex-1 flex-col">
          {/* Top Header */}
          <AppHeader />

          {/* Main Content */}
          <main className={cn('flex-1 p-6 md:p-8', className)}>
            {/* Optional: Breadcrumbs */}
            {breadcrumbs?.length && (
              <nav className="mb-4 text-sm text-muted-foreground">
                {breadcrumbs.map((crumb, idx) => (
                  <span key={idx}>
                    <a href={crumb.href} className="text-primary hover:underline">
                      {crumb.title}
                    </a>
                    {idx < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                  </span>
                ))}
              </nav>
            )}

            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
