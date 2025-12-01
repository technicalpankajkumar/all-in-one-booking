import { useState, useMemo } from "react";
import { ReviewCard, Review } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Star, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ReviewsSectionProps {
  reviews: Review[];
  overallRating: number;
}

type SortOption = "recent" | "highest" | "lowest" | "helpful";

export const ReviewsSection = ({ reviews, overallRating }: ReviewsSectionProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Calculate rating distribution
  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const rating = Math.floor(review.rating);
      dist[rating as keyof typeof dist]++;
    });
    return dist;
  }, [reviews]);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...reviews];

    // Filter by rating
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((review) => selectedRatings.includes(Math.floor(review.rating)));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "helpful":
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    return filtered;
  }, [reviews, sortBy, selectedRatings]);

  const handleRatingFilter = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const totalReviews = reviews.length;

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overall Score */}
          <div className="flex flex-col items-center justify-center md:border-r md:border-border md:pr-8">
            <div className="text-6xl font-bold text-primary mb-2">{overallRating.toFixed(1)}</div>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(overallRating) ? "fill-star text-star" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">{totalReviews} reviews</div>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-3 w-3 fill-star text-star" />
                  </div>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedRatings.length > 0 && (
              <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                {selectedRatings.length}
              </span>
            )}
          </Button>
          {selectedRatings.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedRatings([])}>
              Clear filters
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rating Filters */}
      {showFilters && (
        <div className="bg-muted/30 rounded-lg p-4 animate-fade-in">
          <h4 className="font-semibold mb-3">Filter by Rating</h4>
          <div className="flex flex-wrap gap-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <Checkbox
                  id={`filter-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => handleRatingFilter(rating)}
                />
                <Label htmlFor={`filter-${rating}`} className="flex items-center gap-1 cursor-pointer">
                  <span>{rating}</span>
                  <Star className="h-3 w-3 fill-star text-star" />
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Count */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {filteredAndSortedReviews.length} {filteredAndSortedReviews.length === 1 ? "Review" : "Reviews"}
        </h3>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.length > 0 ? (
          filteredAndSortedReviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No reviews match your selected filters.</p>
            <Button variant="link" onClick={() => setSelectedRatings([])}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
