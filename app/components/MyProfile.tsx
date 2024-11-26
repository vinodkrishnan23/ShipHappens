import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { Button } from '@/components/ui/button'
  import Link from 'next/link'
import SignOut from './SignOut'


const MyProfile = ({ user_name }: { user_name: string }) => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild >
  <Button variant="secondary"> <img className="w-5 h-5" src='https://lh3.googleusercontent.com/a/ACg8ocIVopOmmIumPBFegqESQgqgAlqm2n5dSBg8BrT9FRNz9V_XNg=s96-c'/>Hello {user_name} </Button>
    </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
        <Link href="/profile">My Bookings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <SignOut></SignOut>
        </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default MyProfile