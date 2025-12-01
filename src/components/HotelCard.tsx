import { MapPin, Star, Wifi, Car, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  amenities: string[];
  description: string;
}

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotel: Hotel) => void;
}

const amenityIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  Parking: Car,
  Pool: Waves,
};

export const HotelCard = ({ hotel, onBook }: HotelCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/hotel/${hotel.id}`)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
          ${hotel.price}/night
        </Badge>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 fill-star text-star" />
            <span className="text-sm font-semibold">{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span>{hotel.location}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hotel.description}</p>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {hotel.amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <Badge key={amenity} variant="secondary" className="text-xs gap-1">
                {Icon && <Icon className="h-3 w-3" />}
                {amenity}
              </Badge>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{hotel.reviews} reviews</div>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onBook(hotel);
            }} 
            className="bg-primary hover:bg-primary/90"
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
