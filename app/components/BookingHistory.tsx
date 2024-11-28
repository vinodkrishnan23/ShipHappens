"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"

import Popoverdemo from "./Popoverdemo";
  
interface BookingRoute {
 srcPortName: string;
 destPortName: string;
}

interface shipDetails{
  shipName: string;
}

interface Booking {
  _id: object;
  bookingRoute: BookingRoute,
  shipDetails: shipDetails;
  bookedContainers: number;
  bookingAmount: number;
  paymentStatus: string;
}

export default function BookingHistory({ user_email }: { user_email: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/bookings", { headers: { user_email: user_email } });
      const data = await res.json();
      console.log("I am here")
      console.log(data)
      setBookings(data.bookings);
    }
    fetchBookings();
  }, [user_email]);
  console.log(bookings)

  /*return (
    <div>
      <h2>Booking History</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id}>
            Booking ID: {booking.booking_id}, Route ID: {booking.route_id}, Status: {booking.payment_status}
          </li>
        ))}
      </ul>
    </div>
  );*/

  return (
    <div>
        <Table>
            <TableCaption>Your Bookings with us</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="p-2"></TableHead>
                <TableHead className="p-2">Booking ID</TableHead>
                <TableHead className="p-2">Source Port</TableHead>
                <TableHead className="p-2">Destination Port</TableHead>
                <TableHead className="p-2">Ship Name</TableHead>
                <TableHead className="p-2">Containers Booked</TableHead>
                <TableHead className="p-2">Payment Status</TableHead>
                <TableHead className="p-2">Amount Paid</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {bookings.map((booking) => (
                <TableRow key={booking._id.toString()}>
                  <TableCell className="p-2">
                    <span><Popoverdemo booking={booking}></Popoverdemo> </span>
                </TableCell>
                <TableCell className="font-medium text-left p-2">
                    <span className="font-semibold">
                    { booking._id.toString() }
                        </span>
                </TableCell>
                <TableCell className="text-left p-2">
                    <span>{ booking.bookingRoute.srcPortName }</span>
                </TableCell>
                <TableCell className="text-left p-2">
                    <span>{ booking.bookingRoute.destPortName }</span>
                </TableCell>
                <TableCell className="text-left p-2">
                    { booking.shipDetails.shipName }
                </TableCell>
                <TableCell className="text-left p-2">
                    { booking.bookedContainers }
                </TableCell>
                <TableCell className="text-left p-2">
                <Badge className="rounded-full">
                    { booking.paymentStatus }
                    </Badge>
                </TableCell>
                <TableCell className="p-2">
                    <span>{ booking.bookingAmount }</span>
                </TableCell>
                </TableRow>))}
            </TableBody>
            </Table>
    </div>
  )
}