import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedRatings: number[];
  onRatingChange: (ratings: number[]) => void;
  selectedAmenities: string[];
  onAmenityChange: (amenities: string[]) => void;
}

const amenitiesList = ["Free WiFi", "Parking", "Pool", "Spa", "Restaurant", "Gym", "Pet Friendly", "Beach Access"];

export const FilterSidebar = ({
  priceRange,
  onPriceRangeChange,
  selectedRatings,
  onRatingChange,
  selectedAmenities,
  onAmenityChange,
}: FilterSidebarProps) => {
  const handleRatingToggle = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      onRatingChange(selectedRatings.filter((r) => r !== rating));
    } else {
      onRatingChange([...selectedRatings, rating]);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      onAmenityChange(selectedAmenities.filter((a) => a !== amenity));
    } else {
      onAmenityChange([...selectedAmenities, amenity]);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-fit sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Price Range (per night)</Label>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          min={0}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Star Rating</Label>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingToggle(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex items-center gap-1 cursor-pointer text-sm"
              >
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-star text-star" />
                ))}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Amenities</Label>
        <div className="space-y-2">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer text-sm">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
