import { tourPackage } from "../data/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Wind, Utensils, Plane, Bus, Train, Ship, Check, X } from "lucide-react";

interface TourTableProps {
  tours: tourPackage[];
  onBookNow: (tour: tourPackage) => void;
}

const travelIcons = {
  flight: Plane,
  bus: Bus,
  train: Train,
  cruise: Ship,
};

const TourTable = ({ tours, onBookNow }: TourTableProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Package</TableHead>
              <TableHead className="font-semibold">Destination</TableHead>
              <TableHead className="font-semibold">Duration</TableHead>
              <TableHead className="font-semibold">Rating</TableHead>
              <TableHead className="font-semibold">Travel</TableHead>
              <TableHead className="font-semibold text-center">AC</TableHead>
              <TableHead className="font-semibold text-center">Meals</TableHead>
              <TableHead className="font-semibold">Hotel</TableHead>
              <TableHead className="font-semibold text-right">Price</TableHead>
              <TableHead className="font-semibold text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.map((tour) => {
              const TravelIcon = travelIcons[tour.travelType];
              const discount = Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100);

              return (
                <TableRow key={tour.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{tour.name}</p>
                        {discount > 0 && (
                          <Badge className="bg-accent/20 text-accent text-xs mt-1">
                            {discount}% OFF
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tour.destination}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{tour.duration}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{tour.rating}</span>
                      <span className="text-xs text-muted-foreground">({tour.reviewCount})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TravelIcon className="h-4 w-4" />
                      <span className="capitalize">{tour.travelType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {tour.isAC ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/10 text-success">
                        <Wind className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                        <X className="h-4 w-4" />
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {tour.mealsIncluded ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/10 text-success">
                        <Utensils className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                        <X className="h-4 w-4" />
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {Array.from({ length: tour.hotelStar }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <span className="text-xs text-muted-foreground line-through block">
                        ₹{tour.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-lg font-bold text-foreground">
                        ₹{tour.price.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="default" size="sm" onClick={() => onBookNow(tour)}>
                      Book
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TourTable;
