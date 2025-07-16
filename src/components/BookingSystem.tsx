import { useState } from 'react';
import { Calendar, Users, CreditCard, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import deluxeSuite from '@/assets/deluxe-suite.jpg';
import standardRoom from '@/assets/standard-room.jpg';
import presidentialSuite from '@/assets/presidential-suite.jpg';

interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  customerName: string;
  customerEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
}

interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  image: string;
  available: boolean;
}

interface BookingSystemProps {
  userRole: 'admin' | 'receptionist' | 'customer' | 'guest';
}

export default function BookingSystem({ userRole }: BookingSystemProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: ''
  });

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      roomId: '1',
      roomName: 'Deluxe Suite',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      guests: 2,
      totalPrice: 897,
      status: 'confirmed',
      paymentStatus: 'paid'
    },
    {
      id: '2',
      roomId: '2',
      roomName: 'Standard Room',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      checkIn: '2024-01-20',
      checkOut: '2024-01-22',
      guests: 1,
      totalPrice: 298,
      status: 'pending',
      paymentStatus: 'pending'
    }
  ]);

  const availableRooms: Room[] = [
    {
      id: '1',
      name: 'Deluxe Suite',
      price: 299,
      capacity: 2,
      image: deluxeSuite,
      available: true
    },
    {
      id: '2',
      name: 'Standard Room',
      price: 149,
      capacity: 2,
      image: standardRoom,
      available: true
    },
    {
      id: '3',
      name: 'Presidential Suite',
      price: 599,
      capacity: 4,
      image: presidentialSuite,
      available: true
    }
  ];

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setBookingStep(1);
  };

  const handleNextStep = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    }
  };

  const handleCompleteBooking = () => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      roomId: selectedRoom!.id,
      roomName: selectedRoom!.name,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      totalPrice: calculateTotal(),
      status: 'confirmed',
      paymentStatus: 'paid'
    };

    setBookings([...bookings, newBooking]);
    setShowConfirmation(true);
    setSelectedRoom(null);
    setBookingStep(1);
  };

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

  const canViewBookings = userRole !== 'guest';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">Booking System</h2>
        <p className="text-muted-foreground">Book rooms and manage reservations</p>
      </div>

      {/* Available Rooms */}
      <Card>
        <CardHeader>
          <CardTitle>Available Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRooms.map((room) => (
              <Card key={room.id} className="room-card group">
                <div className="relative overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="default">Available</Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        <Users className="h-4 w-4 inline mr-1" />
                        Up to {room.capacity} guests
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">${room.price}</p>
                      <p className="text-sm text-muted-foreground">per night</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <Button 
                    onClick={() => handleBookRoom(room)}
                    className="luxury-button w-full"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking History */}
      {canViewBookings && (
        <Card>
          <CardHeader>
            <CardTitle>
              {userRole === 'customer' ? 'My Bookings' : 'All Bookings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{booking.roomName}</h3>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {booking.checkIn} to {booking.checkOut}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {booking.guests} guests
                        </span>
                      </div>
                      <p className="text-sm">
                        Customer: {booking.customerName} ({booking.customerEmail})
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">${booking.totalPrice}</p>
                      <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Dialog */}
      <Dialog open={selectedRoom !== null} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Book {selectedRoom?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= bookingStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step < bookingStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {bookingStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Dates & Guests</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={bookingData.guests.toString()} onValueChange={(value) => setBookingData({...bookingData, guests: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} guest{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {bookingData.checkIn && bookingData.checkOut && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <span>{calculateNights()} nights</span>
                        <span className="text-xl font-bold text-primary">${calculateTotal()}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Guest Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={bookingData.customerName}
                      onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.customerEmail}
                      onChange={(e) => setBookingData({...bookingData, customerEmail: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={bookingData.customerPhone}
                    onChange={(e) => setBookingData({...bookingData, customerPhone: e.target.value})}
                  />
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment & Confirmation</h3>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between">
                      <span>Room:</span>
                      <span>{selectedRoom?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dates:</span>
                      <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span>{bookingData.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nights:</span>
                      <span>{calculateNights()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Payment Method</span>
                    </div>
                    <div className="space-y-2">
                      <Label>Card Number</Label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label>Expiry Date</Label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label>CVV</Label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => bookingStep > 1 ? setBookingStep(bookingStep - 1) : setSelectedRoom(null)}
              >
                {bookingStep > 1 ? 'Previous' : 'Cancel'}
              </Button>
              <Button
                onClick={bookingStep === 3 ? handleCompleteBooking : handleNextStep}
                className="luxury-button"
                disabled={
                  (bookingStep === 1 && (!bookingData.checkIn || !bookingData.checkOut)) ||
                  (bookingStep === 2 && (!bookingData.customerName || !bookingData.customerEmail))
                }
              >
                {bookingStep === 3 ? 'Complete Booking' : 'Next'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Booking Confirmed!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => setShowConfirmation(false)} className="luxury-button">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}