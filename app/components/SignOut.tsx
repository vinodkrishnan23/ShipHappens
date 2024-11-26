import React from 'react'
import { signOut } from '@/auth'

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut()
      }}
    >
      <button type="submit" className='flex items-center text-black'>SignOut</button>
    </form>
  )
}

export default SignOut