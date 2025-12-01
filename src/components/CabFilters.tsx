import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";

interface CabFiltersProps {
  selectedType: string;
  sortBy: string;
  onTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
}

export const CabFilters = ({ selectedType, sortBy, onTypeChange, onSortChange }: CabFiltersProps) => {
  const types = ["All", "Sedan", "SUV", "Luxury", "Mini"];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-card">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          <span className="font-semibold text-card-foreground">Filter by:</span>
          <div className="flex flex-wrap gap-2 ml-2">
            {types.map((type) => (
              <Badge
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
                onClick={() => onTypeChange(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="capacity">Capacity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
