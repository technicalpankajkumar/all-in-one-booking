import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  CreditCard,
  AlertCircle,
  Home,
  Download
} from "lucide-react";
import { BookingFormData } from "../../../data/types";

interface CompletedBooking extends BookingFormData {
  total_price: number;
  distance_km: number;
  travel_time: string;
  booking_status: string;
  payment_status: string;
  transaction?: {
    booking_id: string;
    amount: number;
    status: string;
    payment_gateway: string;
    created_at: string;
  };
}

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [booking, setBooking] = useState<CompletedBooking | null>(null);

  useEffect(() => {
    console.log(state)
    setBooking(state)
    // if (storedData) {
    //   setBooking(JSON.parse(storedData));
    // } else {
    //   navigate("/booking");
    // }
  }, [navigate]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const isPaid = booking.payment_status === "Paid";

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8 px-4">
        {/* Status Header */}
        <div className="text-center mb-8">
          {isPaid ? (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 mb-4">
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
          )}
          <h1 className="text-3xl font-bold">
            {isPaid ? "Booking Confirmed!" : "Booking Created!"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isPaid 
              ? "Your trip has been successfully booked and paid for." 
              : "Your booking is confirmed. Please complete the payment before your trip."}
          </p>
        </div>

        {/* Payment Pending Alert */}
        {!isPaid && (
          <Card className="mb-6 border-yellow-500/50 bg-yellow-500/5">
            <CardContent className="flex items-center gap-4 py-4">
              <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Payment Pending</p>
                <p className="text-sm text-muted-foreground">
                  Please pay ₹{booking.total_price} via {booking.payment_method} to confirm your booking.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Booking Details Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking Details</CardTitle>
              <div className="flex gap-2">
                <Badge variant={booking.booking_status === "Confirmed" ? "default" : "secondary"}>
                  {booking.booking_status}
                </Badge>
                <Badge variant={isPaid ? "default" : "outline"} className={isPaid ? "bg-green-500" : ""}>
                  {booking.payment_status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Route */}
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Route</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-medium">{booking.from_location}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-medium">{booking.to_location}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Trip Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Travel Date</p>
                  <p className="font-medium">
                    {booking.travel_date && format(new Date(booking.travel_date), "PPP")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{booking.travel_time}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Passengers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Passengers ({booking.passengers.length})</p>
              </div>
              <div className="grid gap-2">
                {booking.passengers.map((passenger, index) => (
                  <div key={index} className="flex items-center justify-between text-sm bg-muted/50 rounded-lg px-3 py-2">
                    <span className="font-medium">{passenger.name}</span>
                    <span className="text-muted-foreground">
                      {passenger.age} yrs, {passenger.gender}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Payment Info */}
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{booking.payment_method}</p>
              </div>
            </div>

            {/* Transaction Details */}
            {booking.transaction && (
              <>
                <Separator />
                <div className="bg-green-500/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Transaction Details</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Transaction ID</span>
                      <span className="font-mono">{booking.transaction.booking_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <Badge variant="default" className="bg-green-500">
                        {booking.transaction.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span>{format(new Date(booking.transaction.created_at), "PPP p")}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Total */}
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-sm text-muted-foreground">{booking.distance_km} km × rate</p>
                </div>
                <span className="text-3xl font-bold text-primary">₹{booking.total_price}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              // Clear booking data and go home
              sessionStorage.removeItem("completedBooking");
              navigate("/");
            }}
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
          <Button className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
        </div>

        {/* Book Another */}
        <div className="text-center mt-6">
          <Button 
            variant="link"
            onClick={() => {
              sessionStorage.removeItem("completedBooking");
              navigate("/booking");
            }}
          >
            Book Another Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
