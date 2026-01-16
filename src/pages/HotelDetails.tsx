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
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking, Hotel, RoomPlan, RoomType } from "@/data/types";
import { ReviewRatings } from "@/components/ReviewRatings";

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
const mockReviews: Record<number | string, Review[]> = {
  'demo-1': [
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
  'demo-2': [
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
  'demo-3': [
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
  'demo-4': [
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
  'demo-5': [
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
  'demo-6': [
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
  userBookings = [],
  currentUserId,
}: HotelDetailsProps) => {
  const { id } = useParams();
  const {state} = useLocation()
  console.log(state,'state')
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [reviews,setReviews] = useState(mockReviews[id] || [])
  const hotel = state;
  const hotelReviews = mockReviews[id] || [];

  const hasAmenities = Object.values(hotel?.amenities).some((arr) => arr?.length > 0);
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

  const addReview = (review: Omit<Review, "id" | "createdAt" | "helpful">) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: String(new Date()),
      helpful: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
  };
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
                  {hotel?.location?.address && `${hotel?.location?.address}, `}
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
            <Card key={room?.id} className="overflow-hidden shadow-lg">
              <div className="flex flex-col lg:flex-row">
                {/* Room Info Left Side */}
                <div className="lg:w-1/3 p-4 border-r border-border">
                  <div className="bg-muted rounded-lg h-40 flex items-center justify-center mb-4 shadow-sm">
                    <img src="https://images.pexels.com/photos/5371573/pexels-photo-5371573.jpeg"  
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 shadow-sm rounded-md"/>
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
                          className="flex flex-col shadow-md md:flex-row md:items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors"
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
                             size="sm"
                             className="mt-4"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Guest Reviews For Hotel</h2>
              <ReviewsSection reviews={hotelReviews} overallRating={hotel.rating} />
            </div>
          </div>
        </div>
        </TabsContent>

        <TabsContent value="amenities" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              {hasAmenities ? (
                <div className="space-y-6">
                  {Object.entries(hotel.amenities).map(([category, items]) => {
                    if (items?.length === 0) return null;
                    return (
                      <div key={category}>
                        <h3 className="font-semibold text-foreground border-b pb-2 mb-3">
                          {categoryLabels[category]}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {items && items?.map((item) => (
                            <div key={item} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-600" />
                              <span>{item}</span>
                            </div>
                          ))}
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
          {addReview ? (
            <ReviewRatings
              hotel={hotel}
              reviews={reviews}
              onAddReview={addReview}
              userBookings={userBookings}
              currentUserId={currentUserId}
            />
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
