import { getCabsListing } from "@/api/cab"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import BookingTable from "./BookingTable"
import { DeleteConfirmation } from "@/components/custom-ui/DeleteConfirmation"
import { cancelBooking, getBookingListing } from "@/api/booking"
import { useNavigate } from "react-router-dom"


const BookingListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [deleteId, setDeleteId] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const listApi = async () => {
    let data = await getBookingListing();
    setData(data)
  }
  useEffect(() => {
    listApi();
  }, [isOpen,refetch]);

    const onHandleCancel = async () => {
      setIsDeleting(true)
      await cancelBooking(deleteId);
      setRefetch(pre => !pre)
      setIsDeleting(false)
    }


  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Bookings</h1>
          <Button variant="default" onClick={() => navigate("/cabs")} >New Booking</Button>
        </div>
        <div>
          <Card>
            <BookingTable data={data} totalItems={data?.length} onCancel={(id)=>{
              setDeleteId(id);
              setDeleteModalOpen(true)
            }}/>
          </Card>
        </div>
      </div>

      <DeleteConfirmation
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => onHandleCancel()}
        title="Cancel Car"
        itemName={data?.car_name}
        description="Are your sure to cancel car"
        isLoading={isDeleting}
      />
    </>)
}

export default BookingListing