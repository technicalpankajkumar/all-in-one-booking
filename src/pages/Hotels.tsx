import { BookingForm } from "@/components/BookingForm";
import { FilterSidebar } from "@/components/FilterSidebar";
import HeroSection from "@/components/HeroSection";
import { Hotel, HotelCard } from "@/components/HotelCard";
import { HotelListItem } from "@/components/HotelListItem";
import { SearchBar, SearchParams } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

const mockHotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "New York, NY",
    rating: 4.8,
    reviews: 234,
    price: 299,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    amenities: ["Free WiFi", "Parking", "Pool", "Spa"],
    description: "Luxurious 5-star hotel in the heart of Manhattan with stunning city views and world-class amenities.",
  },
  {
    id: 2,
    name: "Beachfront Resort",
    location: "Miami, FL",
    rating: 4.6,
    reviews: 189,
    price: 450,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    amenities: ["Free WiFi", "Pool", "Beach Access", "Restaurant"],
    description: "Tropical paradise with private beach access, infinity pools, and oceanfront suites.",
  },
  {
    id: 3,
    name: "Mountain Lodge",
    location: "Aspen, CO",
    rating: 4.9,
    reviews: 156,
    price: 380,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    amenities: ["Free WiFi", "Parking", "Gym", "Pet Friendly"],
    description: "Cozy mountain retreat with ski-in/ski-out access and breathtaking alpine views.",
  },
  {
    id: 4,
    name: "Downtown Boutique Hotel",
    location: "San Francisco, CA",
    rating: 4.7,
    reviews: 312,
    price: 220,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    amenities: ["Free WiFi", "Restaurant", "Gym"],
    description: "Modern boutique hotel in the vibrant downtown area, perfect for urban explorers.",
  },
  {
    id: 5,
    name: "Lakeside Inn",
    location: "Lake Tahoe, NV",
    rating: 4.5,
    reviews: 98,
    price: 175,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    amenities: ["Free WiFi", "Parking", "Beach Access"],
    description: "Charming lakeside property with water sports, fishing, and serene natural beauty.",
  },
  {
    id: 6,
    name: "Historic Manor",
    location: "Charleston, SC",
    rating: 4.8,
    reviews: 201,
    price: 340,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    amenities: ["Free WiFi", "Spa", "Restaurant", "Parking"],
    description: "Elegant historic mansion transformed into a luxury hotel with southern charm and hospitality.",
  },
];

const Hotels = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const filteredHotels = mockHotels.filter((hotel) => {
    const priceMatch = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(hotel.rating));
    const amenityMatch =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) => hotel.amenities.includes(amenity));
    return priceMatch && ratingMatch && amenityMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection pageType="hotel" />

      {/* Search Bar */}
      <div className="container mx-auto px-4">
        <SearchBar onSearch={setSearchParams} pageType="hotel" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedRatings={selectedRatings}
              onRatingChange={setSelectedRatings}
              selectedAmenities={selectedAmenities}
              onAmenityChange={setSelectedAmenities}
            />
          </aside>

          {/* Hotel Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {filteredHotels.length} Properties Found
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} onBook={setSelectedHotel} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <HotelListItem key={hotel.id} hotel={hotel} onBook={setSelectedHotel} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Booking Dialog */}
      <Dialog open={selectedHotel !== null} onOpenChange={() => setSelectedHotel(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Book Your Stay at {selectedHotel?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedHotel && (
            <BookingForm hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hotels;
