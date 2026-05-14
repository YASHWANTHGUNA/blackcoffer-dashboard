import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {

  try {

    const client = await clientPromise;

    const db = client.db("blackcoffer-dashboard");

    const collection = db.collection("insights");

    const regions = await collection.distinct("region");

    return NextResponse.json(regions);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch regions" },
      { status: 500 }
    );
  }
}