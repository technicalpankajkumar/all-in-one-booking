
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Download, FileText, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabStatusBadge } from "@/components/lab/LabStatusBadge";
import { LabResultTable } from "@/components/lab/LabResultTable";
import { labTests } from "../data/labTests";
import { format } from "date-fns";

export function LabTestDetail() {
  const { id } = useParams<{ id: string }>();
  const labTest = labTests.find(test => test.id === id);

  if (!labTest) {
    return (
      <div className="text-center py-12">
        <Bell className="mx-auto h-12 w-12 text-gray-300" />
        <h2 className="mt-2 text-lg font-medium">Lab test not found</h2>
        <p className="mt-1 text-sm text-gray-500">The lab test you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-4">
          <Link to="/dashboard/lab-tests">Go back to lab tests</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="mr-1">
          <Link to="/dashboard/lab-tests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <Bell className="h-6 w-6 text-medical-blue" />
        <h1 className="text-2xl font-bold tracking-tight">{labTest.testName}</h1>
        <LabStatusBadge status={labTest.status} className="ml-2" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="results">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="details">Test Details</TabsTrigger>
            </TabsList>
            <TabsContent value="results" className="mt-4">
              {labTest.results ? (
                <>
                  <div className="bg-white p-4 rounded-md border mb-4">
                    <h3 className="text-lg font-semibold mb-2">Test Results</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {labTest.reportDate ? 
                        `Results reported on ${format(new Date(labTest.reportDate), "MMMM d, yyyy 'at' h:mm a")}` : 
                        "Results pending"}
                    </p>
                    <LabResultTable results={labTest.results} />
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md border">
                    <h3 className="text-lg font-semibold mb-2">Interpretation</h3>
                    <p className="text-sm text-gray-600">
                      Based on the test results, most values are within normal ranges. Your glucose level is slightly elevated,
                      which may indicate prediabetes. It is recommended to discuss this finding with your healthcare provider during
                      your next appointment.
                    </p>
                    
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <h4 className="text-sm font-semibold text-blue-800 mb-1">Doctor's Note</h4>
                      <p className="text-sm text-blue-800">
                        Please schedule a follow-up appointment to discuss glucose management strategies and potential dietary adjustments.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white p-6 rounded-md border text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-2 text-lg font-medium">Results not available yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    The results for this test are still being processed. Please check back later.
                  </p>
                  {labTest.status === "processing" && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-medical-blue h-2.5 rounded-full w-3/4"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Estimated completion: 24 hours</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="bg-white p-6 rounded-md border">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Test ID</h3>
                    <p>{labTest.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Test Code</h3>
                    <p>{labTest.testCode}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Test Type</h3>
                    <p>{labTest.testType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Status</h3>
                    <LabStatusBadge status={labTest.status} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Sample Date</h3>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{format(new Date(labTest.sampleDate), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Sample Time</h3>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{format(new Date(labTest.sampleDate), "h:mm a")}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Doctor</h3>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{labTest.doctorName}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Department</h3>
                    <p>{labTest.department}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Test Description</h3>
                  <p className="text-sm text-gray-600">{labTest.description}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Sample Collection Instructions</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Fasting for 8-12 hours before collection is recommended</li>
                    <li>Avoid alcohol consumption for 24 hours before the test</li>
                    <li>Maintain normal hydration (drink water as usual)</li>
                    <li>Inform your technician about any medications you are taking</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download Results
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <User className="mr-2 h-4 w-4" /> Contact Doctor
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Schedule Follow-up
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Timeline</CardTitle>
              <CardDescription>History of your test</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-medical-blue"></div>
                  <p className="text-sm font-medium">Sample Collected</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(labTest.sampleDate), "MMM d, yyyy • h:mm a")}
                  </p>
                </div>
                
                {labTest.status === "processing" && (
                  <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-medical-blue"></div>
                    <p className="text-sm font-medium">Processing</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(), "MMM d, yyyy • h:mm a")}
                    </p>
                  </div>
                )}
                
                {labTest.reportDate && (
                  <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-medical-green"></div>
                    <p className="text-sm font-medium">Results Available</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(labTest.reportDate), "MMM d, yyyy • h:mm a")}
                    </p>
                  </div>
                )}
                
                {labTest.status === "cancelled" && (
                  <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-medical-red"></div>
                    <p className="text-sm font-medium">Cancelled</p>
                    <p className="text-xs text-gray-500">
                      Test was cancelled
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LabTestDetail;
