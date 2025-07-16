# 🏨 LuxeStay Hotel Management System

A comprehensive, responsive hotel management system built with modern web technologies.

## 🚀 Features

### 1. **User Roles & Authentication**
- **Admin**: Full system access with management capabilities
- **Receptionist**: Booking and customer management
- **Customer**: Room booking and personal booking history
- **Guest**: Browse rooms and make bookings

### 2. **Room Management**
- Add, edit, and delete room categories
- Set pricing and availability
- Upload room images and descriptions
- Real-time room availability status
- Room categories: Standard, Deluxe, Suite, Presidential

### 3. **Booking System**
- Interactive date selection
- Real-time availability checking
- Multi-step booking process
- Booking confirmation and management
- Booking history for users and admins

### 4. **Customer Management**
- View and manage registered customers
- Customer profiles with contact details
- Registration and login system
- Role-based access control

### 5. **Admin Dashboard**
- Real-time analytics and statistics
- Revenue tracking and occupancy rates
- Recent bookings overview
- Room status monitoring
- Quick action buttons

### 6. **Responsive Design**
- Mobile-first approach
- Beautiful, modern UI/UX
- Smooth animations and transitions
- Professional hotel aesthetics

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React hooks
- **Routing**: React Router DOM

## 🎨 Design System

The system features a luxury hotel aesthetic with:
- Warm, elegant color palette (deep blues, golds, champagne)
- Custom gradients and shadows
- Smooth animations and transitions
- Professional typography
- Responsive grid layouts

## 🔧 Getting Started

### Demo Accounts
- **Admin**: admin@luxestay.com (any password)
- **Receptionist**: receptionist@luxestay.com (any password)
- **Customer**: Any other email address

### Navigation
- **Home**: Hero section with hotel overview
- **Rooms**: Room gallery and management
- **Bookings**: Booking system and history
- **Customers**: Customer management (Admin/Receptionist only)
- **Dashboard**: Analytics and statistics
- **Settings**: System configuration (Admin only)

## 📱 Key Components

### HotelManagement
Main application component that handles:
- User authentication
- Route management
- State management
- Role-based access control

### Navigation
Responsive navigation with:
- Role-based menu items
- Mobile-friendly design
- User profile integration

### HeroSection
Beautiful landing page with:
- Hotel imagery
- Feature highlights
- Call-to-action buttons
- Statistics display

### RoomManagement
Comprehensive room management with:
- Room grid display
- Add/edit/delete functionality
- Search and filtering
- Availability tracking

### BookingSystem
Multi-step booking process:
1. Date and guest selection
2. Guest information
3. Payment and confirmation

### AdminDashboard
Analytics dashboard with:
- Revenue and occupancy stats
- Recent bookings
- Room status overview
- Quick actions

## 🎯 Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Email notifications
- Advanced reporting
- Housekeeping management
- Review and rating system
- Live chat support
- Mobile app development

## 📊 Database Schema (Planned)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  role VARCHAR(20),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP
);

-- Rooms table
CREATE TABLE rooms (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  price DECIMAL(10,2),
  capacity INTEGER,
  description TEXT,
  image_url VARCHAR(255),
  total_rooms INTEGER,
  available_rooms INTEGER
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  room_id UUID REFERENCES rooms(id),
  check_in DATE,
  check_out DATE,
  guests INTEGER,
  total_price DECIMAL(10,2),
  status VARCHAR(20),
  payment_status VARCHAR(20),
  created_at TIMESTAMP
);
```

## 🔒 Security Features

- Role-based access control
- Input validation
- XSS protection
- CSRF protection (when backend is added)
- Secure authentication (planned)

## 🎨 UI/UX Highlights

- **Luxury Hotel Aesthetic**: Professional design with warm colors
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Elegant transitions and hover effects
- **Intuitive Navigation**: Easy-to-use interface
- **Accessibility**: WCAG compliant components

## 📈 Analytics & Reporting

The dashboard provides:
- Revenue tracking
- Occupancy rates
- Guest satisfaction metrics
- Booking trends
- Room performance statistics

---

Built with ❤️ for modern hotel management needs.