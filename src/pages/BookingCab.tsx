import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { BookingForm } from "./Cabs/booking/BookingForm";

export default function BookingCab() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCab = location.state?.cab;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cabs
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-primary">Book Cab For Trip</h1>
            {selectedCab && (
              <p className="text-muted-foreground">
                {selectedCab.name} - {selectedCab.type} | Starting at ₹{selectedCab.price}
              </p>
            )}
          </div>

          <BookingForm/>
        </div>
      </div>
    </div>
  );
}
