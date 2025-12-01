import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";

const TourPackages = () => {
  const packages = [
    {
      name: "Tropical Paradise",
      destination: "Maldives & Seychelles",
      duration: "7 Days",
      people: "2-4 People",
      price: "$2,499",
      features: ["5-Star Hotels", "Island Hopping", "Water Sports", "All Meals"],
    },
    {
      name: "European Adventure",
      destination: "Paris, Rome & Barcelona",
      duration: "10 Days",
      people: "2-6 People",
      price: "$3,299",
      features: ["City Tours", "Museum Passes", "Train Travel", "Breakfast"],
    },
    {
      name: "Mountain Retreat",
      destination: "Swiss Alps",
      duration: "5 Days",
      people: "2-4 People",
      price: "$1,899",
      features: ["Mountain Lodge", "Skiing", "Spa Access", "Meals"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tour Packages
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated experiences for unforgettable adventures
            </p>
          </div>

          <div className="space-y-6">
            {packages.map((pkg) => (
              <Card key={pkg.name} className="p-6 hover:shadow-medium transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex flex-wrap gap-4 mb-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{pkg.destination}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{pkg.people}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:border-l lg:pl-6 flex flex-col justify-between items-center lg:items-end text-center lg:text-right">
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                      <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                    <Button size="lg" className="w-full lg:w-auto">
                      Book Package
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Custom Packages Available</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Let us create a personalized tour package just for you.
              </p>
              <Button size="lg" variant="outline">
                Request Custom Package
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TourPackages;
