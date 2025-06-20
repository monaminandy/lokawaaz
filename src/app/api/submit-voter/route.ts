import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// POST /api/submit-voter
export async function POST(req: Request) {
  try {
    console.log("🔔 API Hit: /api/submit-voter");

    const db = await connectToDatabase();
    console.log("✅ Connected to MongoDB");

    const data = await req.json();
    const { voterId, firstName, lastName, state, district, faceVerified } = data;

    if (!voterId || !firstName || !lastName || !state || !district) {
      console.warn("❗ Missing required fields:", { voterId, firstName, lastName, state, district });
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Check if voter already exists
    const existing = await db.collection('voters').findOne({ voterId });

    if (existing) {
      if (existing.hasVoted === true) {
        return NextResponse.json({
          message: '⚠️ Voter has already voted',
          voter: existing,
        }, { status: 400 });
      } else {
        return NextResponse.json({
          message: '⚠️ Voter already registered but has not voted',
          voter: existing,
        }, { status: 200 });
      }
    }

    // Insert new voter
    const result = await db.collection('voters').insertOne({
      voterId,
      firstName,
      lastName,
      state,
      district,
      faceVerified: !!faceVerified,
      hasVoted: false,  // ✅ default is false
      createdAt: new Date(),
    });

    console.log("✅ Voter inserted with ID:", result.insertedId);

    return NextResponse.json({
      message: '✅ Voter successfully submitted',
      id: result.insertedId,
    });

  } catch (error: any) {
    console.error("❌ Server Error:", error.message || error);
    return NextResponse.json({
      message: 'Server error',
      error: error.message || error,
    }, { status: 500 });
  }
}
