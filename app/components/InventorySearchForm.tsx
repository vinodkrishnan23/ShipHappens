"use client";

import React, { useState } from "react";
import Image from "next/image";
import shipImage from "../ship.png";
import { ObjectId } from "mongodb";

export default function InventorySearchForm ({ user_email }: { user_email: string }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  interface itemSchema {
    _id:ObjectId;
  container_capacity:string;
  ship_name:string;
  source_port_name:string;
  source_port_code:string;
  journey_start_date:string;
  source_departure_time:string;
  journey_end_date:string;
  destination_arrival_time:string;
  destination_port_name:string;
  destination_port_code:string;
  price_in_dollars:string;
  newContainerCapacity:number;
  bookingAmt:number;
  bookingContainerCapacity:string;
  user_email:string;
  }
  
  const [inventoryData, setInventoryData] = useState<itemSchema[]>([]);

  const [sourceSuggestions, setSourceSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);

  type BookingItem = {
    row : ObjectId | string;
  }
  
  const [bookingItem, setBookingItem] = useState<BookingItem>({ row: "" });
  const [bookingContainerCapacity, setBookingContainerCapacity] = useState("0");

  const [transactionComplete, setTransactionComplete] = useState(false);

  const filterSourceSuggestions = (input: string, setSuggestions: React.Dispatch<React.SetStateAction<string[]>>) => {
    console.log("Source Entered: "+{ input });
    
    async function fetchSourceSuggestions() {
      console.log("---Source Autocomplete 1---")
      const res = await fetch("/api/sourceautocomplete?source="+input);
      const data = await res.json();
      console.log("---Source Autocomplete 2---")
      console.log(data)
      if (data.success) {
        // Set the fetched inventory data into state
        setSuggestions(data.suggestions.map((item: { _id: string; }) => item._id));
      } else {
        // Handle case where fetch was unsuccessful (optional)
        console.log("Failed to fetch source autocomplete data.");
      }
    }
    fetchSourceSuggestions();
    console.log(sourceSuggestions);
  };

  const filterDestinationSuggestions = (input: string, setSuggestions: React.Dispatch<React.SetStateAction<string[]>>) => {
    console.log("Destination Entered: "+{ input });
    
    async function fetchDestionationSuggestions() {
      console.log("---Destination Autocomplete 1---")
      const res = await fetch("/api/destinationautocomplete?destination="+input);
      const data = await res.json();
      console.log("---Destination Autocomplete 2---")
      console.log(data)
      if (data.success) {
        // Set the fetched inventory data into state
        setSuggestions(data.suggestions.map((item: { _id: string; }) => item._id));
      } else {
        // Handle case where fetch was unsuccessful (optional)
        console.log("Failed to fetch destination autocomplete data.");
      }
    }
    fetchDestionationSuggestions();
    console.log(destinationSuggestions);
  };

  function calculateTimeTaken(
    departureDate: string,
    departureTime: string,
    arrivalDate: string,
    arrivalTime: string
  ): string {
    // Combine date and time strings into a single datetime string
    const departureDateTime = new Date(`${departureDate}T${departureTime}:00`);
    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}:00`);
  
    // Ensure the Date objects are valid
    if (isNaN(departureDateTime.getTime()) || isNaN(arrivalDateTime.getTime())) {
      return "Invalid date or time format.";
    }
  
    // Calculate the difference in milliseconds
    const diffInMilliseconds: number = arrivalDateTime.getTime() - departureDateTime.getTime();
  
    if (diffInMilliseconds < 0) {
      return "Invalid input: Arrival time is before departure time.";
    }
  
    // Calculate days, hours, and minutes
    const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // Convert ms to minutes
    const days = Math.floor(diffInMinutes / (24 * 60));
    const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
    const minutes = diffInMinutes % 60;
  
    // Format the result
    return `${days}d ${hours}h ${minutes}m`;
  }

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
        console.log("Failed to fetch inventory data.");
      }
    }
    fetchInventory();
    console.log(inventoryData);
  };

  interface booking {
    row: ObjectId | string; // Allow `row` to be either an ObjectId or a string
}


  const showBookingSection = (id : ObjectId) => {
    let booking:booking = {"row": ""}; 
    if(bookingItem["row"] != id){
      booking = {"row" : id}
    }
    setBookingItem(booking);
    setTransactionComplete(false);
    console.log(booking);
  };

  const completeTransaction = (item : itemSchema, index : number) => {
    console.log("Inside Complete Transaction");
    const remainingContainerCapacityField = document.getElementById("remainingContainerCapacity_"+index);
    const newContainerCapacity = parseInt(item.container_capacity) - parseInt(bookingContainerCapacity);
    item["newContainerCapacity"] = newContainerCapacity;
    item["bookingAmt"] = parseInt(bookingContainerCapacity) * parseInt(item["price_in_dollars"]);
    item["bookingContainerCapacity"] = bookingContainerCapacity
    item["user_email"]= user_email
    console.log(JSON.stringify(item))
    async function completePurchase() {
      await fetch("/api/makePurchase", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item)
        }
      );
      

    }
    try {
      completePurchase();
    }
    catch (err) {
      console.error("Error:", err);
    } 

    

    /*async function completePurchase() {
      console.log("---Complete Purchase 1---")
      const res = await fetch("/api/makePurchase", { headers: { item: item} }
      const data = await res.json();
      console.log("---Complete Purchase 2---")
      console.log(data)
      if (data.success) {
        // Set the fetched inventory data into state
        setInventoryData(data.inventory);
      } else {
        // Handle case where fetch was unsuccessful (optional)
        console.log("Failed to fetch inventory data.");
      }
    }
    completePurchase();*/
    setTransactionComplete(true);

    if (null !== remainingContainerCapacityField){
      remainingContainerCapacityField.innerHTML= "<b>"+newContainerCapacity.toString()+"</b>";
      setBookingContainerCapacity("0");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-md">
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
              onChange={(e) => {
                setSource(e.target.value);
                filterSourceSuggestions(e.target.value, setSourceSuggestions);
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter source"
            />
            {sourceSuggestions.length > 0 && source.length > 3 && (
              <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-48 min-w-[200px] overflow-auto z-10">
                {sourceSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSource(suggestion.split(":")[1]?.trim() || "");
                      setSourceSuggestions([]);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
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
              onChange={(e) => {
                setDestination(e.target.value);
                filterDestinationSuggestions(e.target.value, setDestinationSuggestions);
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter destination"
            />
            {destinationSuggestions.length > 0 && destination.length > 3 && (
              <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-48 min-w-[200px] overflow-auto z-10">
                {destinationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setDestination(suggestion.split(":")[1]?.trim() || "");
                      setDestinationSuggestions([]);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
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

          {/* Search Button */}
          <div className="flex-1 max-w-[150px]">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-800"
            >
              <b>Search</b>
            </button>
          </div>

        </div>
      </form>

{/* Render Inventory Results if Available */}
{inventoryData.length > 0 && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">Search Results</h2>
    <div className="space-y-6">
      {inventoryData.map((item, index) => (
        <div key={index+"_1"}>
        <div
          key={index+"_2"}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
        >
          {/* Left section: Ship Name and Source Port Name */}
          <div className="flex flex-col w-1/4">
            <Image src={shipImage} alt="Ship" width={25} height={25} />
            <h4 className="text-l font-bold text-gray-800">{item.ship_name}</h4>
          </div>

          <div className="flex flex-col w-1/6">
            <p className="text-sm text-gray-700"><b>{item.source_port_name} ({item.source_port_code})</b></p>
            <p className="text-sm text-gray-500">{item.journey_start_date}</p>
            <p className="text-sm text-gray-500">{item.source_departure_time}</p>
          </div>

          {/* Arrow separator */}
          <div className="flex flex-col justify-center items-center text-blue-600">
            <span className="text-5xl">→</span>
            <span className="text-sm text-gray-500">{calculateTimeTaken(
              item.journey_start_date, item.source_departure_time, item.journey_end_date, item.destination_arrival_time
            )}</span>
          </div>

          {/* Right section: Destination Port Name and Journey End Date */}
          <div className="flex flex-col w-1/6 items-end">
            <p className="text-sm text-gray-700"><b>{item.destination_port_name} ({item.destination_port_code})</b></p>
            <p className="text-sm text-gray-500">{item.journey_end_date}</p>
            <p className="text-sm text-gray-500">{item.destination_arrival_time}</p>
          </div>

          {/* Right section: Destination Port Name and Journey End Date */}
          <div className="text-l font-bold text-gray-800">
            <p className="text-l text-gray-600">$ {item.price_in_dollars}&nbsp;</p>
          </div>

          {/* Right-most Column: Book Button */}
          <div className="flex justify-center items-center">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-200"
            onClick={() => showBookingSection(item._id)}
            >
              Book
            </button>
          </div>
        </div>
        { null != bookingItem && undefined != bookingItem && bookingItem["row"] == item._id && (
          <div
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            {/* Number of Containers Remaining Field */}
            <div className="flex flex-col w-1/4">
              <p className="text-sm text-gray-700"><b>Remaining Container Capacity:</b></p>
              <p className="text-sm text-gray-700" id={"remainingContainerCapacity_"+index}><b>{item.container_capacity}</b></p>
            </div>

            {/* Container Capacity to Reserve Field */}
            <div className="flex flex-col w-1/4">
              <p className="text-sm text-gray-700"><b>Container Capacity to Reserve:</b></p>
              <input
                type="text"
                id={"bookingContainerCapacity_"+index}
                value={parseInt(bookingContainerCapacity) > parseInt(item.container_capacity)? item.container_capacity : bookingContainerCapacity}
                max={item.container_capacity}
                onChange={(e) => {if(e.target.value==""){setBookingContainerCapacity("0")} setBookingContainerCapacity(e.target.value)}}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter no. of containers to reserve"
              />
            </div>

            {/* Total Price Field */}
            <div className="flex flex-col w-1/4">
              <p className="text-sm text-gray-700">&nbsp;&nbsp;<b>Total Price:</b></p>
              <p className="text-sm text-gray-700">&nbsp;&nbsp;<b>{bookingContainerCapacity==""?"$ 0": "$ "+parseInt(bookingContainerCapacity)*parseInt(item.price_in_dollars)}</b></p>
            </div>

            
              {/* Conditionally render the "Pay Now" button or the "Booking Accomplished" banner */}
      {!transactionComplete ? (
        <div className="flex flex-col w-1/4">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-200"
          onClick={() => completeTransaction(item,index)}
        >
          <b>Pay Now</b>
        </button>
      </div>
      ):
      (
        <div className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-200">
          <b>Booking Accomplished</b>
        </div>
      )
      }
            
          </div>
        )}
        </div>
      ))}
    </div>
  </div>
)}
</div>
);
};

