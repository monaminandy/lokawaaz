import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { district } = await req.json();

  const db = await connectToDatabase();
  const candidates = await db
    .collection("candidates")
    .find({ district: { $regex: new RegExp(district, "i") } })
    .toArray();

  return NextResponse.json({ candidates });
}
