"use client";

import React, {useEffect, useState } from "react";

const InventorySearchForm: React.FC = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [inventoryData, setInventoryData] = useState<any[]>([]);

  const handleSearch = () => {
    console.log({ source, destination, departure });
    
    async function fetchInventory() {
      console.log("---Inventory Search 1---")
      const res = await fetch("/api/inventory?source="+source+"&destination="+destination+"&date="+departure);
      const data = await res.json();
      console.log("---Inventory Search 2---")
      console.log(data)
      if (data.success) {
        // Set the fetched inventory data into state
        setInventoryData(data.inventory);
      } else {
        // Handle case where fetch was unsuccessful (optional)
        console.error("Failed to fetch inventory data.");
      }
    }
    fetchInventory();
    console.log(inventoryData);
    // Perform additional search logic or API calls
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-md">
      <h1 className="text-xl font-bold mb-4">Search</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="space-y-4"
      >
        {/* Row Container for Inputs */}
        <div className="flex flex-wrap gap-4">
          {/* Source Field */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="source" className="block text-sm font-medium">
              Source
            </label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter source"
            />
          </div>

          {/* Destination Field */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="destination" className="block text-sm font-medium">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter destination"
            />
          </div>

          {/* Departure Field */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="departure" className="block text-sm font-medium">
              Departure
            </label>
            <input
              type="date"
              id="departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

{/* Render Inventory Results if Available */}
{inventoryData.length > 0 && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">Inventory Results</h2>
    <div className="space-y-6">
      {inventoryData.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
        >
          {/* Left section: Ship Name and Source Port Name */}
          <div className="flex flex-col w-1/3">
            <h3 className="text-xl font-bold text-gray-800">{item.ship_name}</h3>
            <p className="text-sm text-gray-600">{item.source_port_name}</p>

            {/* Journey Start Date */}
            <p className="text-sm text-gray-500">{item.journey_start_date}</p>
          </div>

          {/* Arrow separator */}
          <div className="flex flex-col justify-center items-center text-blue-600">
            <span className="text-3xl">→</span>
            <span className="text-sm text-gray-500">Route</span>
          </div>

          {/* Right section: Destination Port Name and Journey End Date */}
          <div className="flex flex-col w-1/3 items-end">
            <p className="text-sm text-gray-600">{item.destination_port_name}</p>

            {/* Journey End Date */}
            <p className="text-sm text-gray-500">{item.journey_end_date}</p>
          </div>

          {/* Right-most Column: Book Button */}
          <div className="flex justify-center items-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Book
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
</div>
);
};

export default InventorySearchForm;
