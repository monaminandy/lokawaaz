import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { voterId, candidateId, district } = await req.json();

    const  db  = await connectToDatabase();

    // Step 1: Find candidate
    const candidate = await db.collection("candidates").findOne({
      canid: candidateId,
      district: district,
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, message: "Candidate not found." },
        { status: 404 }
      );
    }

    // Step 2: Check if voter has already voted
    const voter = await db.collection("voters").findOne({ voterId });

    if (!voter) {
      return NextResponse.json(
        { success: false, message: "Voter not found." },
        { status: 404 }
      );
    }

    if (voter.hasVoted) {
      return NextResponse.json(
        { success: false, message: "You have already voted." },
        { status: 400 }
      );
    }

    // Step 3: Record vote
    await db.collection("votes").updateOne(
      { candidateId: candidateId, district: district },
      { $inc: { voteCount: 1 } },
      { upsert: true }
    );

    // Step 4: Update voter hasVoted = true
    await db.collection("voters").updateOne(
      { voterId },
      { $set: { hasVoted: true } }
    );

    return NextResponse.json({ success: true, message: "Vote recorded." });
  } catch (error) {
    console.error("Vote API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
