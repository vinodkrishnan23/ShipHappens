import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const user_email = req.headers.get("user_email");

  if (!user_email) {
    return NextResponse.json({ error: "Missing user Email" }, { status: 400 });
  }
  const query = { user_id : user_email };
  const db = await getDb();
  const options = {
    limit:10
  }
  const bookings = await db.collection("bookings").find(query,options).toArray();
  const test=await db.collection("bookings").findOne()
  console.log(test)

  return NextResponse.json({ success: true,  bookings });
}