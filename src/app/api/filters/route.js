import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("blackcoffer-dashboard");

    const collection = db.collection("insights");

    // Get unique values
    const topics = await collection.distinct("topic");
    const regions = await collection.distinct("region");
    const countries = await collection.distinct("country");
    const sectors = await collection.distinct("sector");
    const endYears = await collection.distinct("end_year");
    const sources = await collection.distinct("source");
    const pestles = await collection.distinct("pestle");
    const cities = await collection.distinct("city");
    const swots = await collection.distinct("swot");

    return NextResponse.json({
       topics,
         regions,
        countries,
       sectors,
         endYears,
          sources,
         pestles,
           cities,
             swots,
  });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch filters" },
      { status: 500 }
    );
  }
}