
import { useState } from "react";
import { tourPackage } from "../data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, User, Mail, Phone, Users, Plus, Trash2, MapPin, Clock, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PackageBookingModalProps {
  tour: tourPackage | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Traveler {
  id: string;
  name: string;
  age: string;
  gender: string;
}

const PackageBookingModal = ({ tour, isOpen, onClose }: PackageBookingModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [travelDate, setTravelDate] = useState<Date>();
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [travelers, setTravelers] = useState<Traveler[]>([
    { id: "1", name: "", age: "", gender: "" },
  ]);

  if (!tour) return null;

  const addTraveler = () => {
    if (travelers.length < 10) {
      setTravelers([
        ...travelers,
        { id: Date.now().toString(), name: "", age: "", gender: "" },
      ]);
    }
  };

  const removeTraveler = (id: string) => {
    if (travelers.length > 1) {
      setTravelers(travelers.filter((t) => t.id !== id));
    }
  };

  const updateTraveler = (id: string, field: keyof Traveler, value: string) => {
    setTravelers(
      travelers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const totalPrice = tour.price * travelers.length;

  const handleSubmit = () => {
    // Validate contact details
    if (!contactDetails.name || !contactDetails.email || !contactDetails.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all contact details.",
        variant: "destructive",
      });
      return;
    }

    // Validate travel date
    if (!travelDate) {
      toast({
        title: "Select Travel Date",
        description: "Please select your preferred travel date.",
        variant: "destructive",
      });
      return;
    }

    // Validate travelers
    const invalidTravelers = travelers.some(
      (t) => !t.name || !t.age || !t.gender
    );
    if (invalidTravelers) {
      toast({
        title: "Incomplete Traveler Details",
        description: "Please fill in all traveler information.",
        variant: "destructive",
      });
      return;
    }

    // Success
    toast({
      title: "Booking Submitted! 🎉",
      description: `Your booking for ${tour.name} has been received. We'll contact you shortly.`,
    });

    // Reset and close
    setStep(1);
    setTravelDate(undefined);
    setContactDetails({ name: "", email: "", phone: "", address: "" });
    setTravelers([{ id: "1", name: "", age: "", gender: "" }]);
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Book Your Trip
          </DialogTitle>
          <DialogDescription>
            Complete the booking form for {tour.name}
          </DialogDescription>
        </DialogHeader>

        {/* Tour Summary */}
        <div className="bg-muted rounded-xl p-4 flex gap-4">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-24 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{tour.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              {tour.destination}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {tour.duration}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Per person</div>
            <div className="text-xl font-bold text-primary">
              ₹{tour.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 my-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-12 h-1 mx-1",
                    step > s ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-xs text-muted-foreground mb-4">
          <span className={step >= 1 ? "text-primary font-medium" : ""}>Contact</span>
          <span className={step >= 2 ? "text-primary font-medium" : ""}>Travelers</span>
          <span className={step >= 3 ? "text-primary font-medium" : ""}>Confirm</span>
        </div>

        {/* Step 1: Contact Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Contact Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={contactDetails.name}
                  onChange={(e) =>
                    setContactDetails({ ...contactDetails, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={contactDetails.email}
                    onChange={(e) =>
                      setContactDetails({ ...contactDetails, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    value={contactDetails.phone}
                    onChange={(e) =>
                      setContactDetails({ ...contactDetails, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Travel Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !travelDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {travelDate ? format(travelDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={travelDate}
                      onSelect={setTravelDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <Input
                id="address"
                placeholder="Your address for pickup"
                value={contactDetails.address}
                onChange={(e) =>
                  setContactDetails({ ...contactDetails, address: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)}>
                Next: Add Travelers
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Traveler Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Traveler Details ({travelers.length})
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={addTraveler}
                disabled={travelers.length >= 10}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Traveler
              </Button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {travelers.map((traveler, index) => (
                <div
                  key={traveler.id}
                  className="bg-muted/50 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Traveler {index + 1}
                    </span>
                    {travelers.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTraveler(traveler.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-1">
                      <Label className="text-xs">Full Name *</Label>
                      <Input
                        placeholder="Traveler name"
                        value={traveler.name}
                        onChange={(e) =>
                          updateTraveler(traveler.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Age *</Label>
                      <Input
                        type="number"
                        placeholder="Age"
                        min="1"
                        max="120"
                        value={traveler.age}
                        onChange={(e) =>
                          updateTraveler(traveler.id, "age", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Gender *</Label>
                      <Select
                        value={traveler.gender}
                        onValueChange={(value) =>
                          updateTraveler(traveler.id, "gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>
                Next: Review Booking
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              Review Your Booking
            </h4>

            {/* Contact Summary */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h5 className="text-sm font-medium text-foreground mb-2">Contact Details</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  <span className="text-foreground">{contactDetails.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="text-foreground">{contactDetails.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  <span className="text-foreground">{contactDetails.phone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Travel Date:</span>{" "}
                  <span className="text-foreground">
                    {travelDate ? format(travelDate, "PPP") : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Travelers Summary */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h5 className="text-sm font-medium text-foreground mb-2">
                Travelers ({travelers.length})
              </h5>
              <div className="space-y-2">
                {travelers.map((traveler, index) => (
                  <div
                    key={traveler.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-foreground">
                      {index + 1}. {traveler.name || "Not specified"}
                    </span>
                    <span className="text-muted-foreground">
                      {traveler.age} yrs, {traveler.gender}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <h5 className="text-sm font-medium text-foreground mb-3">Price Summary</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Package Price × {travelers.length} travelers
                  </span>
                  <span className="text-foreground">
                    ₹{tour.price.toLocaleString()} × {travelers.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="text-foreground">Included</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button variant="default" onClick={handleSubmit}>
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PackageBookingModal;
