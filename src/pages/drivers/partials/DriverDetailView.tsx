import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CarFront,
  Clock,
  CreditCard,
  Fuel,
  Mail,
  MapPin,
  Music,
  Navigation,
  Phone,
  Settings,
  Star,
  User,
  Users,
  Wind,
} from "lucide-react";
import { useState } from "react";
import { Car, Driver } from "../../../data/types";
import { CarSelectionModal } from "./CarSelectionModal";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetDriverByIdQuery } from "@/app/services/driverApi";
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;
interface DriverDetailsViewProps {
  id:string;
}

export function DriverDetailsView({ id }: DriverDetailsViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-muted-foreground";
      case "busy":
        return "bg-yellow-500";
      default:
        return "bg-muted-foreground";
    }
  };
  const {data, isLoading } = useGetDriverByIdQuery(id ?? skipToken)
  const [selectedCar, setSelectedCar] = useState<Car>({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleCarSelect = async(car: any) => {
    setSelectedCar(car);
    console.log('selected car',car)
    const newData = {...data?.driver};
    delete newData.images;
    delete newData.Car;
    delete newData.id;
    // const res = await updateDriver(driver.id,{...data,assigned_car_id:car.id},{},[])
    setModalOpen(false);
  };

  const profileImage = API_URL + data?.driver?.images?.find((img) => img?.image_type === "profile")?.image_path;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent h-24 sm:h-32" />
        <CardContent className="relative px-4 sm:px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 sm:-mt-16">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background shadow-lg">
              <AvatarImage src={profileImage} />
              <AvatarFallback className="text-2xl sm:text-3xl bg-primary text-primary-foreground">
                {data?.driver?.full_name
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">{data?.driver?.full_name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    <span className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(data?.driver?.availability_status)}`} />
                    {data?.driver?.availability_status}
                  </Badge>
                  <Badge variant="secondary">
                    <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                    {data?.driver.rating}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {data?.driver?.auth?.mobile}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {data?.driver?.auth?.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data?.driver?.auth?.profile?.city}, {data?.driver?.auth?.profile?.state}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{data?.driver?.total_rides}</p>
                <p className="text-xs text-muted-foreground">Total Rides</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{data?.driver?.auth?.profile?.experience_years}</p>
                <p className="text-xs text-muted-foreground">Years Exp.</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{data?.driver?.cancellation_rate}%</p>
                <p className="text-xs text-muted-foreground">Cancel Rate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem label="Father's Name" value={data?.driver?.auth?.profile?.father_name || "N/A"} />
              <InfoItem label="Date of Birth" value={data?.driver?.auth?.profile?.dob && format(new Date(data?.driver?.auth?.profile?.dob), "dd MMM yyyy")} />
              <InfoItem label="Gender" value={data?.driver?.auth?.profile?.gender} className="capitalize" />
              <InfoItem label="Languages" value={data?.driver?.auth?.profile?.language?.join(", ") || "N/A"} />
              <InfoItem label="Alternate Mobile" value={data?.driver?.auth?.profile?.alternate_mobile || "N/A"} />
              <InfoItem label="Preferred Service Area" value={`${data?.driver.preferred_service_area} km radius`} />
            </div>

            <Separator className="my-4" />

            <h4 className="font-medium mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Address Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem label="Current Address" value={data?.driver?.auth?.profile?.current_address} />
              <InfoItem label="Permanent Address" value={data?.driver?.auth?.profile?.permanent_address} />
              <InfoItem label="City" value={data?.driver?.auth?.profile?.city} />
              <InfoItem label="State" value={data?.driver?.auth?.profile?.state} />
              <InfoItem label="Pincode" value={data?.driver?.auth?.profile?.pincode} />
            </div>
          </CardContent>
        </Card>

        {/* Identity & Documents */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="w-5 h-5 text-primary" />
              Identity Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem label="Aadhar Number" value={data?.driver?.aadhar_number} />
            <InfoItem label="PAN Number" value={data?.driver?.pan_number} />
            <InfoItem label="Driving License" value={data?.driver?.driving_license_number} />
            <InfoItem
              label="License Expiry"
              value={
                data?.driver?.driving_license_expiry &&
                format(new Date(data?.driver?.driving_license_expiry), "dd MMM yyyy")
              }
            />

            <Separator />

            <h4 className="font-medium flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Bank Details
            </h4>
            <InfoItem label="Bank Name" value={data?.driver?.bank_name  || "N/A"} />
            <InfoItem label="Account Number" value={data?.driver?.bank_account_number || "N/A"} />
            <InfoItem label="IFSC Code" value={data?.driver?.bank_ifsc || "N/A"} />
            <InfoItem label="Account Holder" value={data?.driver?.account_holder_name || "N/A"} />
            <InfoItem label="UPI ID" value={data?.driver?.upi_id || "N/A"} />
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-primary" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem label="Contact Name" value={data?.driver?.emergency_contact_name} />
            <InfoItem label="Contact Number" value={data?.driver?.emergency_contact_number} />
            <InfoItem label="Relation" value={data?.driver?.emergency_contact_relation} />
          </CardContent>
        </Card>

        {/* Assigned Car */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CarFront className="w-5 h-5 text-primary" />
              Assigned Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data?.driver?.Car ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48 h-32 bg-muted rounded-lg overflow-hidden">
                  {data?.driver?.Car?.images?.[0] ? (
                    <img
                      src={API_URL + data?.driver?.Car?.images?.find(res => res.is_main == true)?.image_url}
                      alt={data?.driver?.Car?.car_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CarFront className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{data?.driver?.Car?.car_name}</h3>
                    <Badge variant="secondary">{data?.driver?.Car?.car_type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{data?.driver?.Car?.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {data?.driver?.Car?.seat_capacity} Seats
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      {data?.driver?.Car?.bag_capacity} Bags
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      {data?.driver?.Car?.fuel_type}
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      ₹{data?.driver?.Car?.base_price}/{data?.driver?.Car?.price_unit?.replace("per_", "")}
                    </div>
                  </div>

                  {data?.driver?.Car?.features && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {data?.driver?.Car?.features?.ac && (
                        <Badge variant="outline">
                          <Wind className="w-3 h-3 mr-1" /> AC
                        </Badge>
                      )}
                      {data?.driver?.Car?.features?.gps && (
                        <Badge variant="outline">
                          <Navigation className="w-3 h-3 mr-1" /> GPS
                        </Badge>
                      )}
                      {data?.driver?.Car?.features?.music_system && (
                        <Badge variant="outline">
                          <Music className="w-3 h-3 mr-1" /> Music
                        </Badge>
                      )}
                      {data?.driver?.Car?.features?.automatic_transmission && (
                        <Badge variant="outline">
                          <Settings className="w-3 h-3 mr-1" /> Auto
                        </Badge>
                      )}
                    </div>
                  )}
                  <Button variant="default" size="sm" className="mt-4" onClick={() => setModalOpen(true)}>
                    Change Vehicle
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CarFront className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No vehicle assigned</p>
                <Button variant="default" size="sm" className="mt-4" onClick={() => setModalOpen(true)}>
                  Assign Vehicle
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Driver Images */}
        {data?.driver?.images && data?.driver?.images?.length > 0 && (
          <Card className="lg:col-span-3">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {data?.driver?.images?.filter(res => res.image_type != "profile")?.map((image) => (
                  <div key={image?.id} className="space-y-2">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img
                        src={API_URL + image?.image_path}
                        alt={image?.image_type}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground capitalize">
                      {image?.image_type?.replace("_", " ")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Created: {
            data?.driver?.created_at &&
            format(new Date(data?.driver?.created_at), "dd MMM yyyy, HH:mm")
          }
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Updated: {
            data?.driver?.updated_at &&
            format(new Date(data?.driver?.updated_at), "dd MMM yyyy, HH:mm")
          }
        </span>
      </div>
     <CarSelectionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedCarId={selectedCar?.id || null}
        onSelect={handleCarSelect}
      />
    </div>
  );
}

function InfoItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-0.5">{label}</p>
      <p className={`font-medium text-sm ${className}`}>{value}</p>
    </div>
  );
}
