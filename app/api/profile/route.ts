import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const user_email = req.headers.get("user_email");

  if (!user_email) {
    return NextResponse.json({ error: "Missing user Email" }, { status: 400 });
  }
  const query = { email : user_email };
  const db = await getDb();
  console.log(query) 
  const profile_info = await db.collection("customers").findOne(query);

  return NextResponse.json({ success: true,  profile_info });
}