import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <form action={async () => { "use server"; await signIn("google") }}>

    <button type="submit" className='flex items-center text-black'>SignIn With Google</button>
    </form>
  )
} 