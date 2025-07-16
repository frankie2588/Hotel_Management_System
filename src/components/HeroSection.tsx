import { Calendar, MapPin, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hotel-hero.jpg';

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const features = [
    {
      icon: Star,
      title: "5-Star Luxury",
      description: "Premium amenities and world-class service"
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Heart of the city with stunning views"
    },
    {
      icon: Users,
      title: "24/7 Concierge",
      description: "Dedicated staff for all your needs"
    }
  ];

  const stats = [
    { number: "500+", label: "Luxury Rooms" },
    { number: "98%", label: "Guest Satisfaction" },
    { number: "24/7", label: "Room Service" },
    { number: "50+", label: "Years Experience" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Welcome to
            <span className="block text-accent"> LuxeStay Hotel</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Experience unparalleled luxury and comfort in the heart of the city. 
            Where every stay becomes an unforgettable memory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={onBookNow}
              className="luxury-button text-lg py-4 px-8 animate-luxury-glow"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Stay
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-lg py-4 px-8 transition-smooth"
            >
              Explore Rooms
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-smooth animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-8 w-8 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}