"use client";

import { useBusinesses } from "@/my_components/businesses/businnessesDAL";
import ServiceCard from "./service_card";

export default function ServiceCardIterator() {
  const { data: businesses, isPending, isError, error } = useBusinesses();

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <p>Loading services...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        <p>Error: {error?.message || "Failed to load services"}</p>
      </div>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <p>No services found.</p>
      </div>
    );
  }

  return (
    <div className="z-70 flex flex-wrap items-stretch justify-center gap-6 p-4">
      {businesses.map((provider) => (
        <ServiceCard
          key={provider.service_id}
          provider={provider}
        />
      ))}
    </div>
  );
}