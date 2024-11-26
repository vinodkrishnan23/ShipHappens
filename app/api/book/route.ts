import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const { routeId, userId, containerCount } = await req.json();

  if (!routeId || !userId || !containerCount) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const db = await getDb();
  const route = await db.collection("searoutes").findOne({ _id: new ObjectId(routeId) });

  if (!route || route.availableContainers < containerCount) {
    return NextResponse.json({ error: "Insufficient container availability" }, { status: 400 });
  }

  await db.collection("searoutes").updateOne(
    { _id: new ObjectId(routeId) },
    { $inc: { availableContainers: -containerCount } }
  );

  const booking = await db.collection("bookings").insertOne({
    userId,
    routeId,
    containerCount,
    status: "confirmed",
    bookingDate: new Date(),
  });

  return NextResponse.json({ success: true, bookingId: booking.insertedId });
}
