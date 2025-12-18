import { useGetDriversQuery } from "@/app/services/driverApi";
import { DynamicTable } from "@/components/DynamicTable";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;

const DriverTable = ({onView,onDelete,onEdit}) => {
  const [filters, setFilters] = useState({
      page: 1,
      limit: 10,
      search : "",
      assigned_car_id:'',
      status:'',
    });
  const {data,isLoading} =useGetDriversQuery(filters)

  const columns = [
    {
      key: "full_name",
      label: "Name",
      render: (record) => {
        return (
        <div className="flex items-center gap-3">
          <img src={API_URL+record?.images?.find(res => res.image_type == 'profile')?.image_path} className="w-16 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-medium line-clamp-1">{record?.auth?.name}</p>
          </div>
        </div>
      )},
    },
    {
      key: "gender",
      label: "Gender",
      className: "text-center",
      render: (record) => (
        <div className=" text-sm text-center">{record?.auth?.profile?.gender}</div>
      ),
    },
    {
      key: "experience_years",
      label: "Experience Year's",
      className: "text-center",
      render: (record) => (
        <div className=" text-sm text-center">{String(record?.auth?.profile?.experience_years) }</div>
      ),
    },
    { key: "email", label: "Email",
      render: (record) => (
        <div className=" text-sm text-center">{String(record?.auth?.email) }</div>
      )
     },
    { key: "mobile", label: "Mobile",
       render: (record) => (
        <div className=" text-sm text-center">{String(record?.auth?.mobile) }</div>
      )
     },
     { key: "city", label: "City",
      render: (record) => (
        <div className=" text-sm text-center">{String(record?.auth?.profile?.city) }</div>
      )
      },
    { key: "state", label: "State",
      render: (record) => (
        <div className=" text-sm text-center">{String(record?.auth?.profile?.state) }</div>
      )
     },
    { key: "pincode", label: "Pin Code",
      render: (record) => (
        <div className=" text-sm text-center">{String(record?.auth?.profile?.pincode) }</div>
      )
     },
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
          <Eye onClick={() => onView?.(record.id)} size={20} className="text-green-800 cursor-pointer"/>
          <Edit onClick={() => onEdit?.(record.id)} size={20} className="text-primary cursor-pointer"/>
          <Trash2 onClick={() => onDelete?.(record.id)} size={20} className="text-destructive cursor-pointer"/>
      </div>
      ),
    },
  ];

  return (
    <DynamicTable
      data={data?.drivers || []}
      columns={columns}
      totalItems={data?.total || 0}
      onPageChange={(e, pageSize) => {
        setFilters((pre) => ({
          ...pre,
          page: e,
          limit: pageSize
        }));
      }}
    />
  );
};

export default DriverTable;
