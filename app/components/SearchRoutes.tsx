"use client";

import { useState } from "react";

export default function SearchRoutes({ userId }: { userId: string }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [routes, setRoutes] = useState<{ _id: string; sourcePort: string; destinationPort: string; availableContainers: number; }[]>([]);

  const searchRoutes = async () => {
    const res = await fetch(`/api/search?source=${source}&destination=${destination}&date=${date}`);
    const data = await res.json();
    setRoutes(data.routes);
  };

  const bookContainer = async (routeId: string) => {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ routeId, userId, containerCount: 1 }),
    });
    const data = await res.json();
    if (data.success) alert("Booking confirmed!");
  };

  return (
    <div>
      <h2>Search Routes</h2>
      <input type="text" placeholder="Source" onChange={(e) => setSource(e.target.value)} />
      <input type="text" placeholder="Destination" onChange={(e) => setDestination(e.target.value)} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={searchRoutes}>Search</button>
      <ul>
        {routes.map((route) => (
          <li key={route._id}>
            {route.sourcePort} to {route.destinationPort} | Available: {route.availableContainers}
            <button onClick={() => bookContainer(route._id)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
