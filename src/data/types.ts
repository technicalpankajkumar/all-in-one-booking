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
