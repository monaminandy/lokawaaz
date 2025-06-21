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
    
    // Handle the Reclaim protocol format
    // The body contains the proof data directly with properties like:
    // - identifier, claimData, signatures, witnesses, publicData
    const { identifier, claimData, signatures, witnesses, publicData } = body;
    
    // Validate that we received the expected data
    if (!identifier || !claimData || !signatures) {
      return NextResponse.json(
        { success: false, error: 'Invalid proof format - missing required fields' },
        { status: 400 }
      );
    }
    
    // Process the proofs here
    console.log('Processing proofs for identifier:', identifier);
    console.log('Claim data:', claimData);
    console.log('Signatures:', signatures);
    console.log('Witnesses:', witnesses);
    
    // Extract useful information from claimData
    let extractedParams = {};
    try {
      const context = JSON.parse(claimData.context);
      extractedParams = context.extractedParameters || {};
      console.log('Extracted parameters:', extractedParams);
    } catch (error) {
      console.warn('Could not parse context from claimData:', error);
    }
    
    // Store or process the proofs as needed
    // For example, you might want to:
    // - Store them in a database
    // - Verify them against your requirements
    // - Update user verification status
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Proofs received successfully',
      identifier,
      extractedParams,
      timestamp: claimData.timestampS,
      status: 'completed'
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