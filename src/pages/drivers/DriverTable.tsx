import { DynamicTable } from "@/components/DynamicTable";

const DriverTable = ({ tours, totalItems, onBookNow }) => {

  const columns = [
    {
      key: "package",
      label: "Package",
      render: (tour) => (
        <div className="flex items-center gap-3">
          <img src={tour.image} className="w-16 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-medium line-clamp-1">{tour.name}</p>
          </div>
        </div>
      ),
    },
    { key: "destination", label: "Destination" },
    { key: "duration", label: "Duration" },
    {
      key: "price",
      label: "Price",
      className: "text-right",
      render: (tour) => (
        <span className="font-bold text-lg">₹{tour.price.toLocaleString()}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      className: "text-center",
      render: (tour) => (
        <button
          onClick={() => onBookNow(tour)}
          className="px-3 py-1 bg-primary text-white rounded-md"
        >
          Book
        </button>
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
