
import { CalendarClock, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { LabStatusBadge } from "./LabStatusBadge";
import { LabTest } from "@/data/types";
import { Link } from "react-router-dom";

type LabTestCardProps = {
  labTest: LabTest;
};

export function LabTestCard({ labTest }: LabTestCardProps) {
  const { id, testName, testType, status, sampleDate, doctorName } = labTest;

  return (
    <Link to={`/dashboard/lab-tests/${id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-medical-darktext">{testName}</h3>
          <LabStatusBadge status={status} />
        </div>
        
        <div className="text-sm text-gray-500 mb-3">
          <span className="inline-block bg-gray-100 rounded px-2 py-0.5">{testType}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <CalendarClock className="h-4 w-4" />
          <span>{format(new Date(sampleDate), "MMM d, yyyy • h:mm a")}</span>
        </div>
        
        <div className="text-sm text-gray-600">
          <span className="font-medium">Doctor:</span> {doctorName}
        </div>
        
        <div className="flex justify-end mt-2">
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </Card>
    </Link>
  );
}
