import { Star, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export interface Review {
  id: number | string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  photos?: string[];
  helpful: number;
  categories: {
    cleanliness: number;
    service: number;
    facilities: number;
    location: number;
  };
  createdAt?:string;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount(helpfulCount + 1);
      setIsHelpful(true);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <>
      <div className="border border-border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={review.userAvatar} alt={review.userName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(review.userName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{review.userName}</h4>
              <p className="text-sm text-muted-foreground">{formatDate(review.date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-md">
            <Star className="h-4 w-4 fill-star text-star" />
            <span className="font-semibold">{review.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Review Title */}
        <h3 className="text-lg font-semibold mb-2">{review.title}</h3>

        {/* Review Text */}
        <p className="text-muted-foreground leading-relaxed mb-4">{review.comment}</p>

        {/* Category Ratings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Cleanliness</span>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-star text-star" />
              <span className="font-semibold">{review.categories.cleanliness}</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Service</span>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-star text-star" />
              <span className="font-semibold">{review.categories.service}</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Facilities</span>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-star text-star" />
              <span className="font-semibold">{review.categories.facilities}</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Location</span>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-star text-star" />
              <span className="font-semibold">{review.categories.location}</span>
            </div>
          </div>
        </div>

        {/* Photos */}
        {review.photos && review.photos.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {review.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhoto(photo)}
                className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden hover:opacity-80 transition-opacity group"
              >
                <img src={photo} alt={`Review photo ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}
          </div>
        )}

        {/* Helpful Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleHelpful}
            disabled={isHelpful}
            className={isHelpful ? "bg-primary/5" : ""}
          >
            <ThumbsUp className={`h-4 w-4 mr-2 ${isHelpful ? "fill-primary text-primary" : ""}`} />
            Helpful ({helpfulCount})
          </Button>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedPhoto}
              alt="Review photo full size"
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setSelectedPhoto(null)}
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
