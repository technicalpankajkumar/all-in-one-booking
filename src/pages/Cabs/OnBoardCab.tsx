import { addCab } from "@/api/cab";
import { CustomCheckBoxGroup, CustomInput, CustomSelect, CustomTextarea } from "@/components/custom-ui";
import { ImageFile, MultiImageUploader } from "@/components/custom-ui/MultiImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const FEATURES = [
    { key: "ac", label: "A/C" },
    { key: "gps", label: "GPS Navigation" },
    { key: "music_system", label: "Music System" },
    { key: "automatic_transmission", label: "Automatic Transmission" },
] as const;

const carFormSchema = z.object({
    car_name: z.string().min(2, "Car name must be at least 2 characters").max(100),
    car_type: z.enum(["Mini", "Sedan", "SUV"], {
        required_error: "Please select a car type",
    }),
    fuel_type: z.string().optional(),
    seat_capacity: z.coerce.number().int().min(1, "Must be at least 1").max(50, "Maximum 50 seats"),
    bag_capacity: z.coerce.number().int().min(0, "Cannot be negative").max(20, "Maximum 20 bags"),
    base_price: z.coerce.number().positive("Price must be positive"),
    price_unit: z.enum(["per_trip", "per_km", "per_day"], {
        required_error: "Please select a price unit",
    }),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
    is_available: z.boolean().default(true),
    features: z.object({
        ac: z.boolean().default(false),
        gps: z.boolean().default(false),
        music_system: z.boolean().default(false),
        automatic_transmission: z.boolean().default(false),
    })
});

type CarFormValues = z.infer<typeof carFormSchema>;

interface PackageBookingModalProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
}

const OnBoardCab = ({ isOpen, onClose }: PackageBookingModalProps) => {
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
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
            price_unit: undefined,
            description: "",
            is_available: true,
            features: {
                ac: false,
                gps: false,
                music_system: false,
                automatic_transmission: false
            }
        },
    });

    async function onSubmit(data: CarFormValues) {
        const res = await addCab(data, uploadedImages?.map(res => res.file));
        if (res.success) {
            toast.success("Cab Added Successfully!")
            onClose(false)
            setUploadedImages([])
            reset();
        } else {
            toast.error(res.message)
        }
    }

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

                                        items={[
                                            { value: "Sedan", label: "Sedan" },
                                            { value: "Mini", label: "Mini" },
                                            { value: "SUV", label: "SUV" },
                                        ]}
                                        setValue={setValue}
                                        value={watch("car_type")}
                                        errors={errors}
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
                                    <CustomInput
                                        id="base_price"
                                        label="Base Price"
                                        required
                                        placeholder="Enter Base Price"
                                        register={register}
                                        errors={errors}
                                        type="number"
                                    />

                                    <CustomSelect
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
                                    />
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
                                <CustomCheckBoxGroup
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    featureList={FEATURES}
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