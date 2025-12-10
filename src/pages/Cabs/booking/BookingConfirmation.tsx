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
  Download,
  MoveRight
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

  if (booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const isPaid = true || booking?.payment_status === "Paid";

  return (
    <div className="min-h-screen bg-background flex items-end">
      <div className="container max-w-2xl py-8 px-4 ">
        {/* Status Header */}
        {/* <div className="text-center mb-8 bg-white p-4 rounded-lg shadow">
          {isPaid ? (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 mb-4">
              <Clock className="h-6 w-6 text-yellow-500" />
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
        </div> */}

        {/* Payment Pending Alert */}
        {/* {!isPaid && (
          <Card className="mb-6 border-yellow-500/50 bg-yellow-500/5">
            <CardContent className="flex items-center gap-4 py-4">
              <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Payment Pending</p>
                <p className="text-sm text-muted-foreground">
                  Please pay ₹{booking?.total_price} via {booking?.payment_method} to confirm your booking.
                </p>
              </div>
            </CardContent>
          </Card>
        )} */}

        {/* Booking Details Card */}
        <Card className="shadow-lg">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <CardTitle>Booking Details</CardTitle>
              <div className="flex gap-2">
                <Badge variant={booking?.booking_status === "Confirmed" ? "default" : "secondary"}>
                  {booking?.booking_status}
                </Badge>
                <Badge variant={isPaid ? "default" : "outline"} className={isPaid ? "bg-green-500" : ""}>
                  {booking?.payment_status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Route */}
            <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex gap-4 items-center">
                  <p className="font-semibold text-muted-foreground">Route</p>
                  <p className="font-sm">{booking?.from_location}</p>
                  <p className="text-muted-foreground"><MoveRight/></p>
                  <p className="font-sm">{booking?.to_location}</p>
                </div>
              </div>

            <Separator />

            {/* Trip Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-base font-semibold text-muted-foreground">Travel Date</p>
                  <p className="font-medium">
                    {booking?.travel_date && format(new Date(booking?.travel_date), "PPP")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-base font-semibold text-muted-foreground">Duration</p>
                  <p className="font-medium">{booking?.travel_time}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Passengers */}
            <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary mt-0.5" />
                            <div className="flex-1 gap-2">
                              <p className="text-base font-semibold text-muted-foreground">Passengers</p>
                              <p className="">{booking?.passengers?.length} passenger's</p>
                            </div>
                          </div>
                            <div className="overflow-x-auto">
                              <table className="min-w-full">
                                <thead className="bg-gray-50 text-slate-500 font-light">
                                  <tr className="*:font-semibold *:text-sm">
                                    <th className="px-2 py-1 ">Name</th>
                                    <th className="px-2 py-1">Age</th>
                                    <th className="px-2 py-1">Gender</th>
                                  </tr>
                                </thead>
            
                                <tbody>
                                  {booking?.passengers?.map((res,idx)=> {
                                     return <tr key={idx} className="border-b *:text-sm text-center hover:bg-gray-50 md:table-row block">
                                    <td className="px-4 py-1 border md:table-cell block md:border-0"
                                        data-label="Name">
                                      {res.name}
                                    </td>
                                    <td className="px-4 py-1 border md:table-cell block md:border-0"
                                        data-label="Age">
                                      {res.age} yrs
                                    </td>
                                    <td className="px-4 py-1 border md:table-cell block md:border-0"
                                        data-label="Gender">
                                      {res.gender}
                                    </td>
                                  </tr>
                                  })}
                                </tbody>
                              </table>
                            </div>

            <Separator />

            {/* Payment Info */}
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-base font-semibold text-muted-foreground">Payment Method</p>
                <p className="font-medium">{booking?.payment_method}</p>
              </div>
            </div>

            {/* Transaction Details */}
            {booking?.transaction && (
              <>
                <Separator />
                <div className="bg-green-500/10 rounded-lg p-4">
                  <p className="text-base font-semibold text-muted-foreground">Transaction Details</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Transaction ID</span>
                      <span className="font-mono">{booking?.transaction?.booking_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <Badge variant="default" className="bg-green-500">
                        {booking?.transaction?.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span>{format(new Date(booking?.transaction?.created_at), "PPP p")}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Total */}
            {/* <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-sm text-muted-foreground">{booking?.distance_km} km × rate</p>
                </div>
                <span className="text-3xl font-bold text-primary">₹{booking?.total_price}</span>
              </div>
            </div> */}
            <div className="bg-gray-50 rounded-sm p-4 *:text-sm space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Base Fare :</span>
                  <span>{booking?.distance_km || "0,00"} (km × rate)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Distance Charge :</span>
                  <span>{booking?.distance_km || "0,00"} (km × rate)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Duration Charge :</span>
                  <span>{booking?.distance_km || "0,00"} (km × rate)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Waiting Charge :</span>
                  <span>{booking?.distance_km || "0,00"} (km × rate)</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Driver Late Discount :</span>
                  <span>{booking?.distance_km || "0,00"} (km × rate)</span>
                </div>
                <div className="flex justify-between items-center mt-3 border-0 border-t-2 py-1">
                  <span className="font-semibold text-base">Total Amount</span>
                  <span className="text-base font-bold text-primary">₹{booking?.total_price || "9,999"}</span>
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
