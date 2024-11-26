import React from 'react'
import { auth } from '@/auth'
import BookingHistory from '@/app/components/BookingHistory'
import { Ship } from 'lucide-react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GiPirateHat } from "react-icons/gi";

export default async function Profile () {
  const session = await auth();
  console.log(session);
  const user = session?.user;
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold flex">
          <GiPirateHat size={30}/>
          Ship Happens !!!
        </h1>
        <Button>
          <Link href="/">Back</Link>
        </Button>
      </header>
      <h1 className="text-xl font-bold pl-4 mb-4">About</h1>

      {/* Profile Sections */}
      <section className="bg-white p-6 rounded shadow-md">
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold">Full Name</span>
          <span>{user?.name || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold">Email</span>
          <span>{user?.email || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold">Phone</span>
          <span>{user?.phone || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold">DOB</span>
          <span>{user?.dob || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold">Gender</span>
          <span>{user?.gender || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold">Created At</span>
          <span>{user?.createdAt || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold">Updated At</span>
          <span>{user?.updatedAt || 'N/A'}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="font-semibold">Address</span>
          <span>{user?.address || 'N/A'}</span>
        </div>
        <div className="flex justify-end mt-4">
          <Button>Edit Profile</Button>
        </div>
      </section>
    </div>
  )
}