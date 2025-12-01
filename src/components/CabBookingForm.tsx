import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { CalendarIcon, MapPin, Clock, User, Phone, Mail, Users, Car, CreditCard, FileText } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  // Trip Details
  from_location: z.string().min(2, "Starting point is required").max(100),
  to_location: z.string().min(2, "Destination is required").max(100),
  travel_date: z.date({ required_error: "Travel date is required" }),
  travel_time: z.string().min(1, "Travel time is required"),
  trip_type: z.enum(["one-way", "round-trip"]),
  
  // Distance & Pricing
  distance_km: z.coerce.number().min(1, "Distance must be at least 1 km"),
  base_price: z.coerce.number().min(0),
  included_km: z.coerce.number().min(0),
  extra_km_charge: z.coerce.number().min(0),
  
  // Passenger Details
  customer_name: z.string().min(2, "Name is required").max(100),
  mobile_number: z.string().regex(/^[0-9]{10}$/, "Enter valid 10-digit mobile number"),
  email: z.string().email("Enter valid email address").max(255),
  no_of_passengers: z.coerce.number().min(1, "At least 1 passenger required").max(20),
  
  // Vehicle Information
  car_type: z.enum(["Sedan", "SUV", "Mini", "Luxury"]),
  car_number: z.string().min(1, "Car number is required").max(20),
  driver_name: z.string().min(2, "Driver name is required").max(100),
  driver_phone: z.string().regex(/^[0-9]{10}$/, "Enter valid 10-digit phone number"),
  
  // Payment Details
  payment_method: z.enum(["Cash", "UPI", "Online", "Card"]),
  advance_amount: z.coerce.number().min(0),
  
  // Metadata
  notes: z.string().max(500).optional(),
});

type CabBookingFormData = z.infer<typeof bookingSchema>;

interface CabBookingFormProps {
  selectedCab?: {
    name: string;
    type: string;
    price: number;
  };
  onSubmit?: (data: CabBookingFormData & { booking_id: string; total_price: number; amount_due: number }) => void;
}

export default function CabBookingForm({ selectedCab, onSubmit }: CabBookingFormProps) {
  const form = useForm<CabBookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      trip_type: "one-way",
      distance_km: 10,
      base_price: selectedCab?.price || 500,
      included_km: 10,
      extra_km_charge: 15,
      car_type: (selectedCab?.type as any) || "Sedan",
      payment_method: "Cash",
      advance_amount: 0,
      no_of_passengers: 1,
    },
  });

  const watchDistance = form.watch("distance_km");
  const watchIncludedKm = form.watch("included_km");
  const watchExtraKmCharge = form.watch("extra_km_charge");
  const watchBasePrice = form.watch("base_price");
  const watchAdvanceAmount = form.watch("advance_amount");

  const calculateTotalPrice = () => {
    const distance = watchDistance || 0;
    const included = watchIncludedKm || 0;
    const base = watchBasePrice || 0;
    const extraCharge = watchExtraKmCharge || 0;

    if (distance <= included) {
      return base;
    } else {
      const extraKm = distance - included;
      return base + (extraKm * extraCharge);
    }
  };

  const totalPrice = calculateTotalPrice();
  const amountDue = Math.max(0, totalPrice - (watchAdvanceAmount || 0));

  const handleFormSubmit = (data: CabBookingFormData) => {
    const bookingId = `BK${Date.now()}`;
    const completeData = {
      ...data,
      booking_id: bookingId,
      total_price: totalPrice,
      amount_due: amountDue,
      booking_status: "Pending" as const,
    };

    if (onSubmit) {
      onSubmit(completeData);
    } else {
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Booking ID: ${bookingId} | Total: ₹${totalPrice}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Trip Details */}
        <div className="card-gradient rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Trip Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="from_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter starting point" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter destination" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="travel_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Travel Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="travel_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="trip_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trip Type</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-way" id="one-way" />
                      <label htmlFor="one-way" className="cursor-pointer">One-way</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="round-trip" id="round-trip" />
                      <label htmlFor="round-trip" className="cursor-pointer">Round Trip</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Distance & Pricing */}
        <div className="card-gradient rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Distance & Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="distance_km"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (km)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="base_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="included_km"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Included KM</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extra_km_charge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra KM Charge (₹/km)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-primary/10 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Price:</span>
              <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="card-gradient rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Passenger Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="no_of_passengers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Passengers</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="card-gradient rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Vehicle Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="car_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select car type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Mini">Mini</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="car_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., MH-01-AB-1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="driver_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter driver name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="driver_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Payment Details */}
        <div className="card-gradient rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Payment Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="advance_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Advance Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-primary/10 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Amount Due:</span>
              <span className="text-lg font-semibold text-primary">₹{amountDue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="card-gradient rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Additional Notes</h2>
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any special requirements or instructions..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Confirm Booking
        </Button>
      </form>
    </Form>
  );
}
