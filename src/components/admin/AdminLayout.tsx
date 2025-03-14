
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building, 
  Calendar, 
  Image, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  Home,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, isActive }) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
    )}
  >
    {icon}
    {label}
  </Link>
);

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home size={18} />, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: <Users size={18} />, label: 'Profile Management', href: '/admin/profiles' },
    { icon: <Building size={18} />, label: 'Facilities', href: '/admin/facilities' },
    { icon: <Calendar size={18} />, label: 'Activities', href: '/admin/activities' },
    { icon: <Image size={18} />, label: 'Media Center', href: '/admin/media' },
    { icon: <MessageSquare size={18} />, label: 'Contact Messages', href: '/admin/messages' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Mobile */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden",
          isSidebarOpen ? "block" : "hidden"
        )}
        onClick={closeSidebar}
      />
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform lg:static lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/10031/10031045.png" 
              alt="At_Tauhid Logo" 
              className="h-6 w-6" 
            />
            <span>At_Tauhid Admin</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto lg:hidden"
            onClick={closeSidebar}
          >
            <X size={18} />
          </Button>
        </div>
        
        <nav className="flex-1 overflow-auto py-4 px-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={location.pathname === item.href}
              />
            ))}
          </div>
        </nav>
        
        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </Button>
          
          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  Admin
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/')}>
                  View Website
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
