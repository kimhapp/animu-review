import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
  } from '@/components/ui/dropdown-menu';
  import { UserInfo } from '@/components/user-info';
  import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
  import { type User } from '@/types';
  import { Link, router } from '@inertiajs/react';
  import { LogOut, Settings, Star, LayoutDashboard } from 'lucide-react';
  
  interface UserMenuContentProps {
    user: User;
  }
  
  export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
  
    const handleLogout = () => {
      cleanup();
      router.flushAll();
    };
  
    return (
      <>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo user={user} showEmail={true} />
          </div>
        </DropdownMenuLabel>
  
        <DropdownMenuSeparator />
  
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link className="block w-full" href={route('profile')} as="button" prefetch onClick={cleanup}>
              <Settings className="mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
  
          {(user.role === 'reviewer' || user.role === 'admin') && (
            <DropdownMenuItem asChild>
              <Link className="block w-full" href={route('review.create')} as="button" prefetch onClick={cleanup}>
                <Star className="mr-2" />
                Add Review
              </Link>
            </DropdownMenuItem>
          )}
  
          {user.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link className="block w-full" href={route('admin.dashboard')} as="button" prefetch onClick={cleanup}>
                <LayoutDashboard className="mr-2" />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
  
        <DropdownMenuSeparator />
  
        <DropdownMenuItem asChild>
          <Link
            className="block w-full"
            method="post"
            href={route('logout')}
            as="button"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" />
            Log out
          </Link>
        </DropdownMenuItem>
      </>
    );
  }
