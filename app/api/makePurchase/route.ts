import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";
import { getClient } from "@/app/lib/mongo";

export async function GET(req: Request) {
  const item : any = req.headers.get("item");
  if(null === item){
    return NextResponse.json({ error: "Missing parameters - 2" }, { status: 400 });
  }
  const { searchParams } = new URL(req.url);
  const id = item.id;
  const newContainerCapacity = item.newContainerCapacity;
  const bookingAmt = item.bookingAmt;
  const srcPortCode = item.source_port_code;
  const srcPortName = item.source_port_name;
  const srcCountry = item.source_country;
  const destPortCode = item.destination_port_code;
  const destPortName = item.destination_port_name;
  const destCountry = item.destination_country;
  const routeId = item.route_id;
  const imo_number = item.imo_number;
  const journeyEndDt = item.journey_end_date+"T"+item.destination_arrival_time+":00.000Z";
  const journeyStDt = item.journey_start_date+"T"+item.source_departure_time+":00.000Z";
  const mmsi_number = item.mmsi_number;


  if (!id) {
    return NextResponse.json({ error: "Missing parameters - 2" }, { status: 400 });
  }

  const client = getClient();
  const db = await getDb();
  if( null != client ){
    const session = client.startSession();

    try {

      await session.withTransaction(async () => {

      let inventoryColl = db.collection("inventory");
      let shipBookingColl = db.collection("ship_bookings");

      let inventoryCollFilter = {"_id" : {$oid: id}};
      let inventoryCollUpdate = { $set: {container_capacity: newContainerCapacity}};

      await inventoryColl.updateOne(inventoryCollFilter,inventoryCollUpdate);

      await shipBookingColl.insertOne({
        bookingAmt : bookingAmt,
        bookingRoute: {
          srcPortCode : srcPortCode,
          srcPortName : srcPortName,
          srcCountry : srcCountry,
          destPortCode : destPortCode,
          destPortName : destPortName,
          destCountry : destCountry,
          routeId : routeId
        },
        imo_number : imo_number,
        journeyEndDt : {"$date" : journeyEndDt},
        journeyStDt : {"$date" : journeyStDt},
        mmsi_number : mmsi_number,
        payment_status : "SUCCESS",
        shipDetails : {

        }
      });

      });

    } catch (e) {
      console.log("Error in transaction");
      console.log(e);
    } finally {
      await session.endSession();
    }

  }
  return NextResponse.json({ success: true});
}
