
import { useState } from "react";
import { Bell, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LabTestCard } from "@/components/lab/LabTestCard";
import { labTests } from "@/data/labTests";
import { useIsMobile } from "@/hooks/use-mobile";

export function LabTests() {
  const [filter, setFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const filteredTests = labTests.filter(test => {
    const matchesFilter = filter ? test.status === filter : true;
    const matchesSearch = searchTerm 
      ? test.testName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testCode.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 sm:h-7 sm:w-7 text-medical-blue" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Lab Tests</h1>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Search tests..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        <Button 
          variant={filter === null ? "default" : "outline"}
          onClick={() => setFilter(null)}
          size={isMobile ? "sm" : "sm"}
          className="whitespace-nowrap"
        >
          All
        </Button>
        <Button 
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
          className={`whitespace-nowrap ${filter === "completed" ? "bg-medical-green hover:bg-medical-green/90" : ""}`}
          size={isMobile ? "sm" : "sm"}
        >
          Completed
        </Button>
        <Button 
          variant={filter === "pending" ? "default" : "outline"}
          onClick={() => setFilter("pending")}
          className={`whitespace-nowrap ${filter === "pending" ? "bg-medical-orange hover:bg-medical-orange/90" : ""}`}
          size={isMobile ? "sm" : "sm"}
        >
          Pending
        </Button>
        <Button 
          variant={filter === "processing" ? "default" : "outline"}
          onClick={() => setFilter("processing")}
          className={`whitespace-nowrap ${filter === "processing" ? "bg-medical-blue hover:bg-medical-blue/90" : ""}`}
          size={isMobile ? "sm" : "sm"}
        >
          Processing
        </Button>
        <Button 
          variant={filter === "cancelled" ? "default" : "outline"}
          onClick={() => setFilter("cancelled")}
          className={`whitespace-nowrap ${filter === "cancelled" ? "bg-medical-red hover:bg-medical-red/90" : ""}`}
          size={isMobile ? "sm" : "sm"}
        >
          Cancelled
        </Button>
      </div>

      {filteredTests.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <LabTestCard key={test.id} labTest={test} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Bell className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No lab tests found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default LabTests;
