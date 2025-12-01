import { FilterState } from "../data/types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Star, Wind, Utensils, Building, Plane, Bus, Train, Ship, RotateCcw } from "lucide-react";

interface PackageFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const PackageFilterSidebar = ({ filters, onFilterChange }: PackageFilterSidebarProps) => {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFilterChange({
      search: "",
      priceRange: [0, 60000],
      minRating: 0,
      isAC: null,
      mealsIncluded: null,
      hotelStar: null,
      travelType: null,
    });
  };

  const travelTypes = [
    { value: 'flight', icon: Plane, label: 'Flight' },
    { value: 'bus', icon: Bus, label: 'Bus' },
    { value: 'train', icon: Train, label: 'Train' },
    { value: 'cruise', icon: Ship, label: 'Cruise' },
  ];

  const ratings = [4.5, 4.0, 3.5, 3.0];
  const hotelStars = [5, 4, 3, 2];

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-card rounded-2xl p-6 shadow-card sticky top-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-foreground mb-3 block">Price Range</Label>
          <Slider
            value={filters.priceRange}
            min={0}
            max={60000}
            step={1000}
            onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-foreground mb-3 block">Minimum Rating</Label>
          <div className="grid grid-cols-2 gap-2">
            {ratings.map((rating) => (
              <Button
                key={rating}
                variant={filters.minRating === rating ? "secondary" : "default"}
                size="sm"
                onClick={() => updateFilter("minRating", filters.minRating === rating ? 0 : rating)}
                className="justify-start"
              >
                <Star className="h-4 w-4 fill-accent text-accent mr-1" />
                {rating}+
              </Button>
            ))}
          </div>
        </div>

        {/* AC / Non-AC */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-foreground mb-3 block">Accommodation Type</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={filters.isAC === true ? "secondary" : "default"}
              size="sm"
              onClick={() => updateFilter("isAC", filters.isAC === true ? null : true)}
            >
              <Wind className="h-4 w-4 mr-1" />
              AC
            </Button>
            <Button
              variant={filters.isAC === false ? "secondary" : "default"}
              size="sm"
              onClick={() => updateFilter("isAC", filters.isAC === false ? null : false)}
            >
              Non-AC
            </Button>
          </div>
        </div>

        {/* Meals */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-foreground mb-3 block">Meals Included</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={filters.mealsIncluded === true ? "secondary" : "default"}
              size="sm"
              onClick={() => updateFilter("mealsIncluded", filters.mealsIncluded === true ? null : true)}
            >
              <Utensils className="h-4 w-4 mr-1" />
              Yes
            </Button>
            <Button
              variant={filters.mealsIncluded === false ? "secondary" : "default"}
              size="sm"
              onClick={() => updateFilter("mealsIncluded", filters.mealsIncluded === false ? null : false)}
            >
              No
            </Button>
          </div>
        </div>

        {/* Hotel Star Rating */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-foreground mb-3 block">Hotel Rating</Label>
          <div className="grid grid-cols-2 gap-2">
            {hotelStars.map((star) => (
              <Button
                key={star}
                variant={filters.hotelStar === star ? "secondary" : "default"}
                size="sm"
                onClick={() => updateFilter("hotelStar", filters.hotelStar === star ? null : star)}
              >
                <Building className="h-4 w-4 mr-1" />
                {star}-Star
              </Button>
            ))}
          </div>
        </div>

        {/* Travel Type */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Travel Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {travelTypes.map(({ value, icon: Icon, label }) => (
              <Button
                key={value}
                variant={filters.travelType === value ? "secondary" : "default"}
                size="sm"
                onClick={() => updateFilter("travelType", filters.travelType === value ? null : value)}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PackageFilterSidebar;
