import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {

  try {

    const client = await clientPromise;

    const db = client.db("blackcoffer-dashboard");

    const collection = db.collection("insights");

    const topics = await collection.distinct("topic");

    return NextResponse.json(topics);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}