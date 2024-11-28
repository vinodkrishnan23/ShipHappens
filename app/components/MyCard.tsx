import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { Button } from '@/components/ui/button'
  import Link from 'next/link'
import SignOut from './SignOut'


const Mycard = ({ user_name , user_url}: { user_name: string, user_url: string }) => {
  console.log("This is" ,user_url)
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild >
  <Button variant="secondary"> <img className="w-5 h-5" src={user_url}/>Hello {user_name} </Button>
    </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
        <Link href="/bookings">My Bookings</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <Link href="/profile">My Profile</Link>
    </DropdownMenuItem>
        <DropdownMenuItem>
            <SignOut></SignOut>
        </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default Mycard