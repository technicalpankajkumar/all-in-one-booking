import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  MapPin, 
  Calendar, 
  Users, 
  Car,
  CheckCircle2,
  Clock,
  ArrowLeft,
  MoveRight,
  TicketCheck
} from "lucide-react";
import { BookingFormData } from "../../../data/types";
import { createBooking } from "@/api/cab";
import { CustomInput } from "@/components/custom-ui";

export default function PaymentPage() {
  const navigate = useNavigate();
  const {id} = useParams()
  const [bookingData, setBookingData] = useState<BookingFormData & { total_price: number; distance_km: number; travel_time: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("pankajkumar@upi.com");

  useEffect(() => {
    const storedData = sessionStorage.getItem("pendingBooking");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      toast.error("No booking found");
      navigate(`/booking/${id}/confirmation`)
    }
  }, [navigate]);
console.log(bookingData,"bookingData")
  const handlePayment = async () => {
    setIsProcessing(true);

    // Validate based on payment method
    if (bookingData?.payment_method === "Card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        toast.error("Please fill all card details");
        setIsProcessing(false);
        return;
      }
    } else if (bookingData?.payment_method === "UPI") {
      if (!upiId) {
        toast.error("Please enter UPI ID");
        setIsProcessing(false);
        return;
      }
    }

    let res = await createBooking({...bookingData,car_id:id});

    if(res.success){
       navigate("/cabs")
    }

    // Simulate payment processing
    // setTimeout(() => {
    //   const transaction = {
    //     booking_id: "booking_" + Date.now(),
    //     amount: bookingData?.total_price,
    //     status: "success",
    //     payment_gateway: bookingData?.payment_method,
    //     created_at: new Date(),
    //   };

    //   // Store completed booking
    //   sessionStorage.setItem("completedBooking", JSON.stringify({
    //     ...bookingData,
    //     booking_status: "Confirmed",
    //     payment_status: "Paid",
    //     transaction,
    //   }));
    //   sessionStorage.removeItem("pendingBooking");

      setIsProcessing(false);
    //   toast.success("Payment successful!");
    //   navigate("/booking/confirmation");
    // }, 2000);
  };

  const handlePayLater = () => {
    // Store booking as booked but unpaid
    sessionStorage.setItem("completedBooking", JSON.stringify({
      ...bookingData,
      booking_status: "Booked",
      payment_status: "Pending",
    }));
    sessionStorage.removeItem("pendingBooking");

    toast.info("Booking confirmed! Payment pending.");
    navigate("/booking/confirmation");
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8 px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/booking")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Booking
        </Button>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Booking Summary */}
          <Card>
            <CardHeader className="p-6 mb-2">
              <CardTitle className="flex gap-2 items-center"><TicketCheck className="h-7 w-7" /> Booking Summary</CardTitle>
              <CardDescription>Review your trip details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex gap-4 items-center">
                  <p className="font-semibold text-muted-foreground">Route</p>
                  <p className="font-sm">{bookingData.from_location}</p>
                  <p className="text-muted-foreground"><MoveRight/></p>
                  <p className="font-sm">{bookingData.to_location}</p>
                </div>
              </div>

              <Separator />

              {/* <div className="grid grid-cols-2 gap-4"> */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  {/* <div> */}
                    <p className="text-base font-semibold text-muted-foreground">Travel Date</p>
                    <p className="">
                      {`${bookingData.travel_date && format(new Date(bookingData.travel_date), "PPP")}`}
                    </p>
                    <p className="flex gap-2">
                      <span className="text-base font-semibold text-muted-foreground">Time</span>
                      {bookingData.pickup_time}
                    </p>
                  {/* </div> */}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  {/* <div> */}
                    <p className="text-base font-semibold text-muted-foreground">Duration</p>
                    <p className=" text-center">{bookingData.travel_time || "00:00"}</p>
                  {/* </div> */}
                </div>
              {/* </div> */}

              <Separator />

              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex gap-2">
                  <p className="text-sm font-semibold text-muted-foreground">Trip Type</p>
                  <Badge variant="secondary">
                    {bookingData.trip_type === "One Way" ? "One Way" : "Round Trip"}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1 gap-2">
                  <p className="text-sm font-semibold text-muted-foreground">Passengers</p>
                  <p className="">{bookingData.passengers.length} passenger's</p>
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
                      {bookingData?.passengers?.map((res,idx)=> {
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

              <div className="bg-gray-100 rounded-sm p-4 *:text-sm space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Base Fare :</span>
                  <span>{bookingData.distance_km}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Distance Charge :</span>
                  <span>{bookingData.distance_km}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Duration Charge :</span>
                  <span>{bookingData.distance_km}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Waiting Charge :</span>
                  <span>{bookingData.distance_km}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Driver Late Discount :</span>
                  <span>{bookingData.distance_km}</span>
                </div>
                <div className="flex justify-between items-center mt-3 border-0 border-t-2 py-1">
                  <span className="font-semibold text-base">Total Amount</span>
                  <span className="text-base font-bold text-primary">₹{bookingData.total_price || "9,999"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card>
            <CardHeader className="p-6 mb-2">
              <CardTitle className="flex items-center gap-2">
                {bookingData.payment_method === "Card" && <CreditCard className="h-7 w-7" />}
                {bookingData.payment_method === "UPI" && <Smartphone className="h-7 w-7" />}
                {bookingData.payment_method === "Cash" && <Banknote className="h-7 w-7" />}
                Pay with {bookingData.payment_method}
              </CardTitle>
              <CardDescription>
                {bookingData.payment_method === "Cash" 
                  ? "Pay directly to the driver" 
                  : "Complete your payment securely"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookingData.payment_method === "Card" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              {bookingData.payment_method === "UPI" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <CustomInput
                     label="UPI ID"
                     id={'upiId'}
                     placeholder="demo@upi.com"
                     register={(e)=> ({
                       onChange:(e) => setUpiId(e.target.value)
                     })}
                     disabled
                     />
                     <CustomInput
                     label="Transaction ID"
                     id={'transaction_id'}
                     placeholder="Enter transaction ID"
                     register={(e)=> ({
                       onChange:(e) => setUpiId(e.target.value)
                     })}
                     required
                     />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Or scan QR code</p>
                    <div className="w-32 h-32 bg-muted rounded-lg mx-auto flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">QR Code</span>
                    </div>
                  </div>
                </div>
              )}

              {bookingData.payment_method === "Cash" && (
                <div className="bg-muted/50 rounded-lg p-6 text-center space-y-3">
                  <Banknote className="h-12 w-12 mx-auto text-primary" />
                  <div>
                    <p className="font-medium">Cash Payment</p>
                    <p className="text-sm text-muted-foreground">
                      Pay ₹{bookingData.total_price} directly to the driver at the time of pickup
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {bookingData.payment_method === "Cash" ? "Confirm Booking" : `Pay ₹ ${bookingData.total_price || "0,000.00"}`}
                  </>
                )}
              </Button>
              {
                bookingData.payment_method === "UPI" && (
                  <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handlePayLater}
                  >
                  Partial Confirm with Pay 500
                </Button>
                )
              }
              {bookingData.payment_method !== "Cash" && (
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={handlePayLater}
                >
                  Pay Later
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
