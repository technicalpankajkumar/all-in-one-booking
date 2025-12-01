import HeroSection from "@/components/HeroSection";
import BookingModal from "@/components/PackageBookingModal";
import FilterSidebar from "@/components/PackageFilterSidebar";
import { SearchBar, SearchParams } from "@/components/SearchBar";
import TourCard from "@/components/TourCard";
import TourTable from "@/components/TourTable";
import ViewToggle from "@/components/ViewToggle";
import { tourPackages } from "@/data/tours";
import { useMemo, useState } from "react";
import { FilterState,tourPackage, ViewMode } from "../data/types";

const TourPackage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedTour, setSelectedTour] = useState<tourPackage | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: [0, 60000],
    minRating: 0,
    isAC: null,
    mealsIncluded: null,
    hotelStar: null,
    travelType: null,
  });

  const filteredTours = useMemo(() => {
    return tourPackages.filter((tour) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          tour.name.toLowerCase().includes(searchLower) ||
          tour.destination.toLowerCase().includes(searchLower) ||
          tour.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Price range filter
      if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && tour.rating < filters.minRating) {
        return false;
      }

      // AC filter
      if (filters.isAC !== null && tour.isAC !== filters.isAC) {
        return false;
      }

      // Meals filter
      if (filters.mealsIncluded !== null && tour.mealsIncluded !== filters.mealsIncluded) {
        return false;
      }

      // Hotel star filter
      if (filters.hotelStar !== null && tour.hotelStar !== filters.hotelStar) {
        return false;
      }

      // Travel type filter
      if (filters.travelType !== null && tour.travelType !== filters.travelType) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleBookNow = (tour: tourPackage) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection pageType="tour" />
        {/* Search Bar */}
        <div className="container mx-auto px-4">
          <SearchBar onSearch={setSearchParams} pageType="tour" />
        </div>
        {/* Packages Section */}
        <section id="packages" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />

              <div className="flex-1">
                <ViewToggle
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  resultCount={filteredTours.length}
                />

                {filteredTours.length === 0 ? (
                  <div className="bg-card rounded-2xl p-12 text-center shadow-card">
                    <p className="text-muted-foreground text-lg">
                      No tour packages found matching your criteria.
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTours.map((tour, index) => (
                      <div
                        key={tour.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <TourCard tour={tour} onBookNow={handleBookNow} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <TourTable tours={filteredTours} onBookNow={handleBookNow} />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Booking Modal */}
      <BookingModal
        tour={selectedTour}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default TourPackage;
