import { getCabsListing } from "@/api/cab"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import CabTable from "./CabTable"
import OnBoardCab from "./OnBoardCab"


const CabListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data,setData] = useState([])

  const listApi = async()=>{
    let data = await getCabsListing();
    setData(data)
  }
  useEffect(()=>{
    listApi();
  },[isOpen])

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Cabs</h1>
          <Button variant="default" onClick={()=>setIsOpen(true)} >New Cab</Button>
        </div>
        <div>
          <Card>
              <CabTable data={data} totalItems={data?.length}/>
          </Card>
        </div>
      </div>
      {/* Boarding Modal */}
      <OnBoardCab
        isOpen={isOpen}
        onClose={setIsOpen}
      />
    </>)
}

export default CabListing