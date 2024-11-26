import BookingHistory from "./components/BookingHistory";
import SearchRoutes from "./components/SearchRoutes";
import SignIn from "./components/SignIn";
import {auth} from "@/auth";
import { Ship } from 'lucide-react';
import { GiPirateHat } from "react-icons/gi";
import { GiPirateCaptain } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import SignOut from "./components/SignOut";
import MyProfile from "./components/MyProfile";

export default async function Home() {
  const session = await auth();
  console.log(session);
  const user = session?.user

  return user ? (<div>
  <header className="flex justify-between items-center p-4">
    <h1 className="text-2xl font-bold flex">
      <GiPirateHat size={30}/>
      Ship Happens !!!
    </h1>
    <MyProfile user_name = { user.name }/>
  </header>
  </div>
): (<div className="flex flex-col justify-center text-center gap-6 max-w-5xl mx-auto items-center h-screen">
<h1 className="flex text-3xl font-bold">
  <GiPirateHat size={30}/>
  Ship Happens !!!
</h1>

<SignIn></SignIn>
</div>);
}