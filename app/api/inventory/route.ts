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
  const inventory = await db
    .collection("inventory")
    .find({
      source_port_name: source,
      destination_port_name: destination,
      journey_start_date: date,
      container_capacity: {$gt: 0}
    })
    .toArray();

  return NextResponse.json({ success: true, inventory });
}
