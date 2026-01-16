export type LabTest = {
  id: string;
  testName: string;
  testType: string;
  testCode: string;
  status: "completed" | "pending" | "processing" | "cancelled";
  sampleDate: string;
  reportDate?: string;
  doctorName: string;
  department: string;
  description: string;
  results?: LabResult[];
};

export type LabResult = {
  parameter: string;
  value: string | number;
  unit: string;
  normalRange: string;
  interpretation: "normal" | "high" | "low" | "critical" | "notApplicable";
};

export interface tourPackage {
  id: string;
  name: string;
  destination: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  isAC: boolean;
  mealsIncluded: boolean;
  hotelStar: number;
  travelType: 'flight' | 'bus' | 'train' | 'cruise';
  inclusions: string[];
  highlights: string[];
}

export interface FilterState {
  search: string;
  priceRange: [number, number];
  minRating: number;
  isAC: boolean | null;
  mealsIncluded: boolean | null;
  hotelStar: number | null;
  travelType: string | null;
}

export type ViewMode = 'grid' | 'table';


export interface DriverImage {
  id: string;
  driver_id: string;
  image_type: string;
  image_path: string;
  created_at: string;
}

export interface CarFeatures {
  id: string;
  car_id: string;
  ac: boolean;
  gps: boolean;
  music_system: boolean;
  automatic_transmission: boolean;
}

export interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  is_main: boolean;
}

export interface Car {
  id: string;
  car_name: string;
  car_type: string;
  fuel_type: string;
  seat_capacity: number;
  bag_capacity: number;
  base_price: number;
  price_unit: string;
  description: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  features: CarFeatures | null;
  images: CarImage[];
  fare_rules:object
}

export interface Driver {
  id: string;
  full_name: string;
  father_name: string;
  email: string;
  mobile: string;
  alternate_mobile: string;
  dob: string;
  gender: string;
  assigned_car_id: string | null;
  current_address: string;
  permanent_address: string;
  city: string;
  state: string;
  pincode: string;
  aadhar_number: string;
  pan_number: string;
  driving_license_number: string;
  driving_license_expiry: string;
  bank_account_number: string;
  bank_ifsc: string;
  bank_name: string;
  account_holder_name: string;
  upi_id: string;
  experience_years: number;
  languages_known: string[];
  availability_status: string;
  preferred_city: string | null;
  preferred_service_area: number;
  rating: number;
  total_rides: number;
  cancellation_rate: number;
  emergency_contact_name: string;
  emergency_contact_number: string;
  emergency_contact_relation: string;
  created_at: string;
  updated_at: string;
  images: DriverImage[];
  Car: Car | null;
}

export interface DriverBasicDetails {
  full_name: string;
  father_name: string;
  email: string;
  mobile: string;
  alternate_mobile: string;
  dob: string;
  gender: string;
  current_address: string;
  permanent_address: string;
  city: string;
  state: string;
  pincode: string;
  aadhar_number: string;
  pan_number: string;
  driving_license_number: string;
  driving_license_expiry: string;
  bank_account_number: string;
  bank_ifsc: string;
  bank_name: string;
  account_holder_name: string;
  upi_id: string;
  experience_years: number | string;
  languages_known: string[];
  emergency_contact_name: string;
  emergency_contact_number: string;
  emergency_contact_relation: string;
}

export interface DriverDocuments {
  profile: File | null;
  aadhar: File | null;
  pan: File | null;
  driving_license: File | null;
}


export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export interface Booking {
  id: string;
  user_id?: string;
  car_id: string;
  driver_id?: string;
  from_location: string;
  to_location: string;
  distance_km: number;
  total_price: number;
  booking_time?: Date;
  travel_date: Date;
  travel_time?: string;
  trip_type: 'one_way' | 'round_trip';
  passengers?: Passenger[];
  payment_method: 'Cash' | 'UPI' | 'Card';
  payment_status: 'Paid' | 'Pending';
  booking_status: 'Confirmed' | 'Cancelled' | 'Completed' | 'Booked';
}

export interface Transaction {
  id?: string;
  booking_id: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  payment_gateway?: string;
  created_at?: Date;
}

export interface BookingFormData {
  from_location: string;
  to_location: string;
  travel_date: Date | undefined;
  trip_type: 'One Way' | 'Round Trip';
  passengers: Passenger[];
  payment_method: 'Cash' | 'UPI' | 'Card';
  distance_km:number;
  pickup_time:string;
  waiting_min:number;
  driver_late_min:number;
}


export interface RoomType {
  id: string;
  name: string;
  size: string;
  view: string;
  bedType: string;
  bedCount: number;
  bathrooms: number;
  amenities: string[];
  plans: RoomPlan[];
  images?: string[];
}

export interface RoomPlan {
  id: string;
  name: string;
  features: string[];
  originalPrice: number;
  discountedPrice: number;
  taxesAndFees: number;
  freeCancellation: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  category: string;
  price:number;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  amenities: {
    basicFacilities: string[];
    generalServices: string[];
    healthAndWellness: string[];
    transfers: string[];
    roomAmenities: string[];
    foodAndDrinks: string[];
    safetyAndSecurity: string[];
    entertainment: string[];
    commonArea: string[];
    businessCenter: string[];
    otherFacilities: string[];
  };
  roomTypes: RoomType[];
  images?: string[];
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage?: string;
  hotelAddress: string;
  roomName: string;
  planName: string;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: number;
  };
  rooms: number;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  };
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending' | 'checked-in' | 'checked-out';
  checkInTime?: Date;
  checkOutTime?: Date;
  specialRequests?: string;
  paymentMethod: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export const AMENITIES_DATA = {
  basicFacilities: [
    { name: "Power Backup", note: "" },
    { name: "Elevator/Lift", note: "" },
    { name: "Housekeeping", note: "" },
    { name: "Washing Machine", note: "" },
    { name: "Umbrellas", note: "" },
    { name: "Room Service", note: "Limited duration" },
    { name: "Laundry Service", note: "Paid" },
    { name: "Air Conditioning", note: "Room controlled" },
    { name: "Newspaper", note: "Local Language" },
    { name: "Free Parking", note: "Free - Onsite" },
    { name: "Free Wi-Fi", note: "Speed Suitable for working" },
  ],
  generalServices: [
    { name: "Luggage Assistance", note: "" },
    { name: "Doctor on Call", note: "" },
    { name: "Multilingual Staff", note: "English, Telugu" },
  ],
  healthAndWellness: [
    { name: "First-aid Services", note: "" },
    { name: "Gym", note: "" },
    { name: "Spa", note: "" },
    { name: "Swimming Pool", note: "" },
  ],
  transfers: [
    { name: "Paid Airport Transfers", note: "" },
    { name: "Paid Shuttle Service", note: "" },
  ],
  roomAmenities: [
    { name: "Mineral Water", note: "" },
    { name: "Hairdryer", note: "Available in some rooms" },
    { name: "Fireplace", note: "Available in some rooms" },
    { name: "Air Conditioning", note: "Room controlled" },
    { name: "Dental Kit", note: "Available in some rooms" },
    { name: "Iron/Ironing Board", note: "Available in some rooms" },
    { name: "Geyser/Water Heater", note: "Available in some rooms" },
    { name: "Toiletries", note: "Shampoo, Soap" },
    { name: "Dining Area", note: "Available in some rooms" },
    { name: "Work Desk", note: "Available in some rooms" },
    { name: "Heater", note: "Available in some rooms" },
  ],
  foodAndDrinks: [
    { name: "Restaurant", note: "Halal, Kosher" },
    { name: "Dining Area", note: "" },
    { name: "Barbeque", note: "" },
  ],
  safetyAndSecurity: [
    { name: "CCTV", note: "" },
    { name: "Fire Extinguishers", note: "" },
    { name: "Security Alarms", note: "" },
    { name: "Security Guard", note: "" },
  ],
  entertainment: [
    { name: "Entertainment", note: "" },
    { name: "Movie Room", note: "" },
    { name: "Music System", note: "" },
  ],
  commonArea: [
    { name: "Lounge", note: "Cigar lounge" },
    { name: "Balcony/Terrace", note: "" },
    { name: "Reception", note: "24 hours" },
    { name: "Garden", note: "" },
  ],
  businessCenter: [
    { name: "Printer", note: "" },
    { name: "Photocopying", note: "" },
    { name: "Business Centre", note: "" },
    { name: "Conference Room", note: "" },
    { name: "Banquet", note: "" },
    { name: "Fax Service", note: "" },
  ],
  otherFacilities: [
    { name: "Cloak Room", note: "" },
    { name: "Concierge", note: "" },
    { name: "Kids Play Area", note: "" },
  ],
};

export const HOTEL_CATEGORIES = [
  "Budget",
  "Standard",
  "Premium",
  "Luxury",
  "Boutique",
  "Resort",
  "Business Hotel",
  "Heritage",
];

export const ROOM_AMENITIES_OPTIONS = [
  "Daily Housekeeping",
  "Free Wi-Fi",
  "In-room Dining",
  "Room Service",
  "Bathroom",
  "Mineral Water",
  "Air Conditioning",
  "Work Desk",
  "Telephone",
  "Chair",
  "24-hour In-room Dining",
  "Iron/Ironing Board",
];
