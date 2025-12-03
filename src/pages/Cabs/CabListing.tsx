import TourTable from "@/components/TourTable"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { tourPackages } from "@/data/tours"
import { Clock } from "lucide-react"
import { useState } from "react"
import OnBoardCab from "./OnBoardCab"


const CabListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Cabs</h1>
          <Button variant="default" onClick={()=>setIsOpen(true)} >New Cab</Button>
        </div>
        <div>
          <Card>
            <TourTable tours={tourPackages} onBookNow={() => { }} />
          </Card>
        </div>
      </div>
      {/* Boarding Modal */}
      <OnBoardCab
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>)
}

export default CabListing