import { NextRequest, NextResponse } from 'next/server';
// import { verifyProof } from '@reclaimprotocol/js-sdk';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

export async function POST(req: NextRequest) {
  try {
    // Get the raw body as text first
    const rawBody = await req.text();
    
    console.log('Raw request body:', rawBody);
    
    let body;
    
    // Check if the body is URL-encoded
    if (rawBody.includes('%')) {
      // Decode URL-encoded data
      const decodedBody = decodeURIComponent(rawBody);
      console.log('Decoded body:', decodedBody);
      
      // Parse the decoded JSON
      body = JSON.parse(decodedBody);
    } else {
      // Parse as regular JSON
      body = JSON.parse(rawBody);
    }
    
    console.log('Received proofs from Reclaim:', body);
    
    // Handle the incoming proofs data
    // The body should contain the verification proofs from Reclaim
    const { proofs, sessionId, status } = body;
    
    // Validate that we received the expected data
    if (!proofs) {
      return NextResponse.json(
        { success: false, error: 'No proofs received' },
        { status: 400 }
      );
    }
    
    // Process the proofs here
    // You can add your verification logic here
    console.log('Processing proofs for session:', sessionId);
    console.log('Proofs data:', proofs);
    
    // Store or process the proofs as needed
    // For example, you might want to:
    // - Store them in a database
    // - Verify them against your requirements
    // - Update user verification status
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Proofs received successfully',
      sessionId,
      status 
    });
    
  } catch (error: any) {
    console.error('Error processing proofs:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Also handle GET requests for health checks
export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    success: true, 
    message: 'Proofs endpoint is active' 
  });
}