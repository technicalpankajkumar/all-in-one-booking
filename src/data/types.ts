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
  experience_years: number;
  languages_known: string[];
  emergency_contact_name: string;
  emergency_contact_number: string;
  emergency_contact_relation: string;
}

export interface DriverDocuments {
  profile: File | null;
  aadhar_front: File | null;
  aadhar_back: File | null;
  pan: File | null;
  driving_license_front: File | null;
  driving_license_back: File | null;
}


export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export interface Booking {
  id?: string;
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
  travel_time: string;
  trip_type: 'one_way' | 'round_trip';
  passengers: Passenger[];
  payment_method: 'Cash' | 'UPI' | 'Card';
  car_id: string;
  driver_id?: string;
}
