import { DeleteConfirmation } from "@/components/custom-ui/DeleteConfirmation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import CabTable from "./CabTable"
import OnBoardCab from "./OnBoardCab"
import { useDeleteCabMutation, useGetCabByIdQuery } from "@/app/services/cabApi"
import ViewCabModal from "./ViewCabDetails"
import { skipToken } from "@reduxjs/toolkit/query"


const CabListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCabDetailModelOpen,setIsCabDetailModelOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editId, setEditId] = useState();
  const [viewId,setViewId] = useState();
  const [deleteCab] = useDeleteCabMutation();

  const { data: carData } = useGetCabByIdQuery(viewId ?? skipToken);
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
          <Button variant="default" onClick={() => {
            setIsOpen(true);
            setEditId(null);
            setViewId(null)
          }}>New Cab</Button>
        </div>
        <div>
          <Card>
            <CabTable
              onDelete={(id) => {
                setDeleteId(id);
                setDeleteModalOpen(true);
              }}
              onEdit={(e) => {
                setEditId(e);
                setIsOpen(true)
              }}
              onView={(e)=>{
                setViewId(e)
                setIsCabDetailModelOpen(true)
              }}
            />
          </Card>
        </div>
      </div>
      {/* Boarding Modal */}
      {isOpen && <OnBoardCab
        isOpen={isOpen}
        onClose={setIsOpen}
        carId={editId}
      />}

      {deleteModalOpen && <DeleteConfirmation
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => onHandleDelete()}
        title="Delete Car"
        itemName={""}
        description="Are your sure to delete car"
        isLoading={isDeleting}
      />}
      {/* View Cab Modal */}
      <ViewCabModal 
        isOpen={isCabDetailModelOpen}
        onClose={() => setIsCabDetailModelOpen(false)}
        cab={carData?.car}
      />
    </>)
}

export default CabListing