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
import { useGetDriverByIdQuery, useUpdateDriverMutation, useUpdateDriverSpecificDataMutation } from "@/app/services/driverApi";
import { FeatureChips } from "./FeatureChips";
import MultiImageViewer from "@/components/custom-ui/MultiImageViewer";
import ProfileBannerCard from "@/components/custom-ui/ProfileBannerCard";
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
  const [updateDriverSpecificData] = useUpdateDriverSpecificDataMutation()
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImg,setProfileImg] = useState<Blob>(null)

  const handleCarSelect = async(car: any) => {
    setSelectedCar(car.id);
     
    const formData = new FormData();
    if (profileImg) {
        formData.append("profile", profileImg);
    }
    formData.append('data',JSON.stringify({
      assigned_car_id:car.id,
      availability_status: data?.driver?.availability_status
    }))

    const res = await updateDriverSpecificData({id,payload:formData})
    console.log(res,'res')
    setModalOpen(false);
  };

  const profileImage = API_URL + data?.driver?.images?.find((img) => img?.image_type === "profile")?.image_path;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <ProfileBannerCard 
         data={data}
         profileImage={profileImage}
         bannerImage={profileImage}
         onBannerImageChange={(file)=>console.log("Banner file",file)}
         onProfileImageChange={(file)=>console.log("Profile file",file)}
         editable
      />

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
            {data?.driver?.car ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48 h-32 bg-muted rounded-lg overflow-hidden">
                  {data?.driver?.car?.images?.[0] ? (
                    <img
                      src={API_URL + data?.driver?.car?.images?.find(res => res.is_main == true)?.image_url}
                      alt={data?.driver?.car?.car_name}
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
                    <h3 className="text-xl font-semibold">{data?.driver?.car?.car_name}</h3>
                    <Badge variant="secondary">{data?.driver?.car?.car_type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{data?.driver?.car?.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {data?.driver?.car?.seat_capacity} Seats
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      {data?.driver?.car?.bag_capacity} Bags
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      {data?.driver?.car?.fuel_type}
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      ₹ {data?.driver?.car?.fare_rules?.base_fare}
                    </div>
                  </div>
                  <FeatureChips  selectedCar={data?.driver?.car}/> 
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
              <MultiImageViewer
            images={data?.driver?.images?.filter(res => res.image_type != "profile")}
            onDelete={(id) =>{
                  // setDeletedImageIds(pre => ([...pre,id]));
                  // setUploadedViewImages( uploadedViewImages?.filter(res => res.id != id))
                }
            }
        />
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
        selectedCarId={selectedCar || null}
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
