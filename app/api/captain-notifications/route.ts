import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const user_email = req.headers.get("user_email");

  if (!user_email) {
    return NextResponse.json({ error: "Missing user Email" }, { status: 400 });
  }
  const query = [
    {
      $match: {
        email: user_email
      }
    },
    {
      $lookup: {
        from: "sensor_alerts",
        let: {
          inventory_id: "$inventory_id"
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  "$inventory_id",
                  "$$inventory_id"
                ]
              }
            }
          },
          {
            $sort: {
              timestamp: -1
            }
          },
          {
            $limit: 50
          }
        ],
        as: "sensor_data"
      }
    },
    {
      $unwind: "$sensor_data"
    },
    {
      $project: {
        sensor_data: 1
      }
    }
  ]


  const db = await getDb();

  const alerts = await db.collection("customers").aggregate(query).toArray();;

  return NextResponse.json({ success: true,  alerts });
}