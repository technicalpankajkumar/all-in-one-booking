import { CustomInput, CustomSelect, CustomTextarea } from "@/components/custom-ui";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
    features:  z.record(z.any()).optional()
});

type CarFormValues = z.infer<typeof carFormSchema>;

interface PackageBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OnBoardCab = ({ isOpen, onClose }: PackageBookingModalProps) => {
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

    function onSubmit(data: CarFormValues) {
        console.log("Car data:", data);
        toast.success("Car added successfully!");
        reset();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[96vh] p-0 flex flex-col">
                    <DialogHeader className="px-6 pt-4 pb-4 border-b bg-muted/30">
                        <DialogTitle className="text-2xl font-bold text-foreground">
                            Add New Cab
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto px-6 pb-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="flex gap-4 absolute top-2.5 right-12">
                                <Button type="button" size="sm" variant="outline" onClick={() => reset()}>
                                    Reset
                                </Button>
                                <Button type="submit" size="sm" className="flex-1">Add Car</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    multi
                                    items={[
                                        { value: "Sedan", label: "Sedan" },
                                        { value: "Mini", label: "Mini" },
                                        { value: "SUV", label: "SUV" },
                                    ]}
                                    setValue={setValue}
                                    multiValues={watch("car_type") || []}
                                    errors={errors}
                                    />
                                <CustomSelect
                                    id="fuel_type"
                                    label="Fuel Type"
                                    required
                                    multi
                                    items={[
                                        { value: "Diesel", label: "Diesel" },
                                        { value: "Petrol", label: "Petrol" },
                                        { value: "Electric", label: "Electric" },
                                    ]}
                                    setValue={setValue}
                                    multiValues={watch("fuel_type") || []}
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
                                    multi
                                    items={[
                                        { value: "per_trip", label: "Per Trip" },
                                        { value: "per_km", label: "Per KM" },
                                        { value: "per_day", label: "Per Day" },
                                    ]}
                                    setValue={setValue}
                                    multiValues={watch("price_unit") || []}
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
                                    onCheckedChange={(checked) => setValue('is_available',checked)}
                                />
                                <Label htmlFor="is_available" className="cursor-pointer text-muted-foreground ">
                                    Car Available
                                </Label>
                                </div>
                           
                        </form>
                    </div>
            </DialogContent>
        </Dialog>)
}

export default OnBoardCab