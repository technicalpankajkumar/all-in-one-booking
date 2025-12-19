import { getDriverById } from "@/api/driver";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DriverDetailsView } from "./partials/DriverDetailView";

export default function DriverDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-muted/30">
      <main className=" mx-auto px-4 py-4">
        <DriverDetailsView id={id} />
      </main>
    </div>
  );
}
