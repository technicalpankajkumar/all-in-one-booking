import { tourPackage } from "../data/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Wind, Utensils, Check, Plane, Bus, Train, Ship } from "lucide-react";

interface TourCardProps {
  tour: tourPackage;
  onBookNow: (tour: tourPackage) => void;
}

const travelIcons = {
  flight: Plane,
  bus: Bus,
  train: Train,
  cruise: Ship,
};

const TourCard = ({ tour, onBookNow }: TourCardProps) => {
  const TravelIcon = travelIcons[tour.travelType];
  const discount = Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100);

  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {discount > 0 && (
            <Badge className="bg-accent text-accent-foreground font-semibold">
              {discount}% OFF
            </Badge>
          )}
          {tour.isAC && (
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
              <Wind className="h-3 w-3 mr-1" />
              AC
            </Badge>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-semibold text-foreground">{tour.rating}</span>
          <span className="text-xs text-muted-foreground">({tour.reviewCount})</span>
        </div>

        {/* Destination */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-primary-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">{tour.destination}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {tour.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tour.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <Clock className="h-3 w-3 mr-1" />
            {tour.duration}
          </span>
          <span className="inline-flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <TravelIcon className="h-3 w-3 mr-1" />
            {tour.travelType.charAt(0).toUpperCase() + tour.travelType.slice(1)}
          </span>
          {tour.mealsIncluded && (
            <span className="inline-flex items-center text-xs text-success bg-success/10 px-2 py-1 rounded-full">
              <Utensils className="h-3 w-3 mr-1" />
              Meals
            </span>
          )}
        </div>

        {/* Inclusions */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tour.inclusions.slice(0, 3).map((item) => (
            <span key={item} className="inline-flex items-center text-xs text-primary">
              <Check className="h-3 w-3 mr-0.5" />
              {item}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground line-through">₹{tour.originalPrice.toLocaleString()}</span>
            <div className="text-2xl font-bold text-foreground">
              ₹{tour.price.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground">/person</span>
            </div>
          </div>
          <Button variant="default" size="sm" onClick={() => onBookNow(tour)}>
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
};

export default TourCard;
