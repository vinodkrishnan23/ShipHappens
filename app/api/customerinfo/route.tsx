import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongo";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the incoming JSON body

    const { email, phone, address, dob, gender } = body;

    // Validate required fields
    if (!email || !phone || !address || !dob || !gender) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate address fields
    const { street, city, state, postal_code, country } = address;
    if (!street || !city || !state || !postal_code || !country) {
      return NextResponse.json(
        { error: "Incomplete address information" },
        { status: 400 }
      );
    }

    // Prepare the customer object for insertion
    const customer = {
      email,
      phone,
      address: {
        street,
        city,
        state,
        postal_code,
        country,
      },
      dob,
      gender,
      created_at: new Date().toISOString(), // Add timestamp
      updated_at: null, // Can be updated later
    };

    const db = await getDb();
    const result = await db.collection("customers").insertOne(customer);

    return NextResponse.json(
      {
        success: true,
        message: "Customer added successfully",
        customer_id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding customer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add customer" },
      { status: 500 }
    );
  }
}
