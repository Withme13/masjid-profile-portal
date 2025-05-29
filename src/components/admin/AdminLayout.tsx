
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  CalendarDays, 
  Image, 
  MessageCircle, 
  LogOut, 
  MenuIcon, 
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate('/admin/login');
  };

  const navigationItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/admin/profiles', icon: <Users size={18} />, label: 'Profiles' },
    { to: '/admin/facilities', icon: <Building size={18} />, label: 'Facilities' },
    { to: '/admin/activities', icon: <CalendarDays size={18} />, label: 'Activities' },
    { to: '/admin/media', icon: <Image size={18} />, label: 'Media' },
    { to: '/admin/messages', icon: <MessageCircle size={18} />, label: 'Messages' },
    { to: '/admin/registrations', icon: <ClipboardList size={18} />, label: 'Registrations' }
  ];

  const NavContent = () => (
    <>
      <div className="space-y-1">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>
    </>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background h-screen sticky top-0">
        <div className="flex flex-col h-full py-4 justify-between">
          <NavContent />
        </div>
      </aside>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full py-4 justify-between">
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
        <div className="font-semibold">Admin Panel</div>
      </div>
      
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
