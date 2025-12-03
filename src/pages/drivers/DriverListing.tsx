import TourTable from "@/components/TourTable"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { tourPackages } from "@/data/tours"
import { Clock } from "lucide-react"
import { useState } from "react"
import { OnBoardDriver } from "./OnBoardDriver"
import DriverTable from "./DriverTable"
import { useNavigate } from "react-router-dom"


const DriverListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Drivers</h1>
          <Button variant="default" onClick={()=>setIsOpen(true)} >New Driver</Button>
        </div>
        <div>
          <Card>
            <DriverTable tours={tourPackages} onBookNow={() => navigate("/dashboard/driver/1")} totalItems={tourPackages?.length}/>
          </Card>
        </div>
      </div>
      <OnBoardDriver 
          open={isOpen} 
          onOpenChange={setIsOpen}
          onComplete={(data) => console.log("Driver registered:", data)}
        />
    </>)
}

export default DriverListing