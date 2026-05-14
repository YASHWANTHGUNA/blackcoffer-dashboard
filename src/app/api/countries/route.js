import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {

  try {

    const client = await clientPromise;

    const db = client.db("blackcoffer-dashboard");

    const collection = db.collection("insights");

    const countries = await collection.distinct("country");

    return NextResponse.json(countries);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}