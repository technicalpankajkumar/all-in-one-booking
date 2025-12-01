import { ViewMode } from "../data/types";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Table2 } from "lucide-react";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  resultCount: number;
}

const ViewToggle = ({ viewMode, onViewModeChange, resultCount }: ViewToggleProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Tour Packages</h2>
        <p className="text-muted-foreground">{resultCount} packages found</p>
      </div>
      
      <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("grid")}
          className={viewMode === "grid" ? "" : "text-muted-foreground"}
        >
          <LayoutGrid className="h-4 w-4 mr-2" />
          Grid
        </Button>
        <Button
          variant={viewMode === "table" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("table")}
          className={viewMode === "table" ? "" : "text-muted-foreground"}
        >
          <Table2 className="h-4 w-4 mr-2" />
          Table
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;
