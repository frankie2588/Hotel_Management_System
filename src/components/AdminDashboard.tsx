import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Bed, 
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  userRole: 'admin' | 'receptionist' | 'customer' | 'guest';
}

export default function AdminDashboard({ userRole }: DashboardProps) {
  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'This month'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: Bed,
      description: 'Current occupancy'
    },
    {
      title: 'Total Bookings',
      value: '234',
      change: '+8.1%',
      changeType: 'positive' as const,
      icon: Calendar,
      description: 'This month'
    },
    {
      title: 'Active Guests',
      value: '89',
      change: '-2.3%',
      changeType: 'negative' as const,
      icon: Users,
      description: 'Currently checked in'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive' as const,
      icon: Star,
      description: 'Guest satisfaction'
    },
    {
      title: 'Available Rooms',
      value: '67',
      change: '+12',
      changeType: 'positive' as const,
      icon: Bed,
      description: 'Ready for booking'
    }
  ];

  const recentBookings = [
    {
      id: '1',
      guest: 'John Doe',
      room: 'Deluxe Suite',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      status: 'confirmed',
      amount: '$897'
    },
    {
      id: '2',
      guest: 'Jane Smith',
      room: 'Standard Room',
      checkIn: '2024-01-16',
      checkOut: '2024-01-19',
      status: 'pending',
      amount: '$447'
    },
    {
      id: '3',
      guest: 'Michael Johnson',
      room: 'Presidential Suite',
      checkIn: '2024-01-17',
      checkOut: '2024-01-20',
      status: 'confirmed',
      amount: '$1,797'
    },
    {
      id: '4',
      guest: 'Sarah Wilson',
      room: 'Deluxe Suite',
      checkIn: '2024-01-18',
      checkOut: '2024-01-21',
      status: 'confirmed',
      amount: '$897'
    }
  ];

  const roomStatusData = [
    { category: 'Standard Rooms', total: 50, occupied: 32, available: 18, maintenance: 0 },
    { category: 'Deluxe Suites', total: 20, occupied: 15, available: 4, maintenance: 1 },
    { category: 'Presidential Suites', total: 5, occupied: 3, available: 2, maintenance: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canViewDashboard = userRole === 'admin' || userRole === 'receptionist';

  if (!canViewDashboard) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">You don't have permission to view the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at your hotel today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-foreground/80">{stat.title}</p>
                  <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-300" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-300" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <span className="text-sm text-primary-foreground/60">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings and Room Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{booking.guest}</span>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{booking.room}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.checkIn} - {booking.checkOut}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{booking.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Room Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomStatusData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.total} total
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-green-100 text-green-800 rounded">
                      <div className="font-semibold">{category.occupied}</div>
                      <div className="text-xs">Occupied</div>
                    </div>
                    <div className="text-center p-2 bg-blue-100 text-blue-800 rounded">
                      <div className="font-semibold">{category.available}</div>
                      <div className="text-xs">Available</div>
                    </div>
                    <div className="text-center p-2 bg-orange-100 text-orange-800 rounded">
                      <div className="font-semibold">{category.maintenance}</div>
                      <div className="text-xs">Maintenance</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg hover:bg-muted/30 transition-smooth cursor-pointer">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Check-in Guest</h3>
              <p className="text-sm text-muted-foreground">Process new arrivals</p>
            </div>
            <div className="text-center p-4 border rounded-lg hover:bg-muted/30 transition-smooth cursor-pointer">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">New Booking</h3>
              <p className="text-sm text-muted-foreground">Create reservation</p>
            </div>
            <div className="text-center p-4 border rounded-lg hover:bg-muted/30 transition-smooth cursor-pointer">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Generate Report</h3>
              <p className="text-sm text-muted-foreground">View analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}