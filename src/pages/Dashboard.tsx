
import { CalendarClock, Bell, FileText, Clock, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import TourTable from "@/components/TourTable";
import { tourPackages } from "@/data/tours";

export function Dashboard() {
  const isMobile = useIsMobile();

  const shortcuts = ["Recent Cab Booking","Recent Hotel Bookings","Recent Tour Bookings","Recent Listed Cabs","Recent Listed Hotels","Recent Onboarding Tour Guids","Recent Onboarding Tour Agent","Recent Cancellations"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center bg-white rounded-md px-3 py-1 text-xs sm:text-sm border border-gray-200">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1 sm:mr-2" />
          <span>Last updated: April 30, 2025, 10:30 AM</span>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Bookings</CardTitle>
            <CalendarClock className="h-3 w-3 sm:h-4 sm:w-4 text-medical-blue" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="text-lg sm:text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">3 completed, 1 pending, 2 in process</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Package Bookings</CardTitle>
            <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-medical-orange" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="text-lg sm:text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500">3 completed, 1 pending, 2 in process</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Hotels Bookings</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-medical-green" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="text-lg sm:text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500">3 completed, 1 pending, 2 in process</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Cabs Bookings</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-medical-green" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="text-lg sm:text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500">9 completed, 10 pending, 7 in process</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Health Score</CardTitle>
            <span className="text-xs font-medium text-medical-blue bg-medical-blue/10 px-2 py-0.5 rounded-full">
              Good
            </span>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="flex items-center space-x-2">
              <Progress value={75} className="h-2" />
              <span className="text-sm font-medium">75%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Improved by 3% since last check</p>
          </CardContent>
        </Card> */}
      </div>

      <div>
        <h2 className="text-md sm:text-lg font-semibold mb-4">Quick Actions</h2>
        <Card className="flex flex-wrap">

        {
          shortcuts?.map(res =>{
            return <Button key={res} variant="link" className="h-auto flex items-center justify-center p-3 sm:p-4 gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm">{res}</span>
            <ArrowUpRight className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
        </Button>
          })
        }
        </Card>
      </div>
      <div>
         <h2 className="text-md sm:text-lg font-semibold mb-4">Recent Bookings</h2>
       <Card>
         <TourTable tours={tourPackages} onBookNow={()=>{}} />
       </Card>
      </div>
    </div>
  );
}

export default Dashboard;
