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

//Do a POST Funtion
export async function POST(req: Request) {
  const { email, phone, address, dob, gender, full_name } = await req.json();
  console.log("In Post Request");
  if (!email) {
    return NextResponse.json({ error: "Missing user Email" }, { status: 400 });
  }

  const db = await getDb();
  const query = { email: email };
  const update = {
    $set: {
      phone: phone,
      address: address,
      dob: dob,
      gender: gender,
      full_name: full_name,
      updated_at: new Date().toISOString(),
    },
  };

  const result = await db.collection("customers").updateOne(query, update, { upsert: true });

  if (result.matchedCount === 0 && result.upsertedCount === 0) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Profile updated successfully" });
}
