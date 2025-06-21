import { NextRequest, NextResponse } from 'next/server';
// import { verifyProof } from '@reclaimprotocol/js-sdk';

export async function POST(req: NextRequest) {
  try {
    let body: any;
    
    // Check the content type to determine how to parse the body
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      // Parse as JSON
      body = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // Parse as URL-encoded form data
      const formData = await req.formData();
      const urlEncodedData = formData.get('data') as string;
      
      if (urlEncodedData) {
        try {
          // Decode the URL-encoded data
          const decodedData = decodeURIComponent(urlEncodedData);
          body = JSON.parse(decodedData);
        } catch (parseError) {
          console.error('Error parsing URL-encoded data:', parseError);
          return NextResponse.json(
            { success: false, error: 'Invalid URL-encoded data format' },
            { status: 400 }
          );
        }
      } else {
        // Try to parse the entire form data as JSON
        const formDataObj: any = {};
        for (const [key, value] of formData.entries()) {
          formDataObj[key] = value;
        }
        body = formDataObj;
      }
    } else {
      // Try to parse as text first, then as JSON
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch (textError) {
        // If that fails, try URL decoding
        try {
          const decodedText = decodeURIComponent(text);
          body = JSON.parse(decodedText);
        } catch (decodeError) {
          console.error('Error parsing request body:', decodeError);
          return NextResponse.json(
            { success: false, error: 'Unable to parse request body' },
            { status: 400 }
          );
        }
      }
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