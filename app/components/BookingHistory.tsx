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
  

interface Booking {
  booking_id: string;
  user_id: string;
  route_id: number;
  ship_name: string;
  amount_paid: number;
  payment_status: string;
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
                <TableHead className="p-2">Shipping ID</TableHead>
                <TableHead className="p-2">Route ID</TableHead>
                <TableHead className="p-2">Ship Name</TableHead>
                <TableHead className="p-2">Payment Status</TableHead>
                <TableHead className="p-2">Amount Paid</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {bookings.map((booking) => (
                <TableRow key={booking.booking_id}>
                <TableCell className="font-medium text-left p-2">
                    <span className="font-semibold">
                    { booking.booking_id }
                        </span>
                </TableCell>
                <TableCell className="text-left p-2">
                    <span>{ booking.route_id }</span>
                </TableCell>
                <TableCell className="text-left p-2">
                    <span>{ booking.ship_name }</span>
                </TableCell>
                <TableCell className="text-left p-2">
                    <Badge className="rounded-full">
                    { booking.payment_status }
                    </Badge>
                </TableCell>
                <TableCell className="p-2">
                    <span>{ booking.amount_paid }</span>
                </TableCell>
                </TableRow>))}
            </TableBody>
            </Table>
    </div>
  )
}