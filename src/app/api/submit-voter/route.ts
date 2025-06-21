import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// POST /api/submit-voter
export async function POST(req: Request) {
  try {
    console.log("🔔 API Hit: /api/submit-voter");

    const db = await connectToDatabase();
    console.log("✅ Connected to MongoDB");
    
    // Parse FormData from the request
    const formData = await req.formData();
    const voterId = formData.get('voterId') as string;
    const firstName = formData.get('firstName') as string;
    const middleName = formData.get('middleName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const dob = formData.get('dob') as string;
    const state = formData.get('state') as string;
    const district = formData.get('district') as string;
    const phone = formData.get('phone') as string;

    console.log('Received form data:', { voterId, firstName, lastName, state, district, email, dob, phone });

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
      middleName,
      lastName,
      email,
      dob,
      state,
      district,
      phone,
      faceVerified: false,
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
