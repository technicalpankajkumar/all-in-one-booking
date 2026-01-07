import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X, FileImage, Check } from "lucide-react";
import { DriverDocuments } from "../../../data/types";

interface DocumentUploadFormProps {
  initialData?: Partial<DriverDocuments>;
  onSubmit: (data: DriverDocuments) => void;
  onBack: () => void;
}

interface DocumentField {
  key: keyof DriverDocuments;
  label: string;
  description: string;
  required: boolean;
}

const documentFields: DocumentField[] = [
  { key: "profile", label: "Profile Photo", description: "Clear face photo for identification", required: true },
  { key: "aadhar", label: "Aadhar Card (Front/Back)", description: "Front side of Aadhar card", required: true },
  { key: "pan", label: "PAN Card", description: "Clear image of PAN card", required: false },
  { key: "driving_license", label: "Driving License (Front/Back)", description: "Front side of DL", required: true },,
];

export function DocumentUploadForm({ initialData, onSubmit, onBack }: DocumentUploadFormProps) {
  const [documents, setDocuments] = useState<DriverDocuments>({
    profile: null,
    aadhar: null,
    pan: null,
    driving_license: null,
    ...initialData,
  });

  const [previews, setPreviews] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = (key: keyof DriverDocuments, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [key]: file }));
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[key];
        return newPreviews;
      });
    }
  };

  const handleDrop = (key: keyof DriverDocuments, e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(key, file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(documents);
  };

  const allRequiredUploaded = documentFields
    .filter((f) => f.required)
    .every((f) => documents[f.key] !== null);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-4">
       <div className="flex justify-between gap-4 absolute top-2.5 right-12">
        <Button type="button" variant="outline" onClick={onBack} size="sm" >
          Back
        </Button>
        <Button type="submit" disabled={!allRequiredUploaded} size="sm" >
          Continue
        </Button>
      </div>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileImage className="w-5 h-5 text-primary" />
            Upload Documents
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload clear images of all required documents. Accepted formats: JPG, PNG, PDF
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {documentFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label className="flex items-center gap-1">
                  {field.label}
                  {field.required && <span className="text-destructive text-red-500">*</span>}
                </Label>
                <div
                  className={`relative border-2 border-primary/50 border-dashed rounded-lg p-1 transition-colors cursor-pointer hover:border-primary/50 ${
                    documents[field.key] ? "border-primary bg-primary/5" : "border-muted"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(field.key, e)}
                  onClick={() => fileInputRefs.current[field.key]?.click()}
                >
                  <input
                    ref={(el) => (fileInputRefs.current[field.key] = el)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(field.key, e.target.files?.[0] || null)}
                  />

                  {previews[field.key] ? (
                    <div className="relative">
                      <img
                        src={previews[field.key]}
                        alt={field.label}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileChange(field.key, null);
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-28 text-center">
                      <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                      <p className="text-xs font-medium">Click or drag to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">{field.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

     
    </form>
  );
}
