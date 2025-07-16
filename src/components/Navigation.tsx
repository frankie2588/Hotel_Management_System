import { useState } from 'react';
import { Menu, X, Hotel, User, Calendar, Settings, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: 'admin' | 'receptionist' | 'customer' | 'guest';
}

export default function Navigation({ currentView, onViewChange, userRole }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Hotel, roles: ['admin', 'receptionist', 'customer', 'guest'] },
    { id: 'rooms', label: 'Rooms', icon: Calendar, roles: ['admin', 'receptionist', 'customer', 'guest'] },
    { id: 'bookings', label: 'Bookings', icon: Calendar, roles: ['admin', 'receptionist', 'customer'] },
    { id: 'customers', label: 'Customers', icon: Users, roles: ['admin', 'receptionist'] },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, roles: ['admin', 'receptionist'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  const filteredItems = navigationItems.filter(item => item.roles.includes(userRole));

  return (
    <nav className="navbar-glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Hotel className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">LuxeStay</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                    currentView === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-muted-foreground capitalize">{userRole}</span>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-smooth"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium w-full text-left transition-smooth",
                      currentView === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 pb-3 border-t border-border">
                <div className="flex items-center px-3">
                  <User className="h-8 w-8 text-muted-foreground" />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-primary">Profile</div>
                    <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}