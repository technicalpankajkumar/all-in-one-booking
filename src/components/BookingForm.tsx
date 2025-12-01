import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Hotel } from "./HotelCard";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, User, Mail, Phone, Users, Calendar } from "lucide-react";

interface BookingFormProps {
  hotel: Hotel;
  onClose: () => void;
}

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const BookingForm = ({ hotel, onClose }: BookingFormProps) => {
  const { toast } = useToast();
  const [guestCount, setGuestCount] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [primaryGuest, setPrimaryGuest] = useState<GuestInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [additionalGuests, setAdditionalGuests] = useState<GuestInfo[]>([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const handleGuestCountChange = (value: string) => {
    const count = parseInt(value);
    setGuestCount(count);
    setAdditionalGuests(
      Array.from({ length: count - 1 }, (_, i) => additionalGuests[i] || {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!checkIn || !checkOut || !primaryGuest.firstName || !primaryGuest.email || !cardNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Your reservation at ${hotel.name} has been confirmed.`,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
      {/* Booking Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Booking Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="checkIn" className="required">Check-in Date *</Label>
            <Input
              id="checkIn"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="checkOut" className="required">Check-out Date *</Label>
            <Input
              id="checkOut"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="guestCount" className="required">Number of Guests *</Label>
            <Select value={guestCount.toString()} onValueChange={handleGuestCountChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Primary Guest Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Primary Guest Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="required">First Name *</Label>
            <Input
              id="firstName"
              value={primaryGuest.firstName}
              onChange={(e) => setPrimaryGuest({ ...primaryGuest, firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="required">Last Name *</Label>
            <Input
              id="lastName"
              value={primaryGuest.lastName}
              onChange={(e) => setPrimaryGuest({ ...primaryGuest, lastName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="required">Email *</Label>
            <Input
              id="email"
              type="email"
              value={primaryGuest.email}
              onChange={(e) => setPrimaryGuest({ ...primaryGuest, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="required">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={primaryGuest.phone}
              onChange={(e) => setPrimaryGuest({ ...primaryGuest, phone: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      {/* Additional Guests */}
      {guestCount > 1 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Additional Guests
            </h3>
            {additionalGuests.map((guest, index) => (
              <div key={index} className="mb-4 p-4 border border-border rounded-lg">
                <h4 className="text-sm font-medium mb-3">Guest {index + 2}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`guest-${index}-firstName`}>First Name</Label>
                    <Input
                      id={`guest-${index}-firstName`}
                      value={guest.firstName}
                      onChange={(e) => {
                        const updated = [...additionalGuests];
                        updated[index].firstName = e.target.value;
                        setAdditionalGuests(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`guest-${index}-lastName`}>Last Name</Label>
                    <Input
                      id={`guest-${index}-lastName`}
                      value={guest.lastName}
                      onChange={(e) => {
                        const updated = [...additionalGuests];
                        updated[index].lastName = e.target.value;
                        setAdditionalGuests(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Separator />

      {/* Payment Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Payment Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="cardNumber" className="required">Card Number *</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={16}
              required
            />
          </div>
          <div>
            <Label htmlFor="cardExpiry" className="required">Expiry Date *</Label>
            <Input
              id="cardExpiry"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              maxLength={5}
              required
            />
          </div>
          <div>
            <Label htmlFor="cardCvv" className="required">CVV *</Label>
            <Input
              id="cardCvv"
              placeholder="123"
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
              maxLength={3}
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Special Requests */}
      <div>
        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requirements or requests..."
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          rows={3}
        />
      </div>

      {/* Price Summary */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Price per night:</span>
          <span className="font-semibold">${hotel.price}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Guests:</span>
          <span className="font-semibold">{guestCount}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-primary">${hotel.price * guestCount}</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
          Confirm Booking
        </Button>
      </div>
    </form>
  );
};
