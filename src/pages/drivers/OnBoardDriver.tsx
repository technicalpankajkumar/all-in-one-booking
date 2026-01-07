import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Stepper } from "@/components/ui/stepper";
import { BasicDetailsForm } from "./partials/BasicDetailsForm";
import { DocumentUploadForm } from "./partials/DocumentUploadForm";
import { AssignCarForm } from "./partials/AssignCarForm";
import { Car, DriverBasicDetails, DriverDocuments } from "../../data/types";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addDriver } from "@/api/driver";
import { useCreateDriverMutation, useGetDriverByIdQuery, useUpdateDriverMutation } from "@/app/services/driverApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { format } from "date-fns";

const steps = [
  { title: "Basic Details", description: "Personal & contact info" },
  { title: "Documents", description: "Upload required docs" },
  { title: "Assign Car", description: "Vehicle assignment" },
];

interface OnBoardDriverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driverId?: string;
}

export function OnBoardDriver({ open, driverId, onOpenChange }: OnBoardDriverProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [basicDetails, setBasicDetails] = useState<DriverBasicDetails | null>(null);
  const [documents, setDocuments] = useState<DriverDocuments | null>(null);
  const [deletedImages,setDeletedImage] = useState([])
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const [createDriver, { isLoading }] = useCreateDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();
  const {data } = useGetDriverByIdQuery(driverId ?? skipToken);

  const handleBasicDetailsSubmit = (data: DriverBasicDetails) => {
    setBasicDetails(data);
    setCurrentStep(1);
    toast({ title: "Basic details saved", description: "Proceed to upload documents" });
  };

  const handleDocumentsSubmit = (payload: { documents: DriverDocuments; deletedImageIds: string[]}) => {
    setDocuments(payload.documents);
    setCurrentStep(2);
    setDeletedImage(payload.deletedImageIds);
    toast({ title: "Documents uploaded", description: "Proceed to assign a vehicle" });
  };

 useEffect(()=>{
    const driver = data?.driver;
    setBasicDetails({
      full_name: driver?.auth?.name,
      father_name: driver?.father_name,
      email: driver?.auth?.email,
      mobile: driver?.auth?.mobile,
      alternate_mobile: driver?.auth?.profile?.alternate_mobile,
      dob: driver?.auth?.profile?.dob && format(new Date(driver?.auth?.profile?.dob), "yyyy-MM-dd") || null,
      gender: driver?.auth?.profile?.gender,
      current_address: driver?.auth?.profile?.current_address,
      permanent_address: driver?.auth?.profile?.permanent_address,
      city: driver?.auth?.profile?.city,
      state: driver?.auth?.profile?.state,
      pincode: driver?.auth?.profile?.pincode,
      aadhar_number: driver?.aadhar_number,
      pan_number: driver?.pan_number,
      driving_license_number: driver?.driving_license_number,
      driving_license_expiry: driver?.driving_license_expiry && format(new Date(driver?.driving_license_expiry), "yyyy-MM-dd") || null,
      bank_account_number: driver?.bank_account_number,
      bank_ifsc: driver?.bank_ifsc,
      bank_name: driver?.bank_name,
      account_holder_name: driver?.account_holder_name,
      upi_id: driver?.upi_id,
      experience_years: String(driver?.auth?.profile?.experience_years),
      languages_known: driver?.auth?.profile?.language,
      emergency_contact_name: driver?.emergency_contact_name,
      emergency_contact_number: driver?.emergency_contact_number,
      emergency_contact_relation: driver?.emergency_contact_relation
    })
 },[data])

  const handleCarSubmit = async (assigned_car_id: string | null) => {
    if (basicDetails && documents) {
      try {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ ...basicDetails, assigned_car_id }));
        if (documents.profile)
          formData.append("profile", documents.profile);
        if (documents.aadhar)
          formData.append("aadhar", documents.aadhar);
        if (documents.pan)
          formData.append("pan", documents.pan);
        if (documents.driving_license)
          formData.append("driving_license", documents.driving_license);
        if(deletedImages?.length)
          formData.append('deleted_images',JSON.stringify(deletedImages))
        
        let res = await (driverId ? updateDriver({ id: driverId, payload: formData }) : createDriver(formData));

        console.log(res,'response -------- response')
        if (res?.data?.success) {
          setIsCompleted(true);
          setDeletedImage([]);
          toast({
            title: res.data.message || `Driver ${driverId ? 'updated' : 'Added'} Successfully!`
          })

        } else if (!res?.error?.data?.success) {
          toast({
            title: res?.error?.data?.message
          })
          // toast.error(res?.error?.data?.message)
        }
      } catch (e) {
        console.log(e, 'error')
      }


    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after modal closes
    setTimeout(() => {
      setCurrentStep(0);
      setBasicDetails(null);
      setDocuments(null);
      setIsCompleted(false);
    }, 300);
  };

  const handleAddAnother = () => {
    setCurrentStep(0);
    setBasicDetails(null);
    setDocuments(null);
    setIsCompleted(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`${isCompleted ? 'max-w-xl' : 'max-w-5xl'} max-h-[96vh] overflow-hidden p-0`}>
        <DialogHeader className="px-6 pt-4 pb-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {isCompleted ? "Registration Complete" : "Driver Onboarding"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(96vh-180px)] px-6">
          {!isCompleted && (
            <div className="pb-4 pt-2">
              <Stepper steps={steps} currentStep={currentStep} />
            </div>
          )}
          {isCompleted ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-in zoom-in-50 duration-500">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                Registration Complete!
              </h2>
              <p className="text-muted-foreground text-center mt-2 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                The driver has been successfully registered. You can now view their profile or add another driver.
              </p>
              <div className="flex gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={handleAddAnother}>
                  Add Another Driver
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {currentStep === 0 && (
                <BasicDetailsForm initialData={basicDetails || undefined} onSubmit={handleBasicDetailsSubmit} />
              )}
              {currentStep === 1 && (
                <DocumentUploadForm
                  initialData={data?.driver || undefined}
                  onSubmit={handleDocumentsSubmit}
                  onBack={() => setCurrentStep(0)}
                />
              )}
              {currentStep === 2 && (
                <AssignCarForm initialCar={data?.driver?.car} onSubmit={handleCarSubmit} onBack={() => setCurrentStep(1)} />
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}