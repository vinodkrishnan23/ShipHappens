import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// Load MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI ?? "defaultValue";
if (!uri) {
  throw new Error("Environment variable MONGODB_URI is not defined");
}

export async function POST(req: Request) {
  console.log("I am here in purchase route");

  // Parse the request body
  let bookingData;
  try {
    bookingData = await req.json();
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  // Destructure required fields
  const {
    user_email,
    _id,
    bookingContainerCapacity,
    newContainerCapacity,
    bookingAmt,
    source_port_name,
    destination_port_name,
    ship_name,
  } = bookingData;

  // Validate input
  if (
    !_id ||
    bookingContainerCapacity === undefined ||
    newContainerCapacity === undefined ||
    bookingAmt === undefined ||
    user_email === undefined ||
    !source_port_name ||
    !destination_port_name ||
    !ship_name
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  let client: MongoClient | null = null;

  try {
    // Manually connect to MongoDB
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(); // Use the default database specified in the URI
    const session = client.startSession();

    try {
      // Perform transaction
      await session.withTransaction(async () => {
        const inventoryColl = db.collection("inventory");
        const shipBookingColl = db.collection("ship_bookings");

        // Update inventory collection
        const inventoryCollFilter = { _id: new ObjectId(_id) };
        const inventoryCollUpdate = { $set: { container_capacity: newContainerCapacity } };
        const inventoryUpdateResult = await inventoryColl.updateOne(
          inventoryCollFilter,
          inventoryCollUpdate,
          { session }
        );

        if (inventoryUpdateResult.matchedCount === 0) {
          throw new Error("Inventory item not found or already updated");
        }

        // Insert new booking in ship_bookings collection
        await shipBookingColl.insertOne(
          {
            tripId: new ObjectId(_id),
            bookingRoute: {
              srcPortName: source_port_name,
              destPortName: destination_port_name,
            },
            bookedContainers: bookingContainerCapacity,
            bookingAmount: bookingAmt,
            paymentStatus: "SUCCESS",
            shipDetails: {
              shipName: ship_name,
            },
            created_at: new Date().toISOString(),
            userId: user_email
          },
          { session }
        );
      });

      return NextResponse.json({ success: true, message: "Transaction completed successfully" });
    } finally {
      await session.endSession();
    }
  } catch (err: string | any) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Transaction failed", details: err.message }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB client connection closed");
    }
  }
}
