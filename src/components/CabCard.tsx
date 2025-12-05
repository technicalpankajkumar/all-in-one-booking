import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Briefcase, Wind } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Cab {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  capacity: number;
  luggage: number;
  features: string[];
  available: boolean;
}
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;

interface CabCardProps {
  cab: Cab;
  onBook: (cab: Cab) => void;
}

export const CabCard = ({ cab }: CabCardProps) => {
  const navigate = useNavigate();
  return (
    <Card className="group overflow-hidden bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden h-48 bg-muted">
        <img
          src={API_URL+cab?.images?.find(res => res.is_main == true)?.image_url}
          alt={cab.car_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!cab.is_available && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-card">
              Not Available
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">
            {cab.car_type}
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-card-foreground">
              {cab.name}
            </h3>
            <div className="flex items-center gap-1 text-accent">
              <Star className="w-4 h-4 fill-accent" />
              <span className="font-semibold text-card-foreground">{cab.rating || 5}</span>
              <span className="text-xs text-muted-foreground">({cab.reviews || "4.9"})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{cab?.seat_capacity} seats</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{cab?.bag_capacity} bags</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
             {cab?.features?.ac && <Badge
                variant="secondary"
                className="text-xs"
              >
                AC
              </Badge>}
               {cab?.features?.gps && <Badge
                variant="secondary"
                className="text-xs"
              >
                GPS
              </Badge>}
               {cab?.features?.music_system && <Badge
                variant="secondary"
                className="text-xs"
              >
                Music System
              </Badge>}
               {cab?.features?.automatic_transmission && <Badge
                variant="secondary"
                className="text-xs"
              >
                Automatic
              </Badge>}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <div className="text-2xl font-bold text-primary">
              ${cab?.base_price}
            </div>
            <div className="text-xs text-muted-foreground">per trip</div>
          </div>
          <Button
            onClick={() => navigate(`/booking/${cab.id}`)}
            disabled={!cab.is_available}
            className="bg-primary cursor-pointer"
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
