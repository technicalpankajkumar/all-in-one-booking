import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  pageType: string;
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;

}

export const SearchBar = ({ onSearch, pageType = "hotel" }: SearchBarProps) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch({ destination, checkIn, checkOut, guests });
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 -mt-14 relative z-10 max-w-5xl mx-auto">
      {pageType == "hotel" ? <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="destination" className="text-sm font-medium mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Destination
          </Label>
          <Input
            id="destination"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="checkIn" className="text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Check-in
          </Label>
          <Input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="checkOut" className="text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Check-out
          </Label>
          <Input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="guests" className="text-sm font-medium mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Guests
          </Label>
          <div className="flex gap-2">
            <Input
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full"
            />
            <Button onClick={handleSearch} className="bg-accent hover:bg-accent/90">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div> : pageType == "cab" ? <div className="flex gap-2 bg-card rounded-lg">
        <div className="relative flex-1 ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by car name or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        <Button className="bg-primary">Search</Button>
      </div> : <div className="animate-slide-up " style={{ animationDelay: '0.2s' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-muted/50 border-0 focus-visible:ring-primary"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="When?"
              className="pl-10 h-12 bg-muted/50 border-0"
              readOnly
            />
          </div>

          <Button variant="default" size="lg" className="h-12">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>}
    </div>
  );
};
