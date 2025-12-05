import { DynamicTable } from "@/components/DynamicTable";
import { Button } from "@/components/ui/button";
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;

const BookingTable = ({ data, totalItems, onEdit=(id)=>{},onCancel=(id)=>{},onView=()=>{} }) => {
  const columns = [
    {
      key: "car_name",
      label: "Image & Name",
      className: "text-center",
      render: (record) => (
        <div className="flex items-center gap-3">
          <img src={API_URL+record?.car.images?.find(res => res.is_main == true)?.image_url} className="w-16 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-medium line-clamp-1">{record?.car?.car_name}</p>
          </div>
        </div>
      ),
    },
     {
      key: "car",
      label: "Fuel Type",
      className: "text-center",
      render: (record) => (
        <span className="font-medium text-sm">{record?.car?.fuel_type || "-"}</span>
      ),
    },
    {
      key: "driver",
      label: "Driver Name",
      className: "text-center",
      render: (record) => (
        <span className="font-medium text-sm">{record?.driver?.full_name || "-"}</span>
      ),
    },
    {
      key: "driver",
      label: "Driver Contact",
      className: "text-center",
      render: (record) => (
        <span className="font-medium text-sm">{record?.driver?.mobile || "-"}</span>
      ),
    },
    { key: "from_location", label: "Picup Location" },
    { key: "to_location", label: "Drop Location" },
    { key: "total_price", label: "Price" },
    { key: "trip_type", label: "Trip Type" },
    {
      key: "passengers",
      label: "Passengers",
      className: "text-center",
      render: (record) => (
        <span className="font-semibold text-sm">{record?.passengers?.length || 0}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      className: "text-center",
      render: (record) => (
        <div className="space-x-2">
            <Button size="sm" onClick={()=>onEdit(record.id)} variant="default">Edit</Button>
            <Button size="sm" onClick={()=>onCancel(record.id)} variant="destructive">Cancel</Button>
        </div>
      ),
    },
  ];

  return (
    <DynamicTable
      data={data}
      columns={columns}
      totalItems={totalItems}
    />
  );
};

export default BookingTable;
