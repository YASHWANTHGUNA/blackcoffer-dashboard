import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {

  try {

    const client = await clientPromise;

    const db = client.db("blackcoffer-dashboard");

    const collection = db.collection("insights");

    const sectors = await collection.distinct("sector");

    return NextResponse.json(sectors);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch sectors" },
      { status: 500 }
    );
  }
}