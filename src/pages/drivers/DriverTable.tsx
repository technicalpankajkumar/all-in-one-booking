import { deleteDriver } from "@/api/driver";
import { DynamicTable } from "@/components/DynamicTable";
import { Button } from "@/components/ui/button";
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;
const DriverTable = ({ tours, totalItems, onView,onDelete}) => {
 
  const columns = [
    {
      key: "full_name",
      label: "Name",
      render: (record) => {
        return (
        <div className="flex items-center gap-3">
          <img src={API_URL+record?.images?.find(res => res.image_type == 'profile')?.image_path} className="w-16 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-medium line-clamp-1">{record?.full_name}</p>
          </div>
        </div>
      )},
    },
    {
      key: "gender",
      label: "Gender",
      className: "text-center",
      render: (record) => (
        <div className=" text-sm text-center">{record.gender}</div>
      ),
    },
    {
      key: "experience_years",
      label: "Experience Year's",
      className: "text-center",
      render: (record) => (
        <div className=" text-sm text-center">{String(record.experience_years) }</div>
      ),
    },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
     { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "pincode", label: "PinCode" },
    {
      key: "upi_id",
      label: "UPI ID",
      className: "text-center",
      render: (record) => (
        <div className="font-semibold text-sm text-center">{String(record.upi_id) }</div>
      ),
    },

    {
      key: "action",
      label: "Action",
      className: "text-center",
      render: (record) => (
        <div className="flex gap-2">
          <Button onClick={()=>onDelete(record.id)} size="sm" variant="destructive" >Delete</Button>
          <Button onClick={() => onView(record)}  variant="secondary" > View </Button>
      </div>
      ),
    },
  ];

  return (
    <DynamicTable
      data={tours}
      columns={columns}
      totalItems={totalItems}
    />
  );
};

export default DriverTable;
