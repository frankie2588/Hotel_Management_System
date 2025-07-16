import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import RoomManagement from '@/components/RoomManagement';
import BookingSystem from '@/components/BookingSystem';
import AdminDashboard from '@/components/AdminDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { LogIn, UserPlus, Users, Settings, Mail, Phone, MapPin } from 'lucide-react';

type UserRole = 'admin' | 'receptionist' | 'customer' | 'guest';
type ViewType = 'home' | 'rooms' | 'bookings' | 'customers' | 'dashboard' | 'settings';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  joinDate: string;
}

export default function HotelManagement() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [customers, setCustomers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY',
      joinDate: '2023-12-01'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'customer',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Los Angeles, CA',
      joinDate: '2023-11-15'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael@example.com',
      role: 'customer',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Rd, Chicago, IL',
      joinDate: '2023-10-20'
    }
  ]);

  const handleLogin = (email: string, password: string) => {
    // Demo authentication - in real app, this would be proper authentication
    let role: UserRole = 'customer';
    let user: User;

    if (email === 'admin@luxestay.com') {
      role = 'admin';
      user = {
        id: 'admin',
        name: 'Admin User',
        email: 'admin@luxestay.com',
        role: 'admin',
        joinDate: '2023-01-01'
      };
    } else if (email === 'receptionist@luxestay.com') {
      role = 'receptionist';
      user = {
        id: 'receptionist',
        name: 'Receptionist User',
        email: 'receptionist@luxestay.com',
        role: 'receptionist',
        joinDate: '2023-01-01'
      };
    } else {
      user = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'customer',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY',
        joinDate: '2023-12-01'
      };
    }

    setUserRole(role);
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowAuthDialog(false);
    setCurrentView('dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'customer',
      joinDate: new Date().toISOString().split('T')[0]
    };

    setCustomers([...customers, newUser]);
    setCurrentUser(newUser);
    setUserRole('customer');
    setIsAuthenticated(true);
    setShowAuthDialog(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRole('guest');
    setCurrentView('home');
  };

  const handleBookNow = () => {
    setCurrentView('bookings');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HeroSection onBookNow={handleBookNow} />;
      case 'rooms':
        return <RoomManagement userRole={userRole} />;
      case 'bookings':
        return <BookingSystem userRole={userRole} />;
      case 'customers':
        return <CustomerManagement customers={customers} userRole={userRole} />;
      case 'dashboard':
        return <AdminDashboard userRole={userRole} />;
      case 'settings':
        return <SettingsPage userRole={userRole} currentUser={currentUser} />;
      default:
        return <HeroSection onBookNow={handleBookNow} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view as ViewType)}
        userRole={userRole}
      />
      
      {/* Auth Buttons */}
      {!isAuthenticated && currentView === 'home' && (
        <div className="fixed top-20 right-4 z-40 flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setAuthMode('login');
              setShowAuthDialog(true);
            }}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
          <Button
            onClick={() => {
              setAuthMode('register');
              setShowAuthDialog(true);
            }}
            className="luxury-button"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Register
          </Button>
        </div>
      )}

      {/* Logout Button */}
      {isAuthenticated && (
        <div className="fixed top-20 right-4 z-40">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-8">
        {renderCurrentView()}
      </main>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {authMode === 'login' ? 'Login to LuxeStay' : 'Create Account'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            
            if (authMode === 'login') {
              handleLogin(email, password);
            } else {
              const name = formData.get('name') as string;
              handleRegister(name, email, password);
            }
          }}>
            <div className="space-y-4">
              {authMode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>

              {authMode === 'login' && (
                <div className="text-sm text-muted-foreground">
                  <p>Demo accounts:</p>
                  <ul className="mt-2 space-y-1">
                    <li>Admin: admin@luxestay.com</li>
                    <li>Receptionist: receptionist@luxestay.com</li>
                    <li>Customer: any other email</li>
                  </ul>
                </div>
              )}

              <Button type="submit" className="w-full luxury-button">
                {authMode === 'login' ? 'Login' : 'Create Account'}
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-sm text-primary hover:underline"
                >
                  {authMode === 'login' 
                    ? "Don't have an account? Register" 
                    : "Already have an account? Login"
                  }
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Customer Management Component
function CustomerManagement({ customers, userRole }: { customers: User[], userRole: UserRole }) {
  const canManageCustomers = userRole === 'admin' || userRole === 'receptionist';

  if (!canManageCustomers) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">You don't have permission to view customer data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary">Customer Management</h2>
        <p className="text-muted-foreground">View and manage hotel customers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id} className="room-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {customer.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              {customer.phone && (
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
              )}
              {customer.address && (
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.address}</span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(customer.joinDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Settings Page Component
function SettingsPage({ userRole, currentUser }: { userRole: UserRole, currentUser: User | null }) {
  const canAccessSettings = userRole === 'admin';

  if (!canAccessSettings) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">You don't have permission to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary">Settings</h2>
        <p className="text-muted-foreground">Configure hotel management system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Hotel Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hotelName">Hotel Name</Label>
              <Input id="hotelName" defaultValue="LuxeStay Hotel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotelAddress">Address</Label>
              <Input id="hotelAddress" defaultValue="123 Luxury Ave, City Center" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotelPhone">Phone</Label>
              <Input id="hotelPhone" defaultValue="+1 (555) 123-HOTEL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotelEmail">Email</Label>
              <Input id="hotelEmail" defaultValue="info@luxestay.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentUser && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="userName">Name</Label>
                  <Input id="userName" defaultValue={currentUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input id="userEmail" defaultValue={currentUser.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userRole">Role</Label>
                  <Input id="userRole" defaultValue={currentUser.role} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userPhone">Phone</Label>
                  <Input id="userPhone" defaultValue={currentUser.phone || ''} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="luxury-button">Save Settings</Button>
      </div>
    </div>
  );
}