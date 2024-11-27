import React from 'react'
import { auth } from '@/auth'
import BookingHistory from '@/app/components/BookingHistory'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GiPirateHat } from "react-icons/gi";

export default async function Profile () {
  const session = await auth();
  console.log("component bookings page");
  console.log(session);
  const user = session?.user
  return (
    <div>
        <header className="flex justify-between items-center p-4">
    <h1 className="text-2xl font-bold flex">
      <GiPirateHat size={30}/>
      Ship Happens !!!
    </h1>
    
    <Button>
        <Link href="/">Back</Link>
        
        </Button>
  </header>
  <h1 className="text-xl font-bold flex">My Bookings</h1>
        <BookingHistory user_email={user?.email ?? ''} />
    </div>
  )
}