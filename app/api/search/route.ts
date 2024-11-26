import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  if (!source || !destination || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const db = await getDb();
  const routes = await db
    .collection("searoutes")
    .find({ sourcePort: source, destinationPort: destination, date })
    .toArray();

  return NextResponse.json({ success: true, routes });
}
