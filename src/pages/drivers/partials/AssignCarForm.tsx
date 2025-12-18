import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Car as CarIcon, Fuel, Plus, Users, X } from "lucide-react";
import { useState } from "react";
import { Car } from "../../../data/types";
import { CarSelectionModal } from "../partials/CarSelectionModal";
import { FeatureChips } from "./FeatureChips";
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;

interface AssignCarFormProps {
  initialCarId?: string | null;
  onSubmit: (assigned_car_id: string | null) => void;
  onBack: () => void;
}

export function AssignCarForm({ initialCarId, onSubmit, onBack }: AssignCarFormProps) {
  const [selectedCar, setSelectedCar] = useState<Car>({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(false);
  };

  const handleSubmit = () => {
    onSubmit(selectedCar?.id || null);
  };
console.log(selectedCar,)
 const carImageUrl = selectedCar && selectedCar?.images?.find(res => res.is_main == true)?.image_url;
  return (
    <div className="space-y-6 mb-4">
      <div className="flex justify-between gap-4 absolute top-2.5 right-12">
        <Button type="button" variant="outline" onClick={onBack} size="sm">
          Back
        </Button>
        <Button onClick={handleSubmit} size="sm">Complete Registration</Button>
      </div>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CarIcon className="w-5 h-5 text-primary" />
            Assign Vehicle
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Select a vehicle to assign to this driver. This step is optional.
          </p>
        </CardHeader>
        <CardContent>
          {carImageUrl ? (
            <div className="border rounded-lg p-4 bg-muted/30">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Car Image */}
                <div className="w-full sm:w-48 h-32 bg-muted rounded-lg overflow-hidden">
                  {carImageUrl ? (
                    <img
                      src={API_URL+carImageUrl}
                      alt={selectedCar.car_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CarIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Car Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedCar.car_name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {selectedCar.car_type}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedCar(null)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedCar.seat_capacity} Seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedCar.bag_capacity} Bags</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedCar.fuel_type}</span>
                    </div>
                    <div className="text-primary font-semibold text-sm">
                      ₹ {selectedCar?.fare_rules?.base_fare ? Number.parseFloat(selectedCar?.fare_rules?.base_fare)?.toFixed(2) : "00.00"}
                    </div>
                  </div>

                  {/* Features */}
                  <FeatureChips selectedCar={selectedCar}/>

                  <Button variant="default" size="sm" className="mt-4" onClick={() => setModalOpen(true)}>
                    Change Vehicle
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center hover:border-primary/50 hover:bg-muted/30 transition-colors"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <p className="font-medium">Select a Vehicle</p>
              <p className="text-sm text-muted-foreground mt-1">Click to browse available cars</p>
            </button>
          )}
        </CardContent>
      </Card>
      <CarSelectionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedCarId={selectedCar?.id || null}
        onSelect={handleCarSelect}
      />
    </div>
  );
}
