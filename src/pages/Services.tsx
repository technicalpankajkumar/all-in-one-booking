import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Hotel, Compass, Phone, CreditCard, Shield, Headphones, Calendar } from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: Car,
      title: "Cab Booking",
      description: "Book reliable cabs for airport transfers, city tours, or outstation travel with competitive rates and professional drivers.",
      features: ["24/7 Availability", "Multiple Vehicle Options", "GPS Tracking", "Transparent Pricing"],
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      description: "Access to thousands of hotels worldwide, from budget-friendly options to luxury resorts with exclusive deals.",
      features: ["Best Price Guarantee", "Instant Confirmation", "Free Cancellation", "Verified Reviews"],
    },
    {
      icon: Compass,
      title: "Tour Packages",
      description: "Carefully curated tour packages covering popular destinations with all-inclusive pricing and flexible itineraries.",
      features: ["Expert Guides", "Custom Packages", "Group Discounts", "Travel Insurance"],
    },
  ];

  const additionalServices = [
    { icon: Phone, title: "24/7 Support", description: "Round-the-clock customer support for all your travel needs" },
    { icon: CreditCard, title: "Easy Payments", description: "Multiple payment options with secure transactions" },
    { icon: Shield, title: "Travel Insurance", description: "Comprehensive travel insurance for peace of mind" },
    { icon: Headphones, title: "Travel Assistance", description: "Expert help with visa, documentation, and more" },
    { icon: Calendar, title: "Flexible Booking", description: "Easy booking modifications and cancellations" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive travel solutions for every journey
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {mainServices.map((service, index) => (
              <Card key={service.title} className="p-8 hover:shadow-medium transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex p-4 bg-gradient-to-br from-primary to-accent rounded-xl">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button size="lg">Explore</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Additional Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service) => (
                <Card key={service.title} className="p-6 hover:shadow-medium transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our travel experts are here to help you plan the perfect trip. Get in touch with us for personalized recommendations.
            </p>
            <Button size="lg">Contact Us</Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Services;
