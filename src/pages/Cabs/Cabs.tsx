import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CabCard, Cab } from "@/components/CabCard";
import { CabFilters } from "@/components/CabFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Car, MapPin, Clock, DollarSign } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import sedan1 from "@/assets/sedan-1.jpg";
import suv1 from "@/assets/suv-1.jpg";
import suv2 from "@/assets/suv-2.jpg";
import luxury1 from "@/assets/luxury-1.jpg";
import mini1 from "@/assets/mini-1.jpg";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { getCabsListing } from "@/api/cab";
import { toast } from "sonner";

const Cabs = () => {
  const navigate = useNavigate();
  const [initialCabs,setInitialCabs] = useState([])
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("price-low");
  const [searchQuery, setSearchQuery] = useState("");

  const listApi = async () => {
      let data = await getCabsListing();
      if(data.error){
        toast.warning(data.error)
      }else{
        setInitialCabs(data || [])
      }
    }
    useEffect(() => {
      listApi();
    }, []);

  // Map images to cabs
  const cabsWithImages = initialCabs && initialCabs?.map((cab) => {
    let image = sedan1;
    if (cab.car_type === "SUV") {
      image = cab.id === "5" ? suv2 : suv1;
    } else if (cab.car_type === "Luxury") {
      image = luxury1;
    } else if (cab.car_type === "Mini") {
      image = mini1;
    }
    return { ...cab, image };
  });

  const handleBook = (cab: Cab) => {
    navigate("/booking", { state: { cab } });
  };

  // Filter cabs
  let filteredCabs = cabsWithImages.filter((cab) => {
    const matchesType = selectedType === "All" || cab.car_type === selectedType;
    const matchesSearch =
      cab.car_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cab.car_type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Sort cabs
  filteredCabs = [...filteredCabs].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "capacity":
        return b.capacity - a.capacity;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
  {/* Hero Section */}
      <HeroSection pageType="cab" />
      {/* Search Bar */}
            <div className="container mx-auto px-4">
              <SearchBar onSearch={(e)=>{}} pageType="cab" />
            </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Available Cabs
          </h2>
          <p className="text-muted-foreground">
            {filteredCabs.length} cabs available for booking
          </p>
        </div>

        <CabFilters
          selectedType={selectedType}
          sortBy={sortBy}
          onTypeChange={setSelectedType}
          onSortChange={setSortBy}
        />

        {/* Cabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCabs.map((cab) => (
            <CabCard key={cab.id} cab={cab} onBook={handleBook} />
          ))}
        </div>

        {filteredCabs.length === 0 && (
          <div className="text-center py-16">
            <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No cabs found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}

      </main>
      <div className="max-w-7xl mx-auto px-4 py-12">
       <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our Cabs?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Door to Door Service</h3>
                  <p className="text-sm text-muted-foreground">Pick up and drop at your preferred location</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">24/7 Availability</h3>
                  <p className="text-sm text-muted-foreground">Book anytime, travel anytime</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Best Prices</h3>
                  <p className="text-sm text-muted-foreground">Transparent pricing with no hidden charges</p>
                </div>
              </div>
            </div>
          </Card>
      </div>
    </div>
  );
};

export default Cabs;
