import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, Phone, Mail, MapPin, Star, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileData {
  full_name?: string;
  availability_status?: string;
  rating?: number;
  total_rides?: number;
  cancellation_rate?: number;
  auth?: {
    mobile?: string;
    email?: string;
    profile?: {
      city?: string;
      state?: string;
      experience_years?: number;
    };
  };
}

interface ProfileBannerCardProps {
  data?: { driver?: ProfileData };
  profileImage?: string;
  bannerImage?: string;
  onProfileImageChange?: (file: File) => void;
  onBannerImageChange?: (file: File) => void;
  editable?: boolean;
}

const getStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "online":
      return "bg-green-500";
    case "busy":
      return "bg-yellow-500";
    case "offline":
    default:
      return "bg-gray-400";
  }
};

const ProfileBannerCard: React.FC<ProfileBannerCardProps> = ({
  data,
  profileImage,
  bannerImage,
  onProfileImageChange,
  onBannerImageChange,
  editable = true,
}) => {
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [localProfileImage, setLocalProfileImage] = useState(profileImage);
  const [localBannerImage, setLocalBannerImage] = useState(bannerImage);

  useEffect(()=>{
    setLocalProfileImage(profileImage);
    setLocalBannerImage(bannerImage);
  },[profileImage,bannerImage])

  const handleProfileImageClick = () => {
    if (editable) {
      profileInputRef.current?.click();
    }
  };

  const handleBannerClick = () => {
    if (editable) {
      bannerInputRef.current?.click();
    }
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalProfileImage(url);
      onProfileImageChange?.(file);
    }
  };

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalBannerImage(url);
      onBannerImageChange?.(file);
    }
  };

  return (
    <Card className="overflow-hidden">
      {/* Banner Section */}
      <div
        className={cn(
          "relative h-32 sm:h-40 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent",
          editable && "cursor-pointer group"
        )}
        onClick={handleBannerClick}
      >
        {localBannerImage ? (
          <img
            src={localBannerImage}
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        )}
        
        {editable && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium">Change Cover</span>
            </div>
          </div>
        )}

        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleBannerFileChange}
        />
      </div>

      <CardContent className="relative px-4 sm:px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 sm:-mt-16">
          {/* Avatar with Upload */}
          <div className="relative group">
            <Avatar
              className={cn(
                "w-24 h-24 sm:w-32 sm:h-32 border-4 border-background shadow-lg",
                editable && "cursor-pointer"
              )}
              onClick={handleProfileImageClick}
            >
              <AvatarImage src={localProfileImage} />
              <AvatarFallback className="text-2xl sm:text-3xl bg-primary text-primary-foreground">
                {data?.driver?.full_name
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")}
              </AvatarFallback>
            </Avatar>

            {/* Profile upload overlay */}
            {editable && (
              <div
                className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center cursor-pointer"
                onClick={handleProfileImageClick}
              >
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Profile upload icon button */}
            {editable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProfileImageClick();
                }}
                className="absolute -bottom-1 -right-1 p-1.5 bg-primary hover:bg-primary/90 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Upload className="w-3.5 h-3.5 text-primary-foreground" />
              </button>
            )}

            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileFileChange}
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {data?.driver?.auth?.name || "Driver Name"}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                      data?.driver?.availability_status
                    )}`}
                  />
                  {data?.driver?.availability_status || "offline"}
                </Badge>
                <Badge variant="secondary">
                  <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                  {data?.driver?.rating || 5}
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {data?.driver?.auth?.mobile || "N/A"}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {data?.driver?.auth?.email || "N/A"}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {data?.driver?.auth?.profile?.city || "City"},{" "}
                {data?.driver?.auth?.profile?.state || "State"}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {data?.driver?.total_rides || 0}
              </p>
              <p className="text-xs text-muted-foreground">Total Rides</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {data?.driver?.auth?.profile?.experience_years || 0}
              </p>
              <p className="text-xs text-muted-foreground">Years Exp.</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {data?.driver?.cancellation_rate || 0}%
              </p>
              <p className="text-xs text-muted-foreground">Cancel Rate</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileBannerCard;
