import { useState } from "react";
import { Car, Building2, Package, Search, Calendar, MapPin, Users, Star, Plane, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-travel.jpg";

type BookingType = "cab" | "hotel" | "package";

const HomeHeroSection = () => {
  const [activeTab, setActiveTab] = useState<BookingType>("hotel");

  const tabs = [
    { id: "cab" as const, label: "Cab", icon: Car },
    { id: "hotel" as const, label: "Hotels", icon: Building2 },
    { id: "package" as const, label: "Packages", icon: Package },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tropical paradise destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-accent/20 blur-xl animate-float hidden lg:block" />
      <div className="absolute bottom-1/3 left-10 w-32 h-32 rounded-full bg-primary/20 blur-xl animate-float-delayed hidden lg:block" />

{/* Animated Floating Cards */}
      <div className="absolute top-32 left-8 z-20 hidden xl:block animate-float">
        <div className="bg-primary/50  rounded-2xl p-4 shadow-elevated border border-border/50 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Car className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Cab Booking</p>
              <p className="text-xs text-white">500+ cities</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-orange-700 text-orange-700" />
            ))}
            <span className="text-xs text-white ml-2">4.9 avg rating</span>
          </div>
        </div>
      </div>
      <div className="absolute top-48 right-8 z-20 hidden xl:block animate-float-delayed">
        <div className="bg-primary/50 rounded-2xl p-4 shadow-elevated border border-border/50 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Building2 className="w-6 h-6 " />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Hotel Booking</p>
              <p className="text-xs text-white">Premium stays</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-orange-700 text-orange-700" />
            ))}
            <span className="text-xs text-white ml-2">4.9 avg rating</span>
          </div>
        </div>
      </div>

    <div className="absolute bottom-40 left-12 z-20 hidden xl:block animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-primary/50 rounded-2xl p-4 shadow-elevated border border-border/50 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Tour Packages</p>
              <p className="text-xs text-white">All-inclusive deals</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs bg-primary/80 text-white px-2 py-1 rounded-full font-medium">30% OFF</span>
            <span className="text-xs text-white">Limited time</span>
          </div>
        </div>
    </div>

      <div className="absolute top-48 right-8 z-20 hidden xl:block animate-float-delayed">
        <div className="bg-primary/50 backdrop-blur-xl rounded-2xl p-4 shadow-elevated border border-border/50 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Hotel Booking</p>
              <p className="text-xs text-white">Premium stays</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-orange-700 text-orange-700" />
            ))}
            <span className="text-xs text-white ml-2">4.9 avg rating</span>
          </div>
        </div>
      </div>

       <div className="absolute bottom-32 right-20 z-20 hidden xl:block animate-float-delayed" style={{ animationDelay: '0.5s' }}>
        <div className="bg-primary/50 rounded-2xl p-4 shadow-elevated border border-border/50 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-white">Book fast or easy</p>
              <p className="text-sm font-semibold text-white">Any where trip or stay</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs bg-primary/80 text-white px-2 py-1 rounded-full font-medium">30% OFF</span>
            <p className="text-xs text-white ">Just 2 minute</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/20 backdrop-blur-md border border-card/30 text-card mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
            <span className="text-sm font-medium">Explore the world with us</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-card leading-tight mb-6 animate-slide-up">
            Discover Your Next
            <span className="block mt-2">
              <span className="text-accent">Adventure</span> Awaits
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-card/80 max-w-2xl mx-auto mb-12 animate-slide-up-delayed">
            Book cabs, hotels, and tour packages with ease. Create unforgettable memories with our curated travel experiences.
          </p>

            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "gradient-accent text-accent-foreground shadow-lg"
                      : "bg-secondary text-black-foreground hover:bg-secondary"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              ))}
            </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 animate-fade-in">
            {[
              { value: "500+", label: "Destinations" },
              { value: "100K+", label: "Happy Travelers" },
              { value: "4.9", label: "Rating" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-card">{stat.value}</div>
                <div className="text-sm text-card/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-card/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-card/80" />
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
