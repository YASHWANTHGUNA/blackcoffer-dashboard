import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    return NextResponse.json({
      message: "MongoDB Connected Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Connection Failed" },
      { status: 500 }
    );
  }
}