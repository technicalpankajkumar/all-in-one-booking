import { getCabsListing } from "@/api/cab"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import CabTable from "./CabTable"
import OnBoardCab from "./OnBoardCab"
import { DeleteConfirmation } from "@/components/custom-ui/DeleteConfirmation"


const CabListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [deleteId, setDeleteId] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const listApi = async () => {
    let data = await getCabsListing();
    setData(data)
  }
  useEffect(() => {
    listApi();
  }, [isOpen,refetch]);

    const onHandleDelete = async () => {
      setIsDeleting(true)
      // await (deleteId);
      setIsDeleting(false)
      setRefetch(pre => !pre)
    }


  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Cabs</h1>
          <Button variant="default" onClick={() => setIsOpen(true)} >New Cab</Button>
        </div>
        <div>
          <Card>
            <CabTable data={data} totalItems={data?.length} onDelete={(id)=>{
              setDeleteId(id);
              setDeleteModalOpen(true)
            }}/>
          </Card>
        </div>
      </div>
      {/* Boarding Modal */}
      <OnBoardCab
        isOpen={isOpen}
        onClose={setIsOpen}
      />

      <DeleteConfirmation
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => onHandleDelete()}
        title="Delete Car"
        itemName={data?.car_name}
        description="Are your sure to delete car"
        isLoading={isDeleting}
      />
    </>)
}

export default CabListing