import TourTable from "@/components/TourTable"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { tourPackages } from "@/data/tours"
import { Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { OnBoardDriver } from "./OnBoardDriver"
import DriverTable from "./DriverTable"
import { useNavigate } from "react-router-dom"
import { deleteDriver, getDriverListing } from "@/api/driver"
import { DeleteConfirmation } from "@/components/custom-ui/DeleteConfirmation"


const DriverListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [deleteId, setDeleteId] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([])

  const listApi = async () => {
    let data = await getDriverListing();
    setData(data)
  }
  useEffect(() => {
    listApi();
  }, [isOpen, refetch])

  const onHandleDelete = async () => {
    setIsDeleting(true)
    await deleteDriver(deleteId);
    setIsDeleting(false)
    setRefetch(pre => !pre)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Drivers</h1>
          <Button variant="default" onClick={() => setIsOpen(true)} >New Driver</Button>
        </div>
        <div>
          <Card>
            <DriverTable tours={data} onView={(record) => navigate(`/dashboard/driver/${record.id}`)} onDelete={(id) => {
              setDeleteModalOpen(true);
              setDeleteId(id);
            }} totalItems={data?.length} />
          </Card>
        </div>
      </div>
      <OnBoardDriver
        open={isOpen}
        onOpenChange={setIsOpen}
      />
      <DeleteConfirmation
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => onHandleDelete()}
        title="Delete Driver"
        itemName={data?.full_name}
        description="Are your sure to delete driver"
        isLoading={isDeleting}
      />
    </>)
}

export default DriverListing