"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  

interface Profile {
    email: string;
    phone: string;
    address: string;
    dob: string;
    gender: string;
    created_at: string;
    updated_at: string;
    full_name : string
}

export default function UserProfile({ user_email }: { user_email: string }) {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/profile", { headers: { user_email: user_email } });
      const data = await res.json();
      console.log("I am here in User Profile")
      console.log(data)
      setProfile(data.profile_info);
    }
    fetchBookings();
  }, [user_email]);
  console.log(profile, " In User Profile")

  /*return (
    <div>
      <h2>Booking History</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id}>
            Booking ID: {booking.booking_id}, Route ID: {booking.route_id}, Status: {booking.payment_status}
          </li>
        ))}
      </ul>
    </div>
  );*/

  return (
    <div>
       <section className="bg-white p-6 pt-8 rounded shadow-md mx-64 mt-16">
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">Full Name</span>
          <span>{profile?.full_name || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">Email</span>
          <span>{profile?.email || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">Phone</span>
          <span>{profile?.phone || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">DOB</span>
          <span>{profile?.dob || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">Gender</span>
          <span>{profile?.gender || 'N/A'}</span>
        </div>
        
        <div className="flex justify-between py-1">
          <span className="font-semibold">Address</span>
          <span>{profile?.address || 'N/A'}</span>
        </div>
      </section> 
    </div>
  )
}