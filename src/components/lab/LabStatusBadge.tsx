
import { cn } from "@/lib/utils";

type LabStatusBadgeProps = {
  status: "completed" | "pending" | "processing" | "cancelled";
  className?: string;
};

export function LabStatusBadge({ status, className }: LabStatusBadgeProps) {
  const statusLabels = {
    completed: "Completed",
    pending: "Pending",
    processing: "Processing",
    cancelled: "Cancelled"
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 text-xs font-medium rounded-full border",
        `lab-status-${status}`,
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
