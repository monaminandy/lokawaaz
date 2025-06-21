import { NextRequest, NextResponse } from 'next/server';
// import { verifyProof } from '@reclaimprotocol/js-sdk';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

// export async function POST(req: NextRequest) {
//   try {
//     const rawBody = await req.text();
//     const decodedBody = decodeURIComponent(rawBody);
//     const proof = JSON.parse(decodedBody);

//     const result = await verifyProof(proof);

//     if (!result) {
//       return NextResponse.json({ error: 'Invalid proofs data' }, { status: 400 });
//     }

//     console.log('✅ Received proofs:', proof);

//     // You can save proofs to database here (optional)

//     return NextResponse.json({ status: 'success' });
//   } catch (error) {
//     console.error('Error verifying proofs:', error);
//     return NextResponse.json({ error: 'Failed to verify proofs' }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const { APP_ID, APP_SECRET, PROVIDER_ID } = {
        APP_ID: '0xCe0ef89e5871deCADA6A3792B652DbB51E3c6F20',
        APP_SECRET: '0xffa89242afcb972b878b5c79ee2f00bdfbe33e35d95550c6fae04ecde520a101',
        PROVIDER_ID: '5e1302ca-a3dd-4ef8-bc25-24fcc97dc800'
    }

    // Initialize ReclaimProofRequest
    const reclaimProofRequest = await ReclaimProofRequest.init(
      APP_ID,
      APP_SECRET,
      PROVIDER_ID
    );

    // Trigger the verification flow
    await reclaimProofRequest.triggerReclaimFlow();

    // Start session and listen for proofs
    const proofs = await new Promise((resolve, reject) => {
      reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          console.log('Verification successful:', proofs);
          resolve(proofs);
        },
        onError: (error) => {
          console.error('Verification failed', error);
          reject(error);
        },
      });
    });

    // Respond with proofs
    return NextResponse.json({ success: true, proofs });
  } catch (error: any) {
    console.error('Error in verification:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}