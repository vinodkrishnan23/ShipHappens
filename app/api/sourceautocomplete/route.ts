import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source");

  if (!source) {
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
                  query: source,
                  path: "source_port_code"
                }
              },
              {
                autocomplete: {
                  query: source,
                  path: "source_port_name"
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
          source_port: {
            $concat: [
              "$source_port_code",
              " : ",
              "$source_port_name"
            ]
          },
          _id: 0
        }
      },
      {
        $group: {
          _id: "$source_port"
        }
      }
    ])
    .toArray();

  return NextResponse.json({ success: true, suggestions });
}
