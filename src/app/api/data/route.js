import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;

    const db = client.db("blackcoffer-dashboard");

    const collection = db.collection("insights");

    // Get URL search params
    const { searchParams } = new URL(request.url);

    // Extract filters
    const topic = searchParams.get("topic");
    const region = searchParams.get("region");
    const country = searchParams.get("country");
    const sector = searchParams.get("sector");
    const endYear = searchParams.get("endYear");
    const source = searchParams.get("source");
    const pestle = searchParams.get("pestle");
    const city = searchParams.get("city");
     const swot = searchParams.get("swot");

    // Build dynamic query
    let query = {};

    if (topic) {
      query.topic = topic;
    }

    if (region) {
      query.region = region;
    }

    if (country) {
      query.country = country;
    }

    if (sector) {
      query.sector = sector;
    }
    if (endYear) {
          query.end_year = endYear;
    }

        if (source) {
                  query.source = source;
      }

              if (pestle) {
           query.pestle = pestle;
          }

                     if (city) {
                        query.city = city;
                    }

            if (swot) {
                 query.swot = swot;
            }

    // Fetch filtered data
    const data = await collection.find(query).toArray();

    return NextResponse.json(data);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch filtered data" },
      { status: 500 }
    );
  }
}