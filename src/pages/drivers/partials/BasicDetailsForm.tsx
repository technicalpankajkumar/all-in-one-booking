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

const basicDetailsSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  father_name: z.string().min(2, "Father's name is required"),
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
  bank_account_number: z.string().min(8, "Account number is required"),
  bank_ifsc: z.string().min(11, "IFSC code is required"),
  bank_name: z.string().min(2, "Bank name is required"),
  account_holder_name: z.string().min(2, "Account holder name is required"),
  upi_id: z.string().optional(),
  experience_years: z.number().min(0, "Experience must be positive"),
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

  const languages = ["Hindi", "English", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada"];
  const selectedLanguages = watch("languages_known") || [];

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setValue("languages_known", selectedLanguages.filter((l) => l !== lang));
    } else {
      setValue("languages_known", [...selectedLanguages, lang]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-4">
      {/* Personal Information */}
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
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input id="full_name" placeholder="Enter full name" {...register("full_name")} />
            {errors.full_name && <p className="text-xs text-destructive">{errors.full_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="father_name">Father's Name *</Label>
            <Input id="father_name" placeholder="Enter father's name" {...register("father_name")} />
            {errors.father_name && <p className="text-xs text-destructive">{errors.father_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile *</Label>
            <Input id="mobile" placeholder="10-digit mobile" {...register("mobile")} />
            {errors.mobile && <p className="text-xs text-destructive">{errors.mobile.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="alternate_mobile">Alternate Mobile</Label>
            <Input id="alternate_mobile" placeholder="10-digit mobile" {...register("alternate_mobile")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth *</Label>
            <Input id="dob" type="date" {...register("dob")} />
            {errors.dob && <p className="text-xs text-destructive">{errors.dob.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select onValueChange={(value) => setValue("gender", value)} defaultValue={initialData?.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience_years">Experience (Years) *</Label>
            <Input
              id="experience_years"
              type="number"
              min="0"
              {...register("experience_years", { valueAsNumber: true })}
            />
            {errors.experience_years && <p className="text-xs text-destructive">{errors.experience_years.message}</p>}
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <Label>Languages Known *</Label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedLanguages.includes(lang)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            {errors.languages_known && <p className="text-xs text-destructive">{errors.languages_known.message}</p>}
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="current_address">Current Address *</Label>
            <Textarea id="current_address" placeholder="Enter current address" {...register("current_address")} />
            {errors.current_address && <p className="text-xs text-destructive">{errors.current_address.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="permanent_address">Permanent Address *</Label>
            <Textarea id="permanent_address" placeholder="Enter permanent address" {...register("permanent_address")} />
            {errors.permanent_address && <p className="text-xs text-destructive">{errors.permanent_address.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input id="city" placeholder="Enter city" {...register("city")} />
            {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input id="state" placeholder="Enter state" {...register("state")} />
            {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input id="pincode" placeholder="6-digit pincode" {...register("pincode")} />
            {errors.pincode && <p className="text-xs text-destructive">{errors.pincode.message}</p>}
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="aadhar_number">Aadhar Number *</Label>
            <Input id="aadhar_number" placeholder="12-digit Aadhar" {...register("aadhar_number")} />
            {errors.aadhar_number && <p className="text-xs text-destructive">{errors.aadhar_number.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan_number">PAN Number *</Label>
            <Input id="pan_number" placeholder="PAN number" {...register("pan_number")} />
            {errors.pan_number && <p className="text-xs text-destructive">{errors.pan_number.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="driving_license_number">Driving License Number *</Label>
            <Input id="driving_license_number" placeholder="License number" {...register("driving_license_number")} />
            {errors.driving_license_number && (
              <p className="text-xs text-destructive">{errors.driving_license_number.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="driving_license_expiry">License Expiry Date *</Label>
            <Input id="driving_license_expiry" type="date" {...register("driving_license_expiry")} />
            {errors.driving_license_expiry && (
              <p className="text-xs text-destructive">{errors.driving_license_expiry.message}</p>
            )}
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="bank_name">Bank Name *</Label>
            <Input id="bank_name" placeholder="Enter bank name" {...register("bank_name")} />
            {errors.bank_name && <p className="text-xs text-destructive">{errors.bank_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank_account_number">Account Number *</Label>
            <Input id="bank_account_number" placeholder="Account number" {...register("bank_account_number")} />
            {errors.bank_account_number && (
              <p className="text-xs text-destructive">{errors.bank_account_number.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank_ifsc">IFSC Code *</Label>
            <Input id="bank_ifsc" placeholder="IFSC code" {...register("bank_ifsc")} />
            {errors.bank_ifsc && <p className="text-xs text-destructive">{errors.bank_ifsc.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="account_holder_name">Account Holder Name *</Label>
            <Input id="account_holder_name" placeholder="Account holder name" {...register("account_holder_name")} />
            {errors.account_holder_name && (
              <p className="text-xs text-destructive">{errors.account_holder_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="upi_id">UPI ID</Label>
            <Input id="upi_id" placeholder="example@upi" {...register("upi_id")} />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="emergency_contact_name">Contact Name *</Label>
            <Input id="emergency_contact_name" placeholder="Contact name" {...register("emergency_contact_name")} />
            {errors.emergency_contact_name && (
              <p className="text-xs text-destructive">{errors.emergency_contact_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency_contact_number">Contact Number *</Label>
            <Input
              id="emergency_contact_number"
              placeholder="10-digit mobile"
              {...register("emergency_contact_number")}
            />
            {errors.emergency_contact_number && (
              <p className="text-xs text-destructive">{errors.emergency_contact_number.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency_contact_relation">Relation *</Label>
            <Input
              id="emergency_contact_relation"
              placeholder="e.g., Brother, Father"
              {...register("emergency_contact_relation")}
            />
            {errors.emergency_contact_relation && (
              <p className="text-xs text-destructive">{errors.emergency_contact_relation.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

    </form>
  );
}
