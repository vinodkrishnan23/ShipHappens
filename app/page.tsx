import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import {auth} from "@/auth";
import { GiPirateHat } from "react-icons/gi";
import Mycard from "./components/MyCard";
import React from "react";
import InventorySearchForm from "@/app/components/InventorySearchForm";
import CustomerDetails from "./components/CustomerDetails";
import CaptainNotification from "@/app/components/CaptainNotification"

export default async function Home() {
  const session = await auth();
  console.log(session);
  const user = session?.user

  // const handleSearch = (source: string, destination: string, date: string) => {
  //   console.log("values: "+source+" "+destination+" "+date);
  // };

  //If user is there ie logged in then enter part 1 else go to part 2
  return user ?
  //part 1
  //In this part if the user is captain then go to part 3 else part 4
  ( user.is_captain ? 
    //Part 3
    (
    <div>
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold flex">
          <GiPirateHat size={30}/>
          Ship Happens !!!
        </h1>
        <SignOut></SignOut>
      </header>
      <h2>Captain&apos;s Dashboard</h2>
      <CaptainNotification user_email={user?.email ?? ''} />
    </div>
  )
  : 
  //Part 4
  //In Part 4 if this is a new user then prompt the Customer Details
    (

      !user._id ?

      (
        <div>
          <header className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold flex">
              <GiPirateHat size={30}/>
              Ship Happens !!!
            </h1>
            <Mycard user_name={user?.name ?? "User"} user_url={user?.image ?? "User"}/>
          </header>
          <CustomerDetails 
            user_email={user?.email ?? ""} 
            full_name={user?.name ?? "Guest"} 
          />

        </div> 
      )
      :
      (
        <div>
          <header className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold flex">
              <GiPirateHat size={30}/>
              Ship Happens !!!
            </h1>
            <Mycard user_name={user?.name ?? "User"} user_url={user?.image ?? "User"}/>
          </header>
          <InventorySearchForm user_email={user?.email ?? ""}/>

        </div>
      )
    )
  )
  :
  //part 2
  (
    <div className="flex flex-col justify-center text-center gap-6 max-w-5xl mx-auto items-center h-screen">
      <GiPirateHat size={100}/>
    <h1 className="flex text-5xl font-bold">
      
      Ship Happens !!!
    </h1>
    <SignIn></SignIn>
    </div>
  );
}