import React from 'react'
import { auth } from '@/auth'
import UserProfile from "@/app/components/UserProfile";
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
      <h1 className="text-xl font-bold pl-4 mb-4">Profile Info</h1>

      {/* Profile Sections */}

      <UserProfile user_email={user?.email ?? ''} />

      
    </div>
  )
}