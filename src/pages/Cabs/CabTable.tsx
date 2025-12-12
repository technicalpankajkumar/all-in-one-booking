import { useGetCabsQuery } from "@/app/services/cabApi";
import { DynamicTable } from "@/components/DynamicTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const API_URL = import.meta.env.VITE_APP_API_IMAGE_URL;

const CabTable = ({ onDelete,onEdit }) => {  
  const { data, refetch, isLoading } = useGetCabsQuery();


  const columns = [
    {
      key: "car_name",
      label: "Name",
      render: (record) => (
        <div className="flex items-center gap-3">
          <img src={API_URL + record.images?.find(res => res.is_main == true)?.image_url} className="w-16 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-medium line-clamp-1">{record.car_name}</p>
          </div>
        </div>
      ),
    },
    { key: "car_type", label: "Car Type" },
    { key: "seat_capacity", label: "Seat Capacity" },
    { key: "bag_capacity", label: "Bag Capacity" },
    { key: "base_price", label: "Base Price" },
    {
      key: "fuel_type",
      label: "Fuel Type",
      className: "text-right",
      render: (record) => (
        <span className="font-semibold text-sm">{record.fuel_type}</span>
      ),
    },
    {
      key: "is_available",
      label: "Available",
      className: "text-right",
      render: (record) => (
        <span className="font-semibold text-sm">{record.is_available ? "Yes" : "No"}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      className: "text-center",
      render: (record) => (
        <div className="space-x-2">
          <Button size="sm" onClick={() => onEdit?.(record.id)} variant="default">Edit</Button>
          <Button size="sm" onClick={() => onDelete?.(record.id)} variant="destructive">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <DynamicTable
      data={data?.data?.cars}
      columns={columns}
      totalItems={data?.data?.total}
    />
  );
};

export default CabTable;
