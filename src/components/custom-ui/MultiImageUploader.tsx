import * as React from "react";
import { X, Plus, Image as ImageIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";


export interface ImageFile {
  id: string;
  file?: File;
  preview: string;
  name: string;
}

interface MultiImageUploaderProps {
  images: ImageFile[];
  onChange: (images: ImageFile[]) => void;
  maxImages?: number;
  maxSizeInMB?: number;
  acceptedTypes?: string[];
  className?: string;
  disabled?: boolean;
  label?: string;
  description?: string;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

const MultiImageUploader = React.forwardRef<HTMLDivElement, MultiImageUploaderProps>(
  (
    {
      images,
      onChange,
      maxImages = 10,
      maxSizeInMB = 5,
      acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
      className,
      disabled = false,
      label = "Upload Images",
      description,
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = React.useState(false);

    const remainingSlots = maxImages - images.length;
    const canAddMore = remainingSlots > 0 && !disabled;

    const handleFileSelect = (files: FileList | null) => {
      if (!files || !canAddMore) return;

      const newImages: ImageFile[] = [];
      const filesToProcess = Math.min(files.length, remainingSlots);

      for (let i = 0; i < filesToProcess; i++) {
        const file = files[i];

        if (!acceptedTypes.includes(file.type)) {
          console.warn(`File ${file.name} is not an accepted type`);
          continue;
        }

        if (file.size > maxSizeInMB * 1024 * 1024) {
          console.warn(`File ${file.name} exceeds ${maxSizeInMB}MB limit`);
          continue;
        }

        newImages.push({
          id: generateId(),
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
        });
      }

      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
      }
    };

    const handleDelete = (id: string) => {
      const imageToDelete = images.find((img) => img.id === id);
      if (imageToDelete?.preview.startsWith("blob:")) {
        URL.revokeObjectURL(imageToDelete.preview);
      }
      onChange(images.filter((img) => img.id !== id));
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (canAddMore) setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (canAddMore) {
        handleFileSelect(e.dataTransfer.files);
      }
    };

    const handleClick = () => {
      if (canAddMore) {
        inputRef.current?.click();
      }
    };

    React.useEffect(() => {
      return () => {
        images.forEach((img) => {
          if (img.preview.startsWith("blob:")) {
            URL.revokeObjectURL(img.preview);
          }
        });
      };
    }, []);

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground">{label}</h4>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              {images.length} / {maxImages}
            </span>
          </div>
        </div>

        {/* Preview Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted/30 shadow-sm"
              >
                <img
                  src={image.preview}
                  alt={image.name}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />
                
                {/* Index Badge */}
                <span className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-background/80 text-foreground backdrop-blur-sm">
                  {index + 1}
                </span>

                {/* Delete Button */}
                {!disabled && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                    onClick={() => handleDelete(image.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}

                {/* File Name */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-[10px] text-white truncate">{image.name}</p>
                </div>
              </div>
            ))}

            {/* Add More Button (inline) */}
            {canAddMore && (
              <button
                type="button"
                onClick={handleClick}
                className="aspect-square rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="h-6 w-6 text-primary/60" />
                <span className="text-[10px] font-medium text-primary/60">Add More</span>
              </button>
            )}
          </div>
        )}

        {/* Drop Zone (when no images or as main upload area) */}
        {images.length === 0 && (
          <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer",
              dragOver
                ? "border-primary bg-primary/10 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:bg-muted/30",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Drop images here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max {maxImages} images, up to {maxSizeInMB}MB each
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ImageIcon className="h-3 w-3" />
                <span>JPG, PNG, WebP, GIF</span>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        {/* Action Bar (when images exist) */}
        {images.length > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {remainingSlots > 0
                ? `${remainingSlots} more ${remainingSlots === 1 ? "slot" : "slots"} available`
                : "Maximum images reached"}
            </p>
            {images.length > 0 && !disabled && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 text-xs"
                onClick={() => {
                  images.forEach((img) => {
                    if (img.preview.startsWith("blob:")) {
                      URL.revokeObjectURL(img.preview);
                    }
                  });
                  onChange([]);
                }}
              >
                Clear All
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

MultiImageUploader.displayName = "MultiImageUploader";

export { MultiImageUploader };
