import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BookingForm } from "@/components/BookingForm";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Review } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Waves,
  Utensils,
  Dumbbell,
  PawPrint,
  Check,
  ArrowLeft,
  Building2,
  Bed,
  MessageSquare,
  Maximize2,
  Eye,
  Bath,
} from "lucide-react";
import { Hotel } from "@/components/HotelCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking, RoomPlan, RoomType } from "@/data/types";

const amenityIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  Parking: Car,
  Pool: Waves,
  Restaurant: Utensils,
  Gym: Dumbbell,
  "Pet Friendly": PawPrint,
  Spa: Waves,
  "Beach Access": Waves,
};

// Mock reviews data
const mockReviews: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      userName: "Sarah Johnson",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5.0,
      date: "2024-01-15",
      title: "Absolutely Perfect Stay!",
      comment: "The Grand Plaza exceeded all expectations. From the moment we arrived, the staff was incredibly attentive. The room was spotless with stunning city views. The rooftop pool is a must-visit, especially at sunset. Will definitely return!",
      photos: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80",
      ],
      helpful: 24,
      categories: { cleanliness: 5.0, service: 5.0, facilities: 4.8, location: 5.0 },
    },
    {
      id: 2,
      userName: "Michael Chen",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 4.5,
      date: "2024-01-10",
      title: "Great Location and Amenities",
      comment: "Fantastic hotel right in the heart of Manhattan. The spa services were excellent and the Michelin-starred restaurant did not disappoint. Only minor issue was some noise from the street, but the comfort of the room made up for it.",
      photos: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80"],
      helpful: 18,
      categories: { cleanliness: 4.8, service: 4.5, facilities: 4.7, location: 5.0 },
    },
    {
      id: 3,
      userName: "Emily Rodriguez",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 4.8,
      date: "2024-01-05",
      title: "Luxury at Its Finest",
      comment: "Beautiful hotel with impeccable service. The concierge helped us plan our entire NYC trip. Breakfast was exceptional. Highly recommend the corner suites for the best views!",
      helpful: 15,
      categories: { cleanliness: 5.0, service: 5.0, facilities: 4.5, location: 4.8 },
    },
  ],
  2: [
    {
      id: 4,
      userName: "David Martinez",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 4.9,
      date: "2024-01-20",
      title: "Paradise Found",
      comment: "This beachfront resort is absolutely stunning. Direct beach access, multiple pools, and the oceanfront suites are incredible. The sunset views are breathtaking. Perfect for a romantic getaway!",
      photos: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80",
      ],
      helpful: 32,
      categories: { cleanliness: 5.0, service: 4.8, facilities: 5.0, location: 5.0 },
    },
    {
      id: 5,
      userName: "Amanda Wilson",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
      rating: 4.3,
      date: "2024-01-12",
      title: "Amazing Beach Resort",
      comment: "Love everything about this place! The beach is pristine, pools are well-maintained, and the water sports center has so many activities. Food at the beachfront restaurant is fresh and delicious.",
      helpful: 21,
      categories: { cleanliness: 4.5, service: 4.2, facilities: 4.5, location: 5.0 },
    },
  ],
  3: [
    {
      id: 6,
      userName: "James Anderson",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      rating: 5.0,
      date: "2024-01-18",
      title: "Perfect Mountain Escape",
      comment: "Ski-in/ski-out access is a game changer! The lodge has such a cozy atmosphere with amazing mountain views. After skiing, relaxing by the fire pit with hot chocolate was heavenly. Can't wait to come back!",
      photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"],
      helpful: 27,
      categories: { cleanliness: 5.0, service: 5.0, facilities: 5.0, location: 5.0 },
    },
  ],
  4: [
    {
      id: 7,
      userName: "Lisa Thompson",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      rating: 4.6,
      date: "2024-01-14",
      title: "Perfect Downtown Location",
      comment: "Great boutique hotel in the heart of San Francisco. Walking distance to everything! The modern design is beautiful and the farm-to-table restaurant is fantastic. Staff was very helpful with recommendations.",
      helpful: 19,
      categories: { cleanliness: 4.8, service: 4.5, facilities: 4.4, location: 5.0 },
    },
  ],
  5: [
    {
      id: 8,
      userName: "Robert Lee",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      rating: 4.4,
      date: "2024-01-16",
      title: "Peaceful Lakeside Retreat",
      comment: "Such a serene location! We spent our days kayaking and fishing. The views from our deck were incredible. Perfect for a quiet getaway from city life.",
      helpful: 14,
      categories: { cleanliness: 4.5, service: 4.3, facilities: 4.2, location: 4.8 },
    },
  ],
  6: [
    {
      id: 9,
      userName: "Patricia Brown",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
      rating: 4.9,
      date: "2024-01-17",
      title: "Southern Charm at Its Best",
      comment: "This historic manor is absolutely gorgeous! The restored architecture is stunning and the southern hospitality is genuine. The garden terrace is perfect for evening drinks. A truly special place!",
      photos: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80"],
      helpful: 23,
      categories: { cleanliness: 5.0, service: 5.0, facilities: 4.8, location: 4.8 },
    },
  ],
};

// Extended mock data with more images
const mockHotelsDetailed: Record<number, Hotel & { images: string[]; fullDescription: string; facilities: string[] }> = {
  1: {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "New York, NY",
    rating: 4.8,
    reviews: 234,
    price: 299,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    amenities: ["Free WiFi", "Parking", "Pool", "Spa"],
    description: "Luxurious 5-star hotel in the heart of Manhattan with stunning city views and world-class amenities.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    ],
    fullDescription:
      "Experience unparalleled luxury at the Grand Plaza Hotel, a prestigious 5-star establishment located in the heart of Manhattan. Our hotel combines classic elegance with modern sophistication, offering breathtaking views of the New York City skyline. Each room is meticulously designed with premium furnishings, marble bathrooms, and state-of-the-art technology to ensure your comfort and convenience. Indulge in world-class dining at our Michelin-starred restaurant, relax in our rooftop infinity pool, or rejuvenate at our award-winning spa. Whether you're visiting for business or pleasure, our dedicated concierge team is ready to make your stay unforgettable.",
    facilities: [
      "24/7 Concierge Service",
      "Rooftop Infinity Pool",
      "Michelin-Starred Restaurant",
      "Full-Service Spa",
      "State-of-the-Art Fitness Center",
      "Business Center",
      "Valet Parking",
      "Room Service",
    ],
  },
  2: {
    id: 2,
    name: "Beachfront Resort",
    location: "Miami, FL",
    rating: 4.6,
    reviews: 189,
    price: 450,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    amenities: ["Free WiFi", "Pool", "Beach Access", "Restaurant"],
    description: "Tropical paradise with private beach access, infinity pools, and oceanfront suites.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80",
    ],
    fullDescription:
      "Escape to paradise at our stunning Beachfront Resort in Miami. Wake up to the sound of waves and enjoy direct access to pristine white sandy beaches. Our resort features spacious oceanfront suites with private balconies, multiple infinity pools, and world-class dining options. Spend your days lounging by the pool, enjoying water sports, or being pampered at our beachside spa. As the sun sets, savor fresh seafood and cocktails at our beachfront restaurant while watching the colors dance across the ocean.",
    facilities: [
      "Private Beach Access",
      "Multiple Swimming Pools",
      "Water Sports Center",
      "Beachside Spa",
      "Oceanfront Dining",
      "Beach Cabanas",
      "Kids Club",
      "Poolside Bar",
    ],
  },
  3: {
    id: 3,
    name: "Mountain Lodge",
    location: "Aspen, CO",
    rating: 4.9,
    reviews: 156,
    price: 380,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    amenities: ["Free WiFi", "Parking", "Gym", "Pet Friendly"],
    description: "Cozy mountain retreat with ski-in/ski-out access and breathtaking alpine views.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    ],
    fullDescription:
      "Nestled in the heart of the Rocky Mountains, our Mountain Lodge offers the ultimate alpine getaway. Enjoy ski-in/ski-out access during winter months and world-class hiking trails in summer. Our rustic yet luxurious rooms feature stone fireplaces, plush bedding, and panoramic mountain views. After a day on the slopes, unwind in our heated outdoor pool or enjoy après-ski cocktails by the fire pit.",
    facilities: [
      "Ski-In/Ski-Out Access",
      "Heated Outdoor Pool",
      "Mountain View Restaurant",
      "Ski Equipment Rental",
      "Fireside Lounge",
      "Hiking Trail Access",
      "Pet-Friendly Rooms",
      "Outdoor Fire Pits",
    ],
  },
  4: {
    id: 4,
    name: "Downtown Boutique Hotel",
    location: "San Francisco, CA",
    rating: 4.7,
    reviews: 312,
    price: 220,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    amenities: ["Free WiFi", "Restaurant", "Gym"],
    description: "Modern boutique hotel in the vibrant downtown area, perfect for urban explorers.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    ],
    fullDescription:
      "Discover San Francisco from our stylish Downtown Boutique Hotel. Located in the heart of the city, you'll be steps away from iconic attractions, world-class dining, and vibrant nightlife. Our modern rooms blend contemporary design with comfort, featuring curated local art and premium amenities.",
    facilities: [
      "Prime Downtown Location",
      "Modern Fitness Center",
      "Farm-to-Table Restaurant",
      "Rooftop Terrace",
      "Business Facilities",
      "Daily Coffee Service",
    ],
  },
  5: {
    id: 5,
    name: "Lakeside Inn",
    location: "Lake Tahoe, NV",
    rating: 4.5,
    reviews: 98,
    price: 175,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    amenities: ["Free WiFi", "Parking", "Beach Access"],
    description: "Charming lakeside property with water sports, fishing, and serene natural beauty.",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    ],
    fullDescription:
      "Relax by the pristine waters of Lake Tahoe at our cozy Lakeside Inn. Perfect for nature lovers, our property offers direct lake access, kayaking, paddle boarding, and fishing. Unwind on your private deck overlooking the crystal-clear waters.",
    facilities: ["Lake Access", "Water Sports Equipment", "Fishing Dock", "Outdoor Seating", "BBQ Area"],
  },
  6: {
    id: 6,
    name: "Historic Manor",
    location: "Charleston, SC",
    rating: 4.8,
    reviews: 201,
    price: 340,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    amenities: ["Free WiFi", "Spa", "Restaurant", "Parking"],
    description: "Elegant historic mansion transformed into a luxury hotel with southern charm and hospitality.",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    ],
    fullDescription:
      "Step back in time at our Historic Manor in Charleston. This beautifully restored 19th-century mansion combines period charm with modern luxury. Enjoy southern hospitality, fine dining, and gracious accommodations in the heart of Charleston's historic district.",
    facilities: ["Historic Architecture", "Fine Dining", "Garden Terrace", "Full-Service Spa", "Valet Service"],
  },
};
interface HotelDetailsProps {
  hotel?: Hotel;
  onBack: () => void;
  onBookNow?: (room: RoomType, plan: RoomPlan) => void;
  reviews?: Review[];
  onAddReview?: (review: Omit<Review, "id" | "createdAt" | "helpful">) => void;
  userBookings?: Booking[];
  currentUserId?: string;
}

const categoryLabels: Record<string, string> = {
  basicFacilities: "Basic Facilities",
  generalServices: "General Services",
  healthAndWellness: "Health and Wellness",
  transfers: "Transfers",
  roomAmenities: "Room Amenities",
  foodAndDrinks: "Food and Drinks",
  safetyAndSecurity: "Safety and Security",
  entertainment: "Entertainment",
  commonArea: "Common Area",
  businessCenter: "Business Center and Conferences",
  otherFacilities: "Other Facilities",
};

const HotelDetails = ({ 
  onBack, 
  onBookNow,
  reviews = [],
  onAddReview,
  userBookings = [],
  currentUserId,
}: HotelDetailsProps) => {
  const { id } = useParams();
  const {state} = useLocation()
  console.log(state,'state')
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const hotel = mockHotelsDetailed[parseInt(id || "1")];
  const hotelReviews = mockReviews[parseInt(id || "1")] || [];

  const hasAmenities = Object.values(hotel.amenities).some((arr) => arr.length > 0);
  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel not found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background ">
      {/* Header */}

      {/* Photo Gallery */}
      <div className="container mx-auto px-4 py-6 mt-14">
        <PhotoGallery images={hotel.images} hotelName={hotel.name} />
       {/* Hotel Header */}
      <Card className="overflow-hidden my-4">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">{hotel?.name}</h1>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {hotel?.location && `${hotel?.location}, `}
                  {hotel?.location?.city}
                  {hotel?.location?.state && `, ${hotel?.location?.state}`}
                  {hotel?.location?.pincode && ` - ${hotel?.location?.pincode}`}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {hotel?.category}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {hotel?.roomTypes?.length} Room Types
              </Badge>
            </div>
          </div>
          {hotel?.description && (
            <p className="mt-4 text-muted-foreground">{hotel?.fullDescription}</p>
          )}
        </div>
      </Card>
      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-lg">
          <TabsTrigger value="rooms" className="flex items-center gap-2">
            <Bed className="h-4 w-4" /> Rooms
          </TabsTrigger>
          <TabsTrigger value="amenities" className="flex items-center gap-2">
            <Star className="h-4 w-4" /> Amenities
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Reviews ({hotelReviews.length})
          </TabsTrigger>
        </TabsList>
       <TabsContent value="rooms" className="mt-6 space-y-6">
          {hotel?.roomTypes && hotel?.roomTypes?.map((room) => (
            <Card key={room?.id} className="overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Room Info Left Side */}
                <div className="lg:w-1/3 p-4 border-r border-border">
                  <div className="bg-muted rounded-lg h-40 flex items-center justify-center mb-4">
                    <Bed className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{room?.name || "Room Type"}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4" />
                      <span>{room?.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{room?.view}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4" />
                      <span>{room?.bedCount} {room?.bedType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4" />
                      <span>{room?.bathrooms} Bathroom</span>
                    </div>
                  </div>
                  {room?.amenities?.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-wrap gap-1">
                        {room?.amenities && room?.amenities?.slice(0, 6)?.map((amenity) => (
                          <span key={amenity} className="text-xs text-muted-foreground">
                            • {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing Plans Right Side */}
                <div className="lg:w-2/3 p-4">
                  {room?.plans?.length > 0 ? (
                    <div className="space-y-4">
                      {room?.plans && room?.plans?.map((plan) => (
                        <div
                          key={plan?.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-primary">{plan?.name}</h4>
                            <ul className="mt-2 space-y-1">
                              {plan?.features && plan?.features?.map((feature, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                                  <span className="text-muted-foreground">•</span> {feature}
                                </li>
                              ))}
                              {plan?.freeCancellation && (
                                <li className="text-sm text-green-600 flex items-center gap-1">
                                  <Check className="h-3 w-3" /> Free Cancellation till check-in
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="mt-4 md:mt-0 md:text-right">
                            <div className="text-sm text-muted-foreground line-through">
                              ₹{plan?.originalPrice.toLocaleString()}
                            </div>
                            <div className="text-2xl font-bold">
                              ₹{plan?.discountedPrice.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              +₹{plan?.taxesAndFees} Taxes & Fees per night
                            </div>
                            <Button 
                              className="mt-2 bg-teal-600 hover:bg-teal-700"
                              onClick={() => onBookNow?.(room, plan)}
                            >
                              BOOK NOW
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No pricing plans added
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="amenities" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              {hasAmenities ? (
                <div className="space-y-6">
                  {Object.entries(hotel.amenities).map(([category, items]) => {
                    if (items.length === 0) return null;
                    return (
                      <div key={category}>
                        <h3 className="font-semibold text-foreground border-b pb-2 mb-3">
                          {categoryLabels[category]}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {/* {items && items?.map((item) => (
                            <div key={item} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-600" />
                              <span>{item}</span>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No amenities selected
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          {'onAddReview' ? (
            // <ReviewsRatings
            //   hotel={hotel}
            //   reviews={reviews}
            //   onAddReview={onAddReview}
            //   userBookings={userBookings}
            //   currentUserId={currentUserId}
            // />
            <></>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Reviews not available
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      </div>
      {/* Hotel Information */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Guest Reviews</h2>
              <ReviewsSection reviews={hotelReviews} overallRating={hotel.rating} />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Book Your Stay at {hotel.name}</DialogTitle>
          </DialogHeader>
          <BookingForm hotel={hotel} onClose={() => setShowBookingForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelDetails;
