import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Driver } from "../../../data/types";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Car,
  Star,
  Clock,
  AlertCircle,
  Briefcase,
  Users,
  Fuel,
  Wind,
  Navigation,
  Music,
  Settings,
} from "lucide-react";
import { format } from "date-fns";

interface DriverDetailsViewProps {
  driver: Driver;
}

export function DriverDetailsView({ driver }: DriverDetailsViewProps) {
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

  const profileImage = driver?.images?.find((img) => img?.image_type === "profile");

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent h-24 sm:h-32" />
        <CardContent className="relative px-4 sm:px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 sm:-mt-16">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background shadow-lg">
              <AvatarImage src={profileImage?.image_path} />
              <AvatarFallback className="text-2xl sm:text-3xl bg-primary text-primary-foreground">
                {driver?.full_name
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">{driver.full_name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    <span className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(driver.availability_status)}`} />
                    {driver.availability_status}
                  </Badge>
                  <Badge variant="secondary">
                    <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                    {driver.rating}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {driver.mobile}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {driver.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {driver.city}, {driver.state}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{driver.total_rides}</p>
                <p className="text-xs text-muted-foreground">Total Rides</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{driver.experience_years}</p>
                <p className="text-xs text-muted-foreground">Years Exp.</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{driver.cancellation_rate}%</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem label="Father's Name" value={driver.father_name} />
              <InfoItem label="Date of Birth" value={
                driver?.dob &&
                format(new Date(driver.dob), "dd MMM yyyy")
              } />
              <InfoItem label="Gender" value={driver.gender} className="capitalize" />
              <InfoItem label="Languages" value={driver.languages_known?.join(", ") || "N/A"} />
              <InfoItem label="Alternate Mobile" value={driver.alternate_mobile || "N/A"} />
              <InfoItem label="Preferred Service Area" value={`${driver.preferred_service_area} km radius`} />
            </div>

            <Separator className="my-4" />

            <h4 className="font-medium mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Address Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem label="Current Address" value={driver.current_address} />
              <InfoItem label="Permanent Address" value={driver.permanent_address} />
              <InfoItem label="City" value={driver.city} />
              <InfoItem label="State" value={driver.state} />
              <InfoItem label="Pincode" value={driver.pincode} />
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
            <InfoItem label="Aadhar Number" value={driver.aadhar_number} />
            <InfoItem label="PAN Number" value={driver.pan_number} />
            <InfoItem label="Driving License" value={driver.driving_license_number} />
            <InfoItem
              label="License Expiry"
              value={
                driver?.driving_license_expiry &&
                format(new Date(driver.driving_license_expiry), "dd MMM yyyy")
              }
            />

            <Separator />

            <h4 className="font-medium flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Bank Details
            </h4>
            <InfoItem label="Bank Name" value={driver.bank_name} />
            <InfoItem label="Account Number" value={driver.bank_account_number} />
            <InfoItem label="IFSC Code" value={driver.bank_ifsc} />
            <InfoItem label="Account Holder" value={driver.account_holder_name} />
            <InfoItem label="UPI ID" value={driver.upi_id || "N/A"} />
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
            <InfoItem label="Contact Name" value={driver.emergency_contact_name} />
            <InfoItem label="Contact Number" value={driver.emergency_contact_number} />
            <InfoItem label="Relation" value={driver.emergency_contact_relation} />
          </CardContent>
        </Card>

        {/* Assigned Car */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Car className="w-5 h-5 text-primary" />
              Assigned Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {driver.Car ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48 h-32 bg-muted rounded-lg overflow-hidden">
                  {driver?.Car?.images?.[0] ? (
                    <img
                      src={driver?.Car?.images?.[0]?.image_url}
                      alt={driver?.Car?.car_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{driver?.Car?.car_name}</h3>
                    <Badge variant="secondary">{driver?.Car?.car_type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{driver?.Car?.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {driver?.Car?.seat_capacity} Seats
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      {driver?.Car?.bag_capacity} Bags
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      {driver?.Car?.fuel_type}
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      ₹{driver?.Car?.base_price}/{driver?.Car?.price_unit?.replace("per_", "")}
                    </div>
                  </div>

                  {driver?.Car?.features && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {driver?.Car?.features?.ac && (
                        <Badge variant="outline">
                          <Wind className="w-3 h-3 mr-1" /> AC
                        </Badge>
                      )}
                      {driver?.Car?.features?.gps && (
                        <Badge variant="outline">
                          <Navigation className="w-3 h-3 mr-1" /> GPS
                        </Badge>
                      )}
                      {driver?.Car?.features?.music_system && (
                        <Badge variant="outline">
                          <Music className="w-3 h-3 mr-1" /> Music
                        </Badge>
                      )}
                      {driver?.Car?.features?.automatic_transmission && (
                        <Badge variant="outline">
                          <Settings className="w-3 h-3 mr-1" /> Auto
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Car className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No vehicle assigned</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Driver Images */}
        {driver?.images && driver?.images?.length > 0 && (
          <Card className="lg:col-span-3">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {driver?.images?.map((image) => (
                  <div key={image?.id} className="space-y-2">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img
                        src={image?.image_path}
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
            driver?.created_at &&
            format(new Date(driver.created_at), "dd MMM yyyy, HH:mm")
          }
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Updated: {
            driver?.updated_at &&
            format(new Date(driver.updated_at), "dd MMM yyyy, HH:mm")
          }
        </span>
      </div>
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
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`font-medium ${className}`}>{value}</p>
    </div>
  );
}
