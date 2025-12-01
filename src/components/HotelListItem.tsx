import { MapPin, Star, Wifi, Car, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hotel } from "./HotelCard";
import { useNavigate } from "react-router-dom";

interface HotelListItemProps {
  hotel: Hotel;
  onBook: (hotel: Hotel) => void;
}

const amenityIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  Parking: Car,
  Pool: Waves,
};

export const HotelListItem = ({ hotel, onBook }: HotelListItemProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-all duration-300 group cursor-pointer"
      onClick={() => navigate(`/hotel/${hotel.id}`)}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {hotel.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{hotel.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-md">
              <Star className="h-4 w-4 fill-star text-star" />
              <span className="text-sm font-semibold">{hotel.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3 flex-1">{hotel.description}</p>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {hotel.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity];
              return (
                <Badge key={amenity} variant="secondary" className="text-xs gap-1">
                  {Icon && <Icon className="h-3 w-3" />}
                  {amenity}
                </Badge>
              );
            })}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">{hotel.reviews} reviews</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">${hotel.price}</div>
                <div className="text-xs text-muted-foreground">per night</div>
              </div>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onBook(hotel);
                }} 
                className="bg-accent hover:bg-accent/90"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
