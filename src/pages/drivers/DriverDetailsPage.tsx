import { DriverDetailsView } from "./partials/DriverDetailView";
import { Driver } from "../../data/types";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getDriverById } from "@/api/driver";

export default function DriverDetailsPage() {
  const { id } = useParams();
  const [data,setData] = useState({});

  const listApi = async(id)=>{
    let data = await getDriverById(id);
    setData(data || {})
  }
  useEffect(()=>{
    listApi(id);
  },[id])

  return (
    <div className="min-h-screen bg-muted/30">
      <main className=" mx-auto px-4 py-4">
        <DriverDetailsView driver={data} />
      </main>
    </div>
  );
}
