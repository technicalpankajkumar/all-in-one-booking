import { DriverDetailsView } from "./partials/DriverDetailView";
import { Driver } from "../../data/types";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock driver data based on the provided JSON
const mockDriver: Driver = {
  id: "693008fc18d6b7ce43af4cc9",
  full_name: "Amit Kumar",
  father_name: "Rajesh Kumar",
  email: "amit.kumar1@example.com",
  mobile: "9876543220",
  alternate_mobile: "9123456780",
  dob: "1992-04-18T00:00:00.000Z",
  gender: "male",
  assigned_car_id: null,
  current_address: "House No. 45, Sector 12, Noida, Uttar Pradesh",
  permanent_address: "Village Rampur, Patna, Bihar",
  city: "Noida",
  state: "Uttar Pradesh",
  pincode: "201301",
  aadhar_number: "456789012345",
  pan_number: "ABCDE1234F",
  driving_license_number: "DL-092011-556677",
  driving_license_expiry: "2030-08-25T00:00:00.000Z",
  bank_account_number: "123456789012",
  bank_ifsc: "SBIN0000456",
  bank_name: "State Bank of India",
  account_holder_name: "Amit Kumar",
  upi_id: "amitkumar@upi",
  experience_years: 6,
  languages_known: ["Hindi", "English"],
  availability_status: "offline",
  preferred_city: null,
  preferred_service_area: 5,
  rating: 5,
  total_rides: 0,
  cancellation_rate: 0,
  emergency_contact_name: "Sunil Kumar",
  emergency_contact_number: "9988776655",
  emergency_contact_relation: "Brother",
  created_at: "2025-12-03T09:55:08.187Z",
  updated_at: "2025-12-03T09:55:08.187Z",
  images: [
    {
      id: "693008fc18d6b7ce43af4cca",
      driver_id: "693008fc18d6b7ce43af4cc9",
      image_type: "profile",
      image_path: "/uploads/driver/other/1764755708147-profile-8kyyge.jpg",
      created_at: "2025-12-03T09:55:08.310Z",
    },
  ],
  Car: {
    id: "692fcd58d5a011e00f5d1324",
    car_name: "Maruti X100",
    car_type: "Mini",
    fuel_type: "Petrol",
    seat_capacity: 4,
    bag_capacity: 1,
    base_price: 9.5,
    price_unit: "per_km",
    description: "Best for short city rides and budget trips.",
    is_available: true,
    created_at: "2025-12-03T05:40:40.568Z",
    updated_at: "2025-12-03T06:51:37.780Z",
    features: {
      id: "692fcd58d5a011e00f5d1325",
      car_id: "692fcd58d5a011e00f5d1324",
      ac: true,
      gps: false,
      music_system: true,
      automatic_transmission: false,
    },
    images: [
      {
        id: "692fcd58d5a011e00f5d1326",
        car_id: "692fcd58d5a011e00f5d1324",
        image_url: "/uploads/1764740440517-dtc58q.jpg",
        is_main: false,
      },
    ],
  },
};

export default function DriverDetailsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className=" mx-auto px-4 py-4">
        <DriverDetailsView driver={mockDriver} />
      </main>
    </div>
  );
}
