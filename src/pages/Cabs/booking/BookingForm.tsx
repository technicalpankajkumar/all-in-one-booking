import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Users, Plus, Trash2, Car, CreditCard } from "lucide-react";
import { BookingFormData, Passenger } from "../../../data/types";
import { toast } from "sonner";
import { CustomInput, CustomSelect } from "@/components/custom-ui";
import { getCabById } from "@/api/cab";

// Mock data for cars
const mockCars = [
  { id: "car1", name: "Toyota Innova", price_per_km: 12 },
  { id: "car2", name: "Swift Dzire", price_per_km: 8 },
  { id: "car3", name: "Honda City", price_per_km: 10 },
];

export function BookingForm() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [carDetails,setCardDetails] = useState({})
  const [formData, setFormData] = useState<BookingFormData>({
    from_location: "",
    to_location: "",
    travel_date: undefined,
    trip_type: "one_way",
    travel_time:"",
    passengers: [{ name: "", age: 0, gender: "male" }],
    payment_method: "Cash",
    car_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCar = async(id)=>{
    let car = await getCabById(id);
    setCardDetails(car)
  }

  useEffect(()=>{
     getCar(id)
  },[id])

  const addPassenger = () => {
    if (formData.passengers.length < 6) {
      setFormData({
        ...formData,
        passengers: [...formData.passengers, { name: "", age: 0, gender: "male" }],
      });
    } else {
      toast.error("Maximum 6 passengers allowed");
    }
  };

  const removePassenger = (index: number) => {
    if (formData.passengers.length > 1) {
      const newPassengers = formData.passengers.filter((_, i) => i !== index);
      setFormData({ ...formData, passengers: newPassengers });
    }
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    const newPassengers = [...formData.passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setFormData({ ...formData, passengers: newPassengers });
  };

  const calculatePrice = () => {
    const selectedCar = mockCars.find((c) => c.id === formData.car_id);
    if (!selectedCar) return 0;
    const baseDistance = 100; // Mock distance
    const multiplier = formData.trip_type === "round_trip" ? 2 : 1;
    return baseDistance * selectedCar.price_per_km * multiplier;
  };
  console.log(carDetails)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.from_location || !formData.to_location) {
      toast.error("Please enter pickup and drop locations");
      return;
    }
    if (!formData.travel_date) {
      toast.error("Please select a travel date");
      return;
    }
    if (formData.passengers.some((p) => !p.name || p.age <= 0)) {
      toast.error("Please fill all passenger details");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    const bookingData = {
      ...formData,
      distance_km: 100, // Mock distance
    //   total_price: calculatePrice(),
      total_price:carDetails?.base_price || 0,
      booking_status: "Booked",
      payment_status: "Pending",
      travel_time: "3 hr 25 min", // Mock travel time
    };

    // Store booking data in sessionStorage for payment page
    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Booking created! Redirecting to payment...");
      navigate(`/booking/${id}/payment`);
    }, 1000);
  };

  const handleOnChange=(e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 pt-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            Trip Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
               <CustomInput
                    id="from_location"
                    label="Pickup Location"
                    required
                    placeholder="Enter Pickup Location"
                    value={formData.from_location}
                    register={()=>({
                        onChange:handleOnChange
                    })}
                    errors={{}}
                />
                <CustomInput
                    id="to_location"
                    label="Drop Location"
                    required
                    placeholder="Enter Drop Location"
                    value={formData.to_location}
                    register={()=>({
                        onChange:handleOnChange
                    })}
                    errors={{}}
                />
                <CustomInput
                    id="travel_date"
                    label="Pick a date"
                    required
                    type="date"
                    value={formData.travel_date}
                    register={()=>({
                        onChange:handleOnChange
                    })}
                />
                <CustomInput
                    id="travel_time"
                    label="Travel Time"
                    required
                    type="time"
                    placeholder="Choose travel time"
                    value={formData.travel_time}
                    register={()=>({
                        onChange:handleOnChange
                    })}
                    errors={{}}
                />
                <CustomSelect
                    id="trip_type"
                    label="Trip Type"
                    required
                    items={[
                        { value: "one_way", label: "On Way" },
                        { value: "round_trip", label: "Round Trip" },
                    ]}
                    setValue={(name,value)=>{
                        setFormData({ ...formData, trip_type: value })
                    }}
                    value={formData.trip_type}
                    errors={{}}
                />
          </div>
        </CardContent>
      </Card>
      {/* Passengers Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 pt-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            Passengers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.passengers.map((passenger, index) => (
            <div key={index} className="flex gap-3 items-end p-4 border rounded-lg bg-muted/30">
              <div className="flex-1 space-y-2">
                <CustomInput
                    id="name"
                    label="Name"
                    required
                    placeholder="Enter Passenger Name"
                    value={passenger.name}
                    register={()=>({
                        onChange:(e)=>updatePassenger(index, "name", e.target.value)
                    })}
                    errors={{}}
                />
              </div>
              <div className="w-20 space-y-2">
                <CustomInput
                    id="age"
                    label="Age"
                    required
                    placeholder="Enter Passenger age"
                    value={passenger.age || ""}
                    register={()=>({
                        onChange:(e)=>updatePassenger(index, "age", parseInt(e.target.value) || 0)
                    })}
                    errors={{}}
                    type="number"
                    min={1}
                    max={100}
                />
                
              </div>
              <div className="w-32 space-y-2">
                <CustomSelect
                    id="gender"
                    label="Gender"
                    required
                    items={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" }
                    ]}
                    setValue={(name,value)=>{
                        updatePassenger(index, "gender", value)
                    }}
                    value={passenger.gender}
                    errors={{}}
                />
              </div>
              {formData.passengers.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removePassenger(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addPassenger}
            className="w-full"
            disabled={formData.passengers.length >= 6}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Passenger ({formData.passengers.length}/6)
          </Button>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 pt-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.payment_method}
            onValueChange={(value: "Cash" | "UPI" | "Card") =>
              setFormData({ ...formData, payment_method: value })
            }
            className="grid grid-cols-3 gap-4"
          >
            {["Cash", "UPI", "Card"].map((method) => (
              <div key={method}>
                <RadioGroupItem
                  value={method}
                  id={method}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={method}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  {method}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Price Summary */}
      {formData.car_id && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">Estimated Total:</span>
              <span className="text-2xl font-bold text-primary">₹{calculatePrice()}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Based on estimated distance of 100 km
            </p>
          </CardContent>
        </Card>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Creating Booking..." : "Proceed to Payment"}
      </Button>
    </form>
  );
}
