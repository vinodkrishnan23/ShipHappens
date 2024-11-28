import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination");

  if (!destination) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const db = await getDb();
  const suggestions = await db
    .collection("inventory")
    .aggregate([
      {
        $search: {
          index: "invectory_src",
          compound: {
            should: [
              {
                autocomplete: {
                  query: destination,
                  path: "destination_port_code"
                }
              },
              {
                autocomplete: {
                  query: destination,
                  path: "destination_port_name"
                }
              }
            ],
            minimumShouldMatch: 1
          }
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          destination_port: {
            $concat: [
              "$destination_port_code",
              " : ",
              "$destination_port_name"
            ]
          },
          _id: 0
        }
      },
      {
        $group: {
          _id: "$destination_port"
        }
      }
    ])
    .toArray();

  return NextResponse.json({ success: true, suggestions });
}
