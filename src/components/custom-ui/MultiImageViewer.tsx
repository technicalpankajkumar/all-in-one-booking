import { useState } from "react";
import { Trash2, Eye, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ThumbnailImage {
  id: number | string;
  car_id: string;
  image_url?: string;
  is_main: boolean
}

interface MultiImageViewerProps {
  images: ThumbnailImage[];
  onDelete?: (id: number) => void;
  onView?: (image: ThumbnailImage) => void;
}
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;

const MultiImageViewer = ({ images, onDelete, onView }: MultiImageViewerProps) => {
  const [selectedImage, setSelectedImage] = useState<ThumbnailImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (image: ThumbnailImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    onView?.(image);
  };

  const handleDelete = (id: number) => {
    onDelete?.(id);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-2">
        {images?.map((image, index) => (
          <div
            key={image.id}
            className="group relative w-24 h-24 rounded-lg overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Number Badge */}
            <div className="absolute top-1 left-1 z-10 w-5 h-5 bg-primary text-primary-foreground rounded text-xs font-bold flex items-center justify-center shadow">
              {index + 1}
            </div>

            {/* Image */}
            <img
              src={API_URL + image.image_url}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => handleView(image)}
                className="p-1.5 rounded bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                title="View"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => handleDelete(image.id)}
                  className="p-1.5 rounded bg-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Full Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl p-2 bg-background">
          {selectedImage && (
            <div className="relative">
              <img
                src={API_URL + selectedImage.image_url}
                alt={"Full view"}
                className="w-full h-auto max-h-[75vh] object-contain rounded"
              />
              {selectedImage?.title && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {selectedImage?.title}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultiImageViewer;
