import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showPageInfo?: boolean;
  showJumpToPage?: boolean;
  showFirstLastButtons?: boolean;
  siblingCount?: number;
  className?: string;
}

const CustomPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSizeSelector = true,
  showPageInfo = true,
  showJumpToPage = true,
  showFirstLastButtons = true,
  siblingCount = 1,
  className,
}: CustomPaginationProps) => {
  const [jumpValue, setJumpValue] = React.useState("");

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const generatePaginationRange = () => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "dots", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
    }

    return range(1, totalPages);
  };

  const paginationRange = generatePaginationRange();

  const handleJumpToPage = () => {
    const page = parseInt(jumpValue, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpValue("");
    }
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      {/* Left side - Page info and size selector */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        {showPageInfo && (
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{startItem}</span> to{" "}
            <span className="font-medium text-foreground">{endItem}</span> of{" "}
            <span className="font-medium text-foreground">{totalItems}</span> results
          </p>
        )}

        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Right side - Pagination controls */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        {/* Jump to page */}
        {showJumpToPage && totalPages > 5 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Go to:</span>
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJumpToPage()}
              className="h-8 w-16 text-center"
              placeholder="#"
            />
            <Button variant="outline" size="sm" onClick={handleJumpToPage} className="h-8">
              Go
            </Button>
          </div>
        )}

        {/* Page buttons */}
        <nav className="flex items-center gap-1" aria-label="Pagination">
          {/* First page button */}
          {showFirstLastButtons && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 hidden sm:flex"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Previous button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </Button>

          {/* Page numbers */}
          <div className="hidden sm:flex items-center gap-1">
            {paginationRange.map((page, index) => {
              if (page === "dots") {
                return (
                  <span key={`dots-${index}`} className="flex h-8 w-8 items-center justify-center text-muted-foreground">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onPageChange(page as number)}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          {/* Mobile page indicator */}
          <span className="flex sm:hidden items-center px-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{currentPage}</span>
            <span className="mx-1">/</span>
            <span>{totalPages}</span>
          </span>

          {/* Next button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page button */}
          {showFirstLastButtons && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 hidden sm:flex"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          )}
        </nav>
      </div>
    </div>
  );
};

export { CustomPagination };
