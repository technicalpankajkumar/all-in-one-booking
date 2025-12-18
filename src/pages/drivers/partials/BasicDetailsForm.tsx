import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, MapPin, CreditCard, AlertCircle } from "lucide-react";
import { DriverBasicDetails } from "../../../data/types";
import { CustomInput, CustomSelect, CustomTextarea } from "@/components/custom-ui";

const basicDetailsSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  // father_name: z.string().min(2, "Father's name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be 10 digits"),
  alternate_mobile: z.string().optional(),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  current_address: z.string().min(5, "Current address is required"),
  permanent_address: z.string().min(5, "Permanent address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  aadhar_number: z.string().min(12, "Aadhar number must be 12 digits"),
  pan_number: z.string().min(10, "PAN number is required"),
  driving_license_number: z.string().min(5, "License number is required"),
  driving_license_expiry: z.string().min(1, "License expiry date is required"),
  // bank_account_number: z.string().min(8, "Account number is required"),
  // bank_ifsc: z.string().min(11, "IFSC code is required"),
  // bank_name: z.string().min(2, "Bank name is required"),
  // account_holder_name: z.string().min(2, "Account holder name is required"),
  upi_id: z.string().min(5,"UPI Id is required"),
  experience_years: z.string().min(1, "Experience must be positive"),
  languages_known: z.array(z.string()).min(1, "Select at least one language"),
  emergency_contact_name: z.string().min(2, "Emergency contact name is required"),
  emergency_contact_number: z.string().min(10, "Emergency contact number is required"),
  emergency_contact_relation: z.string().min(2, "Relation is required"),
});

interface BasicDetailsFormProps {
  initialData?: Partial<DriverBasicDetails>;
  onSubmit: (data: DriverBasicDetails) => void;
}

export function BasicDetailsForm({ initialData, onSubmit }: BasicDetailsFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DriverBasicDetails>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      full_name: "",
      father_name: "",
      email: "",
      mobile: "",
      alternate_mobile: "",
      dob: "",
      gender: "",
      current_address: "",
      permanent_address: "",
      city: "",
      state: "",
      pincode: "",
      aadhar_number: "",
      pan_number: "",
      driving_license_number: "",
      driving_license_expiry: "",
      bank_account_number: "",
      bank_ifsc: "",
      bank_name: "",
      account_holder_name: "",
      upi_id: "",
      experience_years: 0,
      languages_known: [],
      emergency_contact_name: "",
      emergency_contact_number: "",
      emergency_contact_relation: "",
      ...initialData,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-4">
      <div className="flex justify-end">
        <Button type="submit" size="sm" className="absolute top-2.5 right-12">
          Continue
        </Button>
      </div>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CustomInput
            id="full_name"
            label="Full Name"
            required
            placeholder="Enter full name"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="father_name"
            label="Father Name"
            // required
            placeholder="Enter father's name"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="email"
            label="Email"
            required
            placeholder="email@example.com"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="mobile"
            label="Mobile"
            required
            placeholder="10-digit mobile"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="alternate_mobile"
            label="Alternate Mobile"
            placeholder="10-digit mobile"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="dob"
            label="Date of Birth"
            required
            type="date"
            register={register}
            errors={errors}
          />
          <CustomSelect
            id="gender"
            label="Gender"
            required
            items={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            setValue={setValue}
            value={watch('gender')}
            errors={errors}
            defaultValue={initialData?.gender}
          />
          <CustomInput
            id="experience_years"
            label="Experience (Years)"
            required
            register={register}
            errors={errors}
            type="number"
            min={0}
          />
          <CustomSelect
            id="languages_known"
            label="Languages Known"
            required
            multi
            items={[
              { value: "hindi", label: "Hindi" },
              { value: "english", label: "English" },
              { value: "bengali", label: "Bengali" },
              { value: "tamil", label: "Tamil" },
              { value: "telugu", label: "Telugu" },
              { value: "marathi", label: "Marathi" },
              { value: "gujarati", label: "Gujarati" },
              { value: "kannada", label: "Kannada" }
            ]}
            setValue={setValue}
            multiValues={watch("languages_known") || []}
            errors={errors}
          />
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="w-5 h-5 text-primary" />
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomTextarea
            id="current_address"
            label="Current Address"
            required
            placeholder="Enter current address"
            register={register}
            errors={errors}
          />
          <CustomTextarea
            id="permanent_address"
            label="Permanent Address"
            required
            placeholder="Enter permanent address"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="city"
            label="City"
            required
            placeholder="Enter city"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="state"
            label="State"
            required
            placeholder="Enter state"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="pincode"
            label="Pincode"
            required
            placeholder="6-digit pincode"
            register={register}
            errors={errors}
          />
        </CardContent>
      </Card>

      {/* Identity Documents */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="w-5 h-5 text-primary" />
            Identity & License Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CustomInput
            id="aadhar_number"
            label="Aadhar Number"
            required
            placeholder="12-digit Aadhar"
            register={register}
            errors={errors}
            type="number"
          />
          <CustomInput
            id="pan_number"
            label="PAN Number"
            required
            placeholder="PAN number"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="driving_license_number"
            label="Driving License Number"
            required
            placeholder="License Number"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="driving_license_expiry"
            label="License Expiry Date"
            required
            type="date"
            register={register}
            errors={errors}
          />
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="w-5 h-5 text-primary" />
            Bank Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CustomInput
            id="bank_name"
            label="Bank Name"
            placeholder="Enter bank name"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="bank_account_number"
            label="Account Number"
            placeholder="Enter account number"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="bank_ifsc"
            label="IFSC code"
            placeholder="Enter IFSC code"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="account_holder_name"
            label="Account Holder Name"
            placeholder="Enter account holder name"
            register={register}
            errors={errors}
          />
          <CustomInput
            id="upi_id"
            label="UPI ID"
            required
            placeholder="Enter upi id"
            register={register}
            errors={errors}
          />
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
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomInput
            id="emergency_contact_name"
            label="Contact Name"
            placeholder="Enter contact name"
            register={register}
            errors={errors}
            required
          />
          <CustomInput
            id="emergency_contact_number"
            label="Contact Number"
            placeholder="10-digit mobile"
            register={register}
            errors={errors}
            type="number"
            required
          />
          <CustomInput
            id="emergency_contact_relation"
            label="Relation"
            placeholder="E.G., brother, father"
            register={register}
            errors={errors}
            required
          />
        </CardContent>
      </Card>
    </form>
  );
}
