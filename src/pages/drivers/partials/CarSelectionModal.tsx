import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Car } from "../../../data/types";
import { Search, Users, Briefcase, Fuel, Check, Settings, Music, Navigation, Wind } from "lucide-react";
import { CustomInput } from "@/components/custom-ui";

interface CarSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cars: Car[];
  selectedCarId: string | null;
  onSelect: (car: Car) => void;
}

export function CarSelectionModal({ open, onOpenChange, cars, selectedCarId, onSelect }: CarSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const carTypes = ["Mini", "Sedan", "SUV"];

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.car_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.car_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? car.car_type === selectedType : true;
    return matchesSearch && matchesType && car.is_available;
  });

  let onChange=(e)=>setSearchTerm(e.target.value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose Car</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <CustomInput
                id={'search'}
                placeholder="Search cars......."
                register={()=> ({onChange})}
                prefix={<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
              />
            </div>
            <div className="flex gap-2">
              {carTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Cars Grid */}
          <div className="overflow-y-auto max-h-[50vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCars.map((car) => (
                <Card
                  key={car.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCarId === car.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => onSelect(car)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Car Image */}
                      <div className="w-24 h-24 sm:w-32 sm:h-24 bg-muted rounded-lg overflow-hidden shrink-0">
                        {car?.images?.[0] ? (
                          <img
                            src={"http://localhost:5000"+car.images?.find(res => res.is_main == true)?.image_url}
                            alt={car.car_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Car Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold truncate">{car?.car_name}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {car?.car_type}
                            </Badge>
                          </div>
                          {selectedCarId === car?.id && (
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {car?.seat_capacity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {car?.bag_capacity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Fuel className="w-4 h-4" />
                            {car?.fuel_type}
                          </span>
                        </div>

                        {/* Features */}
                        {car?.features && (
                          <div className="flex gap-2 mt-2">
                            {car?.features?.ac && (
                              <span className="text-xs bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                                <Wind className="w-3 h-3" /> AC
                              </span>
                            )}
                            {car?.features?.gps && (
                              <span className="text-xs bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                                <Navigation className="w-3 h-3" /> GPS
                              </span>
                            )}
                            {car?.features?.music_system && (
                              <span className="text-xs bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                                <Music className="w-3 h-3" /> Music
                              </span>
                            )}
                            {car?.features?.automatic_transmission && (
                              <span className="text-xs bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                                <Settings className="w-3 h-3" /> Auto
                              </span>
                            )}
                          </div>
                        )}

                        <p className="text-primary font-semibold mt-2">
                          ₹{car.base_price}/{car.price_unit.replace("per_", "")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No cars found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
