import { DeleteConfirmation } from "@/components/custom-ui/DeleteConfirmation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import CabTable from "./CabTable"
import OnBoardCab from "./OnBoardCab"
import { useDeleteCabMutation } from "@/app/services/cabApi"


const CabListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteCab] = useDeleteCabMutation()

    const onHandleDelete = async () => {
      setIsDeleting(true)
      await deleteCab(deleteId);
      setIsDeleting(false)
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
            <CabTable 
            onDelete={(id) => {
              setDeleteId(id);
              setDeleteModalOpen(true);
            }}
            onEdit={()=>{}}
            />
          </Card>
        </div>
      </div>
      {/* Boarding Modal */}
      {isOpen && <OnBoardCab
        isOpen={isOpen}
        onClose={setIsOpen}
      />}

     { deleteModalOpen && <DeleteConfirmation
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => onHandleDelete()}
        title="Delete Car"
        itemName={""}
        description="Are your sure to delete car"
        isLoading={isDeleting}
      />}
    </>)
}

export default CabListing