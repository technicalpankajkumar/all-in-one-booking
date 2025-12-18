import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, Fuel, Users, Briefcase, CheckCircle, XCircle, 
  Clock, Moon, IndianRupee, MapPin, Timer, User, Star, 
  Phone, CreditCard, Languages, CalendarDays, Shield, 
  Building2, AlertCircle, Percent, Navigation, Sparkles,
  ChevronLeft, ChevronRight, ZoomIn, Award, TrendingUp,
} from "lucide-react";
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;

interface CabImage {
  id: number;
  src: string;
}

interface CabFeature {
  id: number;
  name: string;
}

interface FareRules {
  baseFare: number;
  pricePerKm: number;
  pricePerMinute: number;
  waitingChargePerMinute: number;
  lateCompensationPerMinute: number;
  minimumFare: number;
  nightMultiplier: number;
  nightStart: string;
  nightEnd: string;
}

interface DriverProfile {
  father_name?: string;
  alternate_mobile?: string;
  dob?: string;
  gender?: string;
  experience_years?: number;
  current_address?: string;
  city?: string;
  state?: string;
  language?: string[];
}

interface DriverDetails {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  profile_image?: string;
  aadhar_number?: string;
  pan_number?: string;
  driving_license_number?: string;
  driving_license_expiry?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
  bank_name?: string;
  account_holder_name?: string;
  upi_id?: string;
  availability_status?: string;
  preferred_city?: string;
  preferred_service_area?: number;
  rating?: number;
  total_rides?: number;
  cancellation_rate?: number;
  emergency_contact_name?: string;
  emergency_contact_number?: string;
  emergency_contact_relation?: string;
  profile?: DriverProfile;
}

interface CabDetails {
  name: string;
  type: string;
  fuelType: string;
  seatCapacity: number;
  bagCapacity: number;
  description: string;
  isAvailable: boolean;
  features: CabFeature[];
  fareRules: FareRules;
  images: CabImage[];
  driver?: DriverDetails;
}

interface ViewCabModalProps {
  isOpen: boolean;
  onClose: () => void;
  cab: CabDetails;
}

const ViewCabModal = ({ isOpen, onClose, cab }: ViewCabModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const selectedImage = cab?.images?.[selectedImageIndex];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % cab?.images?.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + cab?.images.length) % cab?.images.length);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[96vh] p-1 bg-gradient-to-br from-background via-background to-muted/20 border-border/50 shadow-2xl">
          {/* Hero Section with Image */}
          <div className="relative ">
            {/* Main Image with Gradient Overlay */}
            <div 
              className="relative w-full h-72 md:h-96 overflow-hidden cursor-pointer group"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img
                src={API_URL + selectedImage?.image_url}
                alt={cab?.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
              
              {/* View Full Image Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-background/90  text-foreground px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-xl border border-border/50 animate-scale-in">
                  <ZoomIn className="w-5 h-5" />
                  View Full Image
                </div>
              </div>

              {/* Navigation Arrows */}
              {cab?.images?.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80  rounded-full flex items-center justify-center text-foreground hover:bg-background transition-all duration-200 shadow-lg border border-border/50 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80  rounded-full flex items-center justify-center text-foreground hover:bg-background transition-all duration-200 shadow-lg border border-border/50 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-background/80  px-3 py-1 rounded-full text-xs font-medium text-foreground border border-border/50">
                {selectedImageIndex + 1} / {cab?.images?.length}
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <Badge 
                  variant={cab?.is_available ? "default" : "destructive"}
                  className={`px-4 py-2 text-sm font-semibold shadow-lg ${cab?.is_available ? "bg-green-500 hover:bg-green-600" : ""}`}
                >
                  {cab?.is_available ? (
                    <><CheckCircle className="w-4 h-4 mr-2" /> Available</>
                  ) : (
                    <><XCircle className="w-4 h-4 mr-2" /> Unavailable</>
                  )}
                </Badge>
              </div>
            </div>

            {/* Vehicle Title Overlay */}
            <div className="absolute bottom-1 left-0 right-0 p-6 pb-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary border-primary/30 cursor-pointer">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {cab?.car_type}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground drop-shadow-lg">
                    {cab?.car_name}
                  </h2>
                </div>
                <div className="flex items-center gap-3 bg-background/80  rounded-xl px-4 py-2 border border-border/50">
                  <div className="text-center">
                    <Users className="w-4 h-4 mx-auto text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Seats</span>
                    <p className="font-medium text-foreground">{cab?.seat_capacity}</p>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="text-center">
                    <Briefcase className="w-4 h-4 mx-auto text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Bags</span>
                    <p className="font-medium text-foreground">{cab?.bag_capacity}</p>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="text-center">
                    <Fuel className="w-4 h-4 mx-auto text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Fuel</span>
                    <p className="font-medium text-foreground text-sm">{cab?.fuel_type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Images */}
          {cab?.images?.length > 1 && (
            <div className="px-6 relative z-10">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin p-2">
                {cab?.images?.map((image, index) => (
                  <button
                    key={image?.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-lg" 
                        : "opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={API_URL + image?.image_url}
                      alt={`${cab?.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-primary/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content Section with Tabs */}
          <div className="p-6 pt-4 max-h-[48vh] overflow-y-auto">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-xl mb-6">
                <TabsTrigger value="details" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Car className="w-4 h-4 mr-2" /> Vehicle
                </TabsTrigger>
                <TabsTrigger value="fare" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <IndianRupee className="w-4 h-4 mr-2" /> Fare Rules
                </TabsTrigger>
                {cab?.driver && (
                  <TabsTrigger value="driver" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <User className="w-4 h-4 mr-2" /> Driver
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Vehicle Details Tab */}
              <TabsContent value="details" className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Description Card */}
                  <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Car className="w-4 h-4 text-primary" />
                      </div>
                      About This Vehicle
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{cab?.description}</p>
                  </div>

                  {/* Features Card */}
                  <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      Features & Amenities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cab?.features?.map((feature, index) => (
                        <Badge 
                          key={feature.id} 
                          variant="outline" 
                          className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 px-3 py-1.5 animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <CheckCircle className="w-3 h-3 mr-1.5" />
                          {feature?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Fare Rules Tab */}
              <TabsContent value="fare" className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Standard Fare */}
                  <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl py-3 px-4 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <IndianRupee className="w-4 h-4 text-green-500" />
                      </div>
                      Standard Fare
                    </h3>
                    <div className="space-y-1">
                      {[
                        { label: "Base Fare", value: cab?.fare_rules?.base_fare || 0, icon: IndianRupee },
                        { label: "Price Per KM", value: cab?.fare_rules?.price_per_km || 0, icon: MapPin },
                        { label: "Price Per Minute", value: cab?.fare_rules?.price_per_min || 0, icon: Timer },
                        { label: "Waiting Charge/Min", value: cab?.fare_rules?.waiting_charge_per_minute || 0, icon: Clock },
                        { label: "Late Compensation/Min", value: cab?.fare_rules?.late_compensation_per_minute || 0, icon: TrendingUp },
                        { label: "Minimum Fare", value: cab?.fare_rules?.minimum_fare || 0, icon: Award },
                      ].map((item, index) => (
                        <div 
                          key={item.label}
                          className="flex justify-between items-center px-3 rounded-lg bg-background/50 hover:bg-background transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-muted-foreground text-sm flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </span>
                          <span className="font-medium text-foreground text-md">₹ {Number.parseFloat(item.value)?.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Night Charges */}
                  <div className="bg-gradient-to-br from-indigo-500/30 via-primary/20 to-pink-500/10 border border-indigo-500/20 rounded-2xl p-5 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/50 flex items-center justify-center">
                        <Moon className="w-4 h-4 text-indigo-950" />
                      </div>
                      Night Charges
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center py-6 bg-background/20 rounded-xl">
                        <div className="text-5xl font-bold bg-gradient-to-r from-indigo-900 to-purple-700 bg-clip-text text-transparent">
                          {cab?.fare_rules?.night_multiplier}x
                        </div>
                        <p className="text-muted-foreground mt-2 font-medium">Multiplier Applied</p>
                      </div>
                      <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-background/20">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Night Hours
                        </span>
                        <span className="font-semibold text-foreground bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-3 py-1 rounded-full">
                          {cab?.fare_rules?.night_start} - {cab?.fare_rules?.night_end}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Driver Tab */}
              {cab?.driver && (
                <TabsContent value="driver" className="animate-fade-in">
                  {/* Driver Hero Card */}
                  <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20 rounded-2xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                          <AvatarImage src={cab?.driver?.profile_image} alt={cab?.driver?.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-2xl font-bold">
                            {cab?.driver.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background ${cab?.driver?.availability_status === "online" ? "bg-green-500" : "bg-muted"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className="text-2xl font-bold text-foreground">{cab?.driver.name}</h4>
                          <Badge 
                            variant="outline"
                            className={`${cab?.driver?.availability_status === "online" ? "bg-green-500/10 text-green-600 border-green-500/30" : "bg-muted"}`}
                          >
                            {cab?.driver?.availability_status === "online" ? "● Online" : "● Offline"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          {cab?.driver?.email && <span className="flex items-center gap-1">📧 {cab?.driver?.email}</span>}
                          {cab?.driver?.mobile && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" /> {cab?.driver?.mobile}
                            </span>
                          )}
                        </div>
                        {/* Stats */}
                        <div className="flex flex-wrap gap-4">
                          <div className="bg-background/80  rounded-xl px-4 py-2 border border-border/50">
                            <div className="flex items-center gap-1.5">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="text-xl font-bold">{cab?.driver?.rating?.toFixed(1) || "5.0"}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Rating</p>
                          </div>
                          <div className="bg-background/80  rounded-xl px-4 py-2 border border-border/50">
                            <div className="text-xl font-bold text-primary">{cab?.driver?.total_rides || 0}</div>
                            <p className="text-xs text-muted-foreground">Total Rides</p>
                          </div>
                          <div className="bg-background/80  rounded-xl px-4 py-2 border border-border/50">
                            <div className="text-xl font-bold text-green-500">{((1 - (cab?.driver?.cancellation_rate || 0)) * 100).toFixed(0)}%</div>
                            <p className="text-xs text-muted-foreground">Completion</p>
                          </div>
                          {cab?.driver?.profile?.experience_years !== undefined && (
                            <div className="bg-background/80  rounded-xl px-4 py-2 border border-border/50">
                              <div className="text-xl font-bold">{cab?.driver?.profile.experience_years}</div>
                              <p className="text-xs text-muted-foreground">Years Exp.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver Details Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Profile Info */}
                    <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-500" />
                        </div>
                        Personal Info
                      </h4>
                      <div className="space-y-3">
                        {cab?.driver?.profile?.father_name && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">Father's Name</span>
                            <span className="font-medium text-foreground">{cab?.driver?.profile.father_name}</span>
                          </div>
                        )}
                        {cab?.driver?.profile?.gender && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">Gender</span>
                            <span className="font-medium text-foreground">{cab?.driver?.profile.gender}</span>
                          </div>
                        )}
                        {cab?.driver?.profile?.dob && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">DOB</span>
                            <span className="font-medium text-foreground">{cab?.driver?.profile.dob}</span>
                          </div>
                        )}
                        {cab?.driver?.profile?.language && cab?.driver?.profile.language.length > 0 && (
                          <div className="pt-2">
                            <span className="text-muted-foreground text-sm flex items-center gap-1 mb-2">
                              <Languages className="w-4 h-4" /> Languages
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {cab?.driver?.profile?.language?.map((lang, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{lang}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-amber-500" />
                        </div>
                        Documents
                      </h4>
                      <div className="space-y-3">
                        {cab?.driver?.aadhar_number && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">Aadhar</span>
                            <span className="font-mono font-medium text-foreground">
                              ●●●● {cab?.driver?.aadhar_number?.slice(-4)}
                            </span>
                          </div>
                        )}
                        {cab?.driver?.pan_number && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">PAN</span>
                            <span className="font-mono font-medium text-foreground">
                              {cab?.driver?.pan_number?.slice(0, 2)}●●●●{cab?.driver?.pan_number?.slice(-2)}
                            </span>
                          </div>
                        )}
                        {cab?.driver?.driving_license_number && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">License</span>
                            <span className="font-mono font-medium text-foreground text-xs">
                              {cab?.driver?.driving_license_number}
                            </span>
                          </div>
                        )}
                        {cab?.driver?.driving_license_expiry && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm flex items-center gap-1">
                              <CalendarDays className="w-3 h-3" /> Expiry
                            </span>
                            <span className="font-medium text-foreground">{cab?.driver?.driving_license_expiry}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-green-500" />
                        </div>
                        Bank Details
                      </h4>
                      <div className="space-y-3">
                        {cab?.driver?.bank_name && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">Bank</span>
                            <span className="font-medium text-foreground">{cab?.driver?.bank_name}</span>
                          </div>
                        )}
                        {cab?.driver?.account_holder_name && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">Holder</span>
                            <span className="font-medium text-foreground">{cab?.driver?.account_holder_name}</span>
                          </div>
                        )}
                        {cab?.driver?.bank_account_number && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">Account</span>
                            <span className="font-mono font-medium text-foreground">
                              ●●●● {cab?.driver?.bank_account_number?.slice(-4)}
                            </span>
                          </div>
                        )}
                        {cab?.driver?.bank_ifsc && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">IFSC</span>
                            <span className="font-mono font-medium text-foreground">{cab?.driver?.bank_ifsc}</span>
                          </div>
                        )}
                        {cab?.driver?.upi_id && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm flex items-center gap-1">
                              <CreditCard className="w-3 h-3" /> UPI
                            </span>
                            <span className="font-medium text-foreground text-xs">{cab?.driver?.upi_id}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Location Preferences */}
                    <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Navigation className="w-4 h-4 text-purple-500" />
                        </div>
                        Preferences
                      </h4>
                      <div className="space-y-3">
                        {cab?.driver?.preferred_city && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">Preferred City</span>
                            <span className="font-medium text-foreground">{cab?.driver?.preferred_city}</span>
                          </div>
                        )}
                        {cab?.driver?.preferred_service_area && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">Service Area</span>
                            <span className="font-medium text-foreground">{cab?.driver?.preferred_service_area} km radius</span>
                          </div>
                        )}
                        {cab?.driver?.profile?.city && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">City</span>
                            <span className="font-medium text-foreground">{cab?.driver?.profile.city}</span>
                          </div>
                        )}
                        {cab?.driver?.profile?.state && (
                          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground text-sm">State</span>
                            <span className="font-medium text-foreground">{cab?.driver?.profile.state}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    {(cab?.driver?.emergency_contact_name || cab?.driver?.emergency_contact_number) && (
                      <div className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          </div>
                          Emergency Contact
                        </h4>
                        <div className="space-y-3">
                          {cab?.driver?.emergency_contact_name && (
                            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                              <span className="text-muted-foreground text-sm">Name</span>
                              <span className="font-medium text-foreground">{cab?.driver?.emergency_contact_name}</span>
                            </div>
                          )}
                          {cab?.driver?.emergency_contact_number && (
                            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                              <span className="text-muted-foreground text-sm">Phone</span>
                              <span className="font-medium text-foreground">{cab?.driver?.emergency_contact_number}</span>
                            </div>
                          )}
                          {cab?.driver?.emergency_contact_relation && (
                            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                              <span className="text-muted-foreground text-sm">Relation</span>
                              <Badge variant="secondary">{cab?.driver?.emergency_contact_relation}</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Address */}
                    {cab?.driver?.profile?.current_address && (
                      <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-cyan-500" />
                          </div>
                          Current Address
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed bg-background/50 p-3 rounded-lg">
                          {cab?.driver?.profile?.current_address}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Image Viewer Modal */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className=" p-2 bg-background/95 backdrop-blur-xl border-border/50">
          <div className="relative">
            <img
              src={API_URL + selectedImage?.image_url}
              alt={cab?.name}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
            {/* Thumbnail Navigation */}
            {cab?.images?.length > 1 && (
              <div className="flex justify-center gap-3 mt-4">
                {cab?.images?.map((image, index) => (
                  <button
                    key={image?.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? "ring-2 ring-primary scale-110" 
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={API_URL + image?.image_url}
                      alt={`${cab?.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewCabModal;