import { DynamicTable } from "@/components/DynamicTable";
import { Button } from "@/components/ui/button";

const DriverTable = ({ tours, totalItems, onView }) => {

  const columns = [
    {
      key: "full_name",
      label: "Name",
      render: (record) => (
        <div className="flex items-center gap-3">
          <img src={record?.image} className="w-16 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-medium line-clamp-1">{record?.full_name}</p>
          </div>
        </div>
      ),
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
        <Button
          onClick={() => onView(record)}
         variant="secondary"
        >
          View
        </Button>
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
