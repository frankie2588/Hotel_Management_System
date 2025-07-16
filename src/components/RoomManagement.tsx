import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Bed, Wifi, Car, Coffee, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import deluxeSuite from '@/assets/deluxe-suite.jpg';
import standardRoom from '@/assets/standard-room.jpg';
import presidentialSuite from '@/assets/presidential-suite.jpg';

interface Room {
  id: string;
  name: string;
  category: string;
  price: number;
  capacity: number;
  amenities: string[];
  description: string;
  image: string;
  available: boolean;
  totalRooms: number;
  availableRooms: number;
}

interface RoomManagementProps {
  userRole: 'admin' | 'receptionist' | 'customer' | 'guest';
}

export default function RoomManagement({ userRole }: RoomManagementProps) {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Deluxe Suite',
      category: 'suite',
      price: 299,
      capacity: 2,
      amenities: ['wifi', 'tv', 'coffee', 'parking'],
      description: 'Spacious suite with city views, separate living area, and premium amenities.',
      image: deluxeSuite,
      available: true,
      totalRooms: 20,
      availableRooms: 15
    },
    {
      id: '2',
      name: 'Standard Room',
      category: 'standard',
      price: 149,
      capacity: 2,
      amenities: ['wifi', 'tv', 'coffee'],
      description: 'Comfortable room with modern amenities and elegant design.',
      image: standardRoom,
      available: true,
      totalRooms: 50,
      availableRooms: 30
    },
    {
      id: '3',
      name: 'Presidential Suite',
      category: 'presidential',
      price: 599,
      capacity: 4,
      amenities: ['wifi', 'tv', 'coffee', 'parking'],
      description: 'Ultimate luxury with panoramic views, private balcony, and concierge service.',
      image: presidentialSuite,
      available: true,
      totalRooms: 5,
      availableRooms: 2
    }
  ]);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const amenityIcons = {
    wifi: Wifi,
    tv: Tv,
    coffee: Coffee,
    parking: Car,
    bed: Bed,
    users: Users
  };

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRoom = () => {
    setIsAddingRoom(true);
    setSelectedRoom(null);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsAddingRoom(false);
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const canManageRooms = userRole === 'admin' || userRole === 'receptionist';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Room Management</h2>
          <p className="text-muted-foreground">Manage hotel rooms, categories, and availability</p>
        </div>
        {canManageRooms && (
          <Button onClick={handleAddRoom} className="luxury-button">
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Label htmlFor="search">Search Rooms</Label>
        <Input
          id="search"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1"
        />
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="room-card group">
            <div className="relative overflow-hidden">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
              />
              <div className="absolute top-4 right-4">
                <Badge variant={room.available ? "default" : "destructive"}>
                  {room.available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <p className="text-sm text-muted-foreground capitalize">{room.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${room.price}</p>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{room.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{room.capacity} guests</span>
                </div>
                <div className="text-muted-foreground">
                  {room.availableRooms}/{room.totalRooms} available
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                  return (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {Icon && <Icon className="h-3 w-3 mr-1" />}
                      {amenity}
                    </Badge>
                  );
                })}
              </div>

              {canManageRooms && (
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditRoom(room)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Room Dialog */}
      <Dialog open={isAddingRoom || selectedRoom !== null} onOpenChange={() => {
        setIsAddingRoom(false);
        setSelectedRoom(null);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isAddingRoom ? 'Add New Room' : 'Edit Room'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Room Name</Label>
                <Input id="name" defaultValue={selectedRoom?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={selectedRoom?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="presidential">Presidential</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price per night</Label>
                <Input id="price" type="number" defaultValue={selectedRoom?.price} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" defaultValue={selectedRoom?.capacity} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={selectedRoom?.description} />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setIsAddingRoom(false);
                setSelectedRoom(null);
              }}>
                Cancel
              </Button>
              <Button className="luxury-button">
                {isAddingRoom ? 'Add Room' : 'Update Room'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}