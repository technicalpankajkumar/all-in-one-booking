import { getDriverById } from "@/api/driver";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DriverDetailsView } from "./partials/DriverDetailView";

export default function DriverDetailsPage() {
  const { id } = useParams();
  const [data,setData] = useState({});
  const [trigger,setTrigger] = useState<boolean>(false)

  const listApi = async(id)=>{
    let data = await getDriverById(id);
    setData(data || {})
  }
  useEffect(()=>{
    listApi(id);
  },[id,trigger])

  return (
    <div className="min-h-screen bg-muted/30">
      <main className=" mx-auto px-4 py-4">
        <DriverDetailsView driver={data} trigger={async () => setTrigger(pre => !pre)} />
      </main>
    </div>
  );
}
