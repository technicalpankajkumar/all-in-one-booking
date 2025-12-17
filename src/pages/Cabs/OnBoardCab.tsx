import { addCab } from "@/api/cab";
import { useCreateCabMutation, useGetCabFeaturesQuery } from "@/app/services/cabApi";
import { CustomCheckBoxGroup, CustomInput, CustomSelect, CustomTextarea } from "@/components/custom-ui";
import { CustomSelectOption } from "@/components/custom-ui/CustomSelectOption";
import { ImageFile, MultiImageUploader } from "@/components/custom-ui/MultiImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { WORLD_CAR_TYPES } from "@/data/listConstant";
import { debounce } from "@/helper/debounde";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// const FEATURES = [
//     { key: "AC", label: "A/C" },
//     { key: "GPS", label: "GPS Navigation" },
//     { key: "Music System", label: "Music System" },
//     { key: "Automatic Transmission", label: "Automatic Transmission" },
// ] as const;

const carFormSchema = z.object({
    car_name: z
        .string()
        .min(2, "Car name must be at least 2 characters")
        .max(100),
    car_type: z.string().nonempty("Please select a car type"),
    fuel_type: z.string().nonempty("Please select a fuel type"),
    seat_capacity: z.coerce
        .number()
        .int()
        .min(1, "Must be at least 1")
        .max(50, "Maximum 50 seats"),
    bag_capacity: z.coerce
        .number()
        .int()
        .min(0, "Cannot be negative")
        .max(20, "Maximum 20 bags"),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
    is_available: z.boolean().default(true),
    feature_ids: z.array(z.string()).default([]),
    // 🔽 ADD THIS
    fare_rules: z.object({
        base_fare: z.coerce
            .number()
            .min(1, "Base fare must be ≥ 0"),
        minimum_fare: z.coerce
            .number()
            .min(0, "Minimum fare must be ≥ 0"),
        night_multiplier: z.coerce
            .number()
            .min(1, "Night multiplier must be ≥ 1"),
        late_compensation_per_min: z.coerce
            .number()
            .min(0, "Late compensation must be ≥ 0"),
        waiting_charge_per_min: z.coerce
            .number()
            .min(0, "Waiting charge must be ≥ 0"),
        price_per_min: z.coerce
            .number()
            .min(0, "Price per minute must be ≥ 0"),
        price_per_km: z.coerce
            .number()
            .min(0, "Price per km must be ≥ 0"),
        night_start: z
            .string()
            .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
        night_end: z
            .string()
            .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
    }),
})
    .refine(
        (data) =>
            data.fare_rules.night_start !== data.fare_rules.night_end,
        {
            message: "Night start and end time cannot be the same",
            path: ["fare_rules", "night_end"],
        }
    );

type CarFormValues = z.infer<typeof carFormSchema>;

interface PackageBookingModalProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
}

const OnBoardCab = ({ isOpen, onClose }: PackageBookingModalProps) => {
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [createCab, { isLoading }] = useCreateCabMutation()
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const { data, isLoading: isFeatureLoading } = useGetCabFeaturesQuery({
        search, type, limit: 30
    });
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        getValues,
        formState: { errors },
    } = useForm<CarFormValues>({
        resolver: zodResolver(carFormSchema),
        defaultValues: {
            car_name: "",
            car_type: undefined,
            fuel_type: "",
            seat_capacity: 4,
            bag_capacity: 2,
            base_price: 0,
            // price_unit: undefined,
            description: "",
            is_available: true,
            feature_ids: [],
            fare_rules: {
                base_fare: 0,
                night_multiplier: 0,
                minimum_fare: 0,
                late_compensation_per_min: 0,
                waiting_charge_per_min: 0,
                price_per_min: 0,
                price_per_km: 0,
                night_start: "21:00",
                night_end: "05:00"
            }
        },
    });

    async function onSubmit(data: CarFormValues) {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));

            let Images = uploadedImages?.map(res => res.file);
            if (Images && Images.length > 0) {
                Images.forEach((file) => {
                    formData.append("images", file);
                });
            }
            let res = await createCab(formData);
            if (res?.data?.success) {
                toast.success("Cab Added Successfully!")
                onClose(false)
                setUploadedImages([])
                reset();
            } else if (!res?.error?.data?.success) {
                toast.error(res?.error?.data?.message)
            }
        } catch (e) {
            toast.error(e)
        }
    }
    const debouncedSearch = useMemo(
        () =>
            debounce((value) => {
                setSearch(value);
            }, 500),
        []
    );

    const onSearch = (e) => {
        debouncedSearch(e);
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose(false)}>
            <DialogContent className="max-w-2xl max-h-[96vh] p-0 flex flex-col">
                <DialogHeader className="px-6 pt-4 pb-4 border-b bg-muted/30">
                    <DialogTitle className="text-2xl font-bold text-foreground">
                        Add New Cab
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto px-6 pb-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex gap-4 absolute top-2.5 right-12">
                            <Button type="button" size="sm" variant="outline" onClick={() => reset()}>
                                Reset
                            </Button>
                            <Button type="submit" size="sm" className="flex-1">Submit</Button>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Car Name */}
                                    <CustomInput
                                        id="car_name"
                                        label="Car Name"
                                        required
                                        placeholder="Toyota Camry"
                                        register={register}
                                        errors={errors}
                                    />
                                    <CustomSelect
                                        id="car_type"
                                        label="Car Type"
                                        required
                                        items={WORLD_CAR_TYPES}
                                        setValue={setValue}
                                        value={watch("car_type")}
                                        errors={errors}
                                        searchable
                                    />
                                    <CustomSelect
                                        id="fuel_type"
                                        label="Fuel Type"
                                        required
                                        items={[
                                            { value: "Diesel", label: "Diesel" },
                                            { value: "Petrol", label: "Petrol" },
                                            { value: "Electric", label: "Electric" },
                                        ]}
                                        setValue={setValue}
                                        value={watch("fuel_type")}
                                        errors={errors}
                                    />
                                    <CustomInput
                                        id="seat_capacity"
                                        label="Seat Capacity"
                                        required
                                        placeholder="Enter Seat Capacity"
                                        register={register}
                                        errors={errors}
                                        type="number"
                                        min={2}
                                    />
                                    <CustomInput
                                        id="bag_capacity"
                                        label="Bag Capacity"
                                        required
                                        placeholder="Enter Bag Capacity"
                                        register={register}
                                        errors={errors}
                                        type="number"
                                        min={2}
                                    />
                                    

                                    {/* <CustomSelect
                                        id="price_unit"
                                        label="Price Unit"
                                        required
                                        items={[
                                            { value: "per_trip", label: "Per Trip" },
                                            { value: "per_km", label: "Per KM" },
                                            { value: "per_day", label: "Per Day" },
                                        ]}
                                        setValue={setValue}
                                        value={watch("price_unit")}
                                        errors={errors}
                                    /> */}
                                </div>
                                <CustomTextarea
                                    id="description"
                                    label="Description"
                                    required
                                    placeholder="Enter car description, features, and other details..."
                                    register={register}
                                    errors={errors}
                                />
                                <div className="flex gap-2">
                                    <Checkbox
                                        id="is_available"
                                        checked={watch('is_available')}
                                        onCheckedChange={(checked) => setValue('is_available', !!checked)}
                                    />
                                    <Label htmlFor="is_available" className="cursor-pointer text-muted-foreground ">
                                        Car Available
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent >
                                <CustomSelectOption
                                    mode="multiple"
                                    size="md"
                                    searchable
                                    showChips
                                    allowClear
                                    groupBy="category"
                                    options={data?.data?.map(res => ({ label: res.name, value: res.id, category: res.category }))}
                                    value={watch("feature_ids")}
                                    onChange={(v) => setValue('feature_ids', v)}
                                    placeholder="Select Features"
                                    onSearch={onSearch}

                                />
                                {/* Sepreded mutli checkbox */}
                                {/* <CustomCheckBoxGroup
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    featureList={FEATURES}
                                /> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    Fare Rule's
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <CustomInput
                                    id="base_fare"
                                    label="Base Fare"
                                    required
                                    placeholder="Enter Base Fare"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="text"
                                />
                                <CustomInput
                                    id="price_per_km"
                                    label="Price Per KM"
                                    required
                                    placeholder="Enter price per KM"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="text"
                                />
                                <CustomInput
                                    id="price_per_min"
                                    label="Price Per Minute"
                                    required
                                    placeholder="Enter price per minute"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="text"
                                />
                                <CustomInput
                                    id="waiting_charge_per_min"
                                    label="Wating Charge Per Minute"
                                    required
                                    placeholder="Enter Wating charge per minute"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="text"
                                />
                                <CustomInput
                                    id="late_compensation_per_min"
                                    label="Late Compensation Per Minute"
                                    required
                                    placeholder="Enter late compensation per minute"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="text"
                                />
                                <CustomInput
                                    id="minimum_fare"
                                    label="Minimum Fare"
                                    required
                                    placeholder="Enter minimum fare"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="text"
                                />
                                <CustomInput
                                    id="night_multiplier"
                                    label="Night Multiplier"
                                    required
                                    placeholder="Enter night multiplier"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="text"
                                />
                                <CustomInput
                                    id="night_start"
                                    label="Night Start"
                                    required
                                    placeholder="Enter night start"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="time"
                                />
                                <CustomInput
                                    id="night_end"
                                    label="Night End"
                                    required
                                    placeholder="Enter night end"
                                    objId="fare_rules"
                                    register={register}
                                    errors={errors}
                                    type="time"
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    Cab Images
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <MultiImageUploader
                                    images={uploadedImages}
                                    onChange={setUploadedImages}
                                    maxImages={8}
                                    maxSizeInMB={5}
                                    description="Upload up to 8 images (JPG, PNG, WebP, GIF)"
                                />
                            </CardContent>
                        </Card>

                    </form>
                </div>
            </DialogContent>
        </Dialog>)
}

export default OnBoardCab