import SignIn from "./components/SignIn";
import {auth} from "@/auth";
import { GiPirateHat } from "react-icons/gi";
import Mycard from "./components/MyCard";
import React from "react";
import InventorySearchForm from "@/app/components/InventorySearchForm";

export default async function Home() {
  const session = await auth();
  console.log(session);
  const user = session?.user

  const handleSearch = (source: string, destination: string, date: string) => {
    console.log("values: "+source+" "+destination+" "+date);
  };

  return user ?
  ( user.is_captain ? (
    <div>
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold flex">
          <GiPirateHat size={30}/>
          Ship Happens !!!
        </h1>
      </header>
      <h2>Captain's Dashboard</h2>
    </div>
  )
  :
    (<div>
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold flex">
          <GiPirateHat size={30}/>
          Ship Happens !!!
        </h1>
        <Mycard user_name={user?.name ?? "User"}/>
      </header>
      <InventorySearchForm />

    </div>)
  )
  :
  (
    <div className="flex flex-col justify-center text-center gap-6 max-w-5xl mx-auto items-center h-screen">
    <h1 className="flex text-3xl font-bold">
      <GiPirateHat size={30}/>
      Ship Happens !!!
    </h1>
    <SignIn></SignIn>
    </div>
  );
}