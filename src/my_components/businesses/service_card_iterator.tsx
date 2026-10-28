"use client";

import { useBusinesses } from "@/my_components/businesses/businnessesDAL";
import ServiceCard from "./service_card";

export default function ServiceCardIterator() {
  const { data: businesses, isPending, isError, error } = useBusinesses();

  if (isPending) {
    return (
      <div className="snap_div flex items-center justify-center p-8 text-secondary-4">
        <p>Loading services...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="snap_div flex items-center justify-center p-8 text-red-500">
        <p>Error: {error?.message || "Failed to load services"}</p>
      </div>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <div className="snap_div flex items-center justify-center p-8 text-secondary-4">
        <p>No services found.</p>
      </div>
    );
  }

  return (
    <section className="snap-start z-70 flex min-h-[100svh] w-full flex-wrap items-start justify-center gap-6 p-4 md:p-8">
      {businesses.map((provider) => (
        <ServiceCard key={provider.service_id} provider={provider} />
      ))}
    </section>
  );
}