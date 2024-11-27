"use client";

import React, { useState } from "react";

// Define types for Address and Customer
interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface Customer {
  email: string;
  phone: string;
  address: Address;
  dob: string;
  gender: string;
  fullname?: string;
}

export default function CustomerDetails({ user_email, full_name }: { user_email: string; full_name: string }) {
  const [customer, setCustomer] = useState<Customer>({
    email: user_email,
    phone: "",
    fullname: full_name,
    address: {
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
    dob: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const addressField = name.split(".")[1]; // Extract address field name
      setCustomer((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else {
      setCustomer((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Async function to make an API POST call
  const saveCustomerProfile = async (customerData: Customer) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/customerinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error("Failed to save customer profile");
      }

      const result = await response.json();
      console.log("Customer profile saved successfully:", result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Customer Profile Submitted:", customer);
    saveCustomerProfile(customer);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullname" className="block">
            Full Name:
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={customer.fullname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            readOnly
          />
        </div>
        {/* Customer Email */}
        <div>
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={customer.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            readOnly
          />
        </div>{" "}
        {/* Customer Phone */}
        <div>
          <label htmlFor="phone" className="block">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={customer.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Address Fields */}
        <h2 className="text-xl font-semibold mt-6">Address</h2>
        <div>
          <label htmlFor="address.street" className="block">
            Street:
          </label>
          <input
            type="text"
            name="address.street"
            id="address.street"
            value={customer.address.street}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="address.city" className="block">
            City:
          </label>
          <input
            type="text"
            name="address.city"
            id="address.city"
            value={customer.address.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="address.state" className="block">
            State:
          </label>
          <input
            type="text"
            name="address.state"
            id="address.state"
            value={customer.address.state}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="address.postal_code" className="block">
            Postal Code:
          </label>
          <input
            type="text"
            name="address.postal_code"
            id="address.postal_code"
            value={customer.address.postal_code}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="address.country" className="block">
            Country:
          </label>
          <input
            type="text"
            name="address.country"
            id="address.country"
            value={customer.address.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block">
            Date of Birth:
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={customer.dob}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block">
            Gender:
          </label>
          <select
            name="gender"
            id="gender"
            value={customer.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
            onClick={() => window.location.reload()}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};
