import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const user_email = req.headers.get("user_email");

  if (!user_email) {
    return NextResponse.json({ error: "Missing user Email" }, { status: 400 });
  }
  const query = [
    {
      $match:
        {
          email: user_email
        }
    },
    {
      $lookup:
        {
          from: "inventory",
          localField: "inventory_id",
          foreignField: "_id",
          as: "inventory"
        }
    },
    {
      $unwind: "$inventory"
    },
    {
      $lookup:
        {
          from: "sensor_alerts",
          localField: "inventory.imo_number",
          foreignField: "imo_number",
          as: "alerts"
        }
    },
    {
      $project:
        {
          alerts: 1
        }
    },
    {
      $unwind: "$alerts"
    }
  ];
  const db = await getDb();

  const alerts = await db.collection("customers").aggregate(query).toArray();;

  return NextResponse.json({ success: true,  alerts });
}