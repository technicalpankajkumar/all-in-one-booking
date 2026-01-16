import { BookingForm } from "@/components/BookingForm";
import { CustomCategoryTabs } from "@/components/custom-ui/CustomCategoryTabs";
import { DynamicTable } from "@/components/DynamicTable";
import HeroSection from "@/components/HeroSection";
import { Hotel, HotelCard } from "@/components/HotelCard";
import { HotelFilters } from "@/components/HotelFilters";
import { HotelListItem } from "@/components/HotelListItem";
import { SearchBar, SearchParams } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DEMO_HOTELS } from "@/data/data";
import { LayoutGrid, List, TableIcon } from "lucide-react";
import { useMemo, useState } from "react";

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

interface FiltersState {
  priceRange: [number, number];
  placeTypes: string[];
  bedrooms: number | null;
  beds: number | null;
  bathrooms: number | null;
  propertyTypes: string[];
  ratings:number[]
}

const Hotels = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: [0, 50000],
    placeTypes: [],
    bedrooms: null,
    beds: null,
    bathrooms: null,
    propertyTypes: [],
    ratings:[]
  });
  const handleViewHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    // setView("view");
  };

    // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) count++;
    if (filters.placeTypes.length > 0) count++;
    if (filters.bedrooms !== null) count++;
    if (filters.beds !== null) count++;
    if (filters.bathrooms !== null) count++;
    if (filters.propertyTypes.length > 0) count++;
    return count;
  }, [filters]);

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 50000],
      placeTypes: [],
      bedrooms: null,
      beds: null,
      bathrooms: null,
      propertyTypes: [],
      ratings:[]
    });
    setSelectedCategory(null);
  };

const filteredHotels = useMemo(() => {
    let result = [...DEMO_HOTELS];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(
        (hotel) =>
          hotel.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }

    // Filter by price range
    result = result.filter((hotel) => {
      const minPrice = hotel.roomTypes.reduce((min, room) => {
        const roomMin = room.plans.reduce(
          (pMin, plan) => Math.min(pMin, plan.discountedPrice),
          Infinity
        );
        return Math.min(min, roomMin);
      }, Infinity);
      return (
        minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1]
      );
    });

    // Sort
    // switch (sortBy) {
    //   case "price-low":
    //     result.sort((a, b) => {
    //       const aMin = a.roomTypes.reduce(
    //         (min, r) =>
    //           Math.min(
    //             min,
    //             r.plans.reduce((m, p) => Math.min(m, p.discountedPrice), Infinity)
    //           ),
    //         Infinity
    //       );
    //       const bMin = b.roomTypes.reduce(
    //         (min, r) =>
    //           Math.min(
    //             min,
    //             r.plans.reduce((m, p) => Math.min(m, p.discountedPrice), Infinity)
    //           ),
    //         Infinity
    //       );
    //       return aMin - bMin;
    //     });
    //     break;
    //   case "price-high":
    //     result.sort((a, b) => {
    //       const aMin = a.roomTypes.reduce(
    //         (min, r) =>
    //           Math.min(
    //             min,
    //             r.plans.reduce((m, p) => Math.min(m, p.discountedPrice), Infinity)
    //           ),
    //         Infinity
    //       );
    //       const bMin = b.roomTypes.reduce(
    //         (min, r) =>
    //           Math.min(
    //             min,
    //             r.plans.reduce((m, p) => Math.min(m, p.discountedPrice), Infinity)
    //           ),
    //         Infinity
    //       );
    //       return bMin - aMin;
    //     });
    //     break;
    //   default:
    //     // Latest - keep original order
    //     break;
    // }

    return result;
  }, [DEMO_HOTELS, selectedCategory, filters]);

  const columns = [
    {
      key: "image",
      label: "Name",
      render: (record) => (
        <div className="flex items-center gap-3">
          <img src={record.image} className="w-16 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-medium line-clamp-1">{record.name}</p>
          </div>
        </div>
      ),
    },
    { key: "location", label: "Location" },
    { key: "reviews", label: "Review's" },
    { key: "rating", label: "Rating's" },
    {
      key: "price",
      label: "Base Price",
      render: (record) => (
        <div className="flex items-center gap-3">
          <p className="font-medium line-clamp-1">{'Rs.' + record?.price}</p>
        </div>
      )
    },
    {
      key: "action",
      label: "Action",
      className: "text-center",
      render: (record) => (
        <div className="flex items-center gap-2 ">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleViewHotel(record);
            }}
            size="sm"
            className="bg-accent hover:bg-accent/90"
          >
            Book Now
          </Button>
        </div>
      ),
    },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    DEMO_HOTELS?.forEach((hotel) => {
      const category = hotel?.description && hotel?.description?.toLowerCase()?.replace(/\s+/g, "-");
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [DEMO_HOTELS]);

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
            <HotelFilters
            filters={filters}
            onFiltersChange={(f) => {
              setFilters(f);
              setCurrentPage(1);
            }}
            onClearAll={clearAllFilters}
            activeFiltersCount={activeFiltersCount}
          />
          </aside>

          {/* Hotel Listings */}
          <div className="flex-1 container mx-auto p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {filteredHotels.length} Properties Found
              </h2>
              <div className="flex items-center border rounded-lg p-1 gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="gap-1.5"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Card View
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="gap-1.5"
                >
                  <List className="h-4 w-4" />
                  List View
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="gap-1.5"
                >
                  <TableIcon className="h-4 w-4" />
                  Table View
                </Button>
              </div>
            </div>
            <CustomCategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              categoryCounts={categoryCounts}
            />
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels?.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} onBook={handleViewHotel} />
                ))}
              </div>
            ) : viewMode == 'list' ? (
              <div className="space-y-4">
                {filteredHotels?.map((hotel) => (
                  <HotelListItem key={hotel.id} hotel={hotel} onBook={handleViewHotel} />
                ))}
              </div>
            ) : <DynamicTable totalItems={10} columns={columns} data={filteredHotels} />}
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
