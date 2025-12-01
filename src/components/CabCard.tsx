import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Briefcase, Wind } from "lucide-react";

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

interface CabCardProps {
  cab: Cab;
  onBook: (cab: Cab) => void;
}

export const CabCard = ({ cab, onBook }: CabCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden h-48 bg-muted">
        <img
          src={cab.image}
          alt={cab.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!cab.available && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-card">
              Not Available
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">
            {cab.type}
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
              <span className="font-semibold text-card-foreground">{cab.rating}</span>
              <span className="text-xs text-muted-foreground">({cab.reviews})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{cab.capacity} seats</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{cab.luggage} bags</span>
            </div>
            {cab.features.includes("AC") && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Wind className="w-4 h-4" />
                <span className="text-sm">AC</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {cab.features.map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="text-xs"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <div className="text-2xl font-bold text-primary">
              ${cab.price}
            </div>
            <div className="text-xs text-muted-foreground">per trip</div>
          </div>
          <Button
            onClick={() => onBook(cab)}
            disabled={!cab.available}
            className="bg-primary hover:opacity-90 transition-opacity"
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
