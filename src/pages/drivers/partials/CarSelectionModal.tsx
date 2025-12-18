import { useGetCabsQuery } from "@/app/services/cabApi";
import { CustomInput } from "@/components/custom-ui";
import { CustomSelectOption } from "@/components/custom-ui/CustomSelectOption";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WORLD_CAR_TYPES } from "@/data/listConstant";
import { Briefcase, Check, Fuel, Music, Navigation, Search, Settings, Users, Wind } from "lucide-react";
import { useState } from "react";
import { Car } from "../../../data/types";
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;
interface CarSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // cars: Car[];
  selectedCarId: string | null;
  onSelect: (car: Car) => void;
}

export function CarSelectionModal({ open, onOpenChange, selectedCarId, onSelect }: CarSelectionModalProps) {
    const [filters,setFilters] = useState({
    car_type:'',
    search:''
  })
  const {data} = useGetCabsQuery(filters);

  let onChange=(e)=>setFilters(pre => ({...pre,search:e.target.value}));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose Car</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center sm:flex-row gap-3">
              <CustomInput
                id={'search'}
                placeholder="Search cars......."
                register={()=> ({onChange})}
                prefix={<Search size={18} />}
              />
              <CustomSelectOption
                    // id="car_type"
                    required={false}
                    options={WORLD_CAR_TYPES}
                    onChange={(value)=>setFilters(pre =>({...pre,car_type:value}))}
                    value={filters.car_type}
                    searchable
                    placeholder="Choose filter's"
                />
          </div>

          {/* Cars Grid */}
          <div className="overflow-y-auto max-h-[50vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.data && data?.data?.cars?.map((car) => (
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
                            src={API_URL+car.images?.find(res => res.is_main == true)?.image_url}
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
                          ₹ {car?.fare_rules?.base_fare ? Number.parseFloat(car?.fare_rules?.base_fare)?.toFixed(2) : "00.00"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {data && data?.data?.cars?.length === 0 && (
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
