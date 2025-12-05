import { useState } from "react";
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
import { DriverBasicDetails, DriverDocuments } from "../../data/types";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addDriver } from "@/api/driver";

const steps = [
  { title: "Basic Details", description: "Personal & contact info" },
  { title: "Documents", description: "Upload required docs" },
  { title: "Assign Car", description: "Vehicle assignment" },
];

interface OnBoardDriverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnBoardDriver({ open, onOpenChange }: OnBoardDriverProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [basicDetails, setBasicDetails] = useState<DriverBasicDetails | null>(null);
  const [documents, setDocuments] = useState<DriverDocuments | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleBasicDetailsSubmit = (data: DriverBasicDetails) => {
    setBasicDetails(data);
    setCurrentStep(1);
    toast({ title: "Basic details saved", description: "Proceed to upload documents" });
  };

  const handleDocumentsSubmit = (data: DriverDocuments) => {
    setDocuments(data);
    setCurrentStep(2);
    toast({ title: "Documents uploaded", description: "Proceed to assign a vehicle" });
  };



  const handleCarSubmit = async(assigned_car_id: string | null) => {
    if (basicDetails && documents) {
      setIsCompleted(true);
         
      await addDriver({...basicDetails,assigned_car_id},documents)
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
      <DialogContent className={`${isCompleted ? 'max-w-xl':'max-w-5xl'} max-h-[96vh] overflow-hidden p-0`}>
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
                  initialData={documents || undefined}
                  onSubmit={handleDocumentsSubmit}
                  onBack={() => setCurrentStep(0)}
                />
              )}
              {currentStep === 2 && (
                <AssignCarForm initialCarId={null} onSubmit={handleCarSubmit} onBack={() => setCurrentStep(1)} />
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}