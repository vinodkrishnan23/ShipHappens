import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const user_email = req.headers.get("user_email");

  if (!user_email) {
    return NextResponse.json({ error: "Missing user Email" }, { status: 400 });
  }
  const query = { userId : user_email };
  const db = await getDb();
  const options = {
    limit:10
  }

  const bookings = await db.collection("ship_bookings").find(query,options).toArray();

  return NextResponse.json({ success: true,  bookings });
}