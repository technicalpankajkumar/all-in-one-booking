
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LabResult } from "@/data/types";
import { cn } from "@/lib/utils";

type LabResultTableProps = {
  results: LabResult[];
};

export function LabResultTable({ results }: LabResultTableProps) {
  const getInterpretationStyle = (interpretation: string) => {
    switch (interpretation) {
      case "normal":
        return "text-medical-green";
      case "high":
        return "text-medical-orange";
      case "low":
        return "text-medical-blue";
      case "critical":
        return "text-medical-red";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parameter</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Normal Range</TableHead>
            <TableHead>Interpretation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{result.parameter}</TableCell>
              <TableCell>{result.value}</TableCell>
              <TableCell>{result.unit}</TableCell>
              <TableCell>{result.normalRange}</TableCell>
              <TableCell>
                <span className={cn("font-medium", getInterpretationStyle(result.interpretation))}>
                  {result.interpretation === "normal" ? "Normal" : 
                   result.interpretation === "high" ? "High" : 
                   result.interpretation === "low" ? "Low" : 
                   result.interpretation === "critical" ? "Critical" : 
                   "N/A"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
