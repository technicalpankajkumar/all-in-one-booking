import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

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
});

type CarFormValues = z.infer<typeof carFormSchema>;

interface PackageBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OnBoardCab = ({ isOpen, onClose }: PackageBookingModalProps) => {
    const form = useForm<CarFormValues>({
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
        },
    });

    function onSubmit(data: CarFormValues) {
        console.log("Car data:", data);
        toast.success("Car added successfully!");
        form.reset();
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] p-0 flex flex-col">
                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-foreground">
                            Add New Cab
                        </DialogTitle>
                        <DialogDescription>
                            On board new cabs for better bussiness & Fill in the details to add a new car to the fleet.
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <Form {...form}>
                    <div className="flex-1 overflow-y-auto px-6 pb-5">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Car Name */}
                                <FormField
                                    control={form.control}
                                    name="car_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Car Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Toyota Camry" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Car Type */}
                                <FormField
                                    control={form.control}
                                    name="car_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Car Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select car type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Mini">Mini</SelectItem>
                                                    <SelectItem value="Sedan">Sedan</SelectItem>
                                                    <SelectItem value="SUV">SUV</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Fuel Type */}
                                <FormField
                                    control={form.control}
                                    name="fuel_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fuel Type</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Petrol, Diesel, Electric" {...field} />
                                            </FormControl>
                                            <FormDescription>Optional</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Seat Capacity */}
                                <FormField
                                    control={form.control}
                                    name="seat_capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Seat Capacity</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="4" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Bag Capacity */}
                                <FormField
                                    control={form.control}
                                    name="bag_capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bag Capacity</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="2" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Base Price */}
                                <FormField
                                    control={form.control}
                                    name="base_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Base Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" placeholder="50.00" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Price Unit */}
                                <FormField
                                    control={form.control}
                                    name="price_unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price Unit</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select price unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="per_trip">Per Trip</SelectItem>
                                                    <SelectItem value="per_km">Per KM</SelectItem>
                                                    <SelectItem value="per_day">Per Day</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter car description, features, and other details..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Optional - Max 500 characters</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Is Available */}
                            <FormField
                                control={form.control}
                                name="is_available"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Car Available</FormLabel>
                                            <FormDescription>Mark this car as available for booking</FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1">Add Car</Button>
                                <Button type="button" variant="outline" onClick={() => form.reset()}>
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>)
}

export default OnBoardCab