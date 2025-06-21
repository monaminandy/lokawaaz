import { NextRequest, NextResponse } from 'next/server';
// import { verifyProof } from '@reclaimprotocol/js-sdk';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

export async function POST(req: NextRequest) {
  try {
    const APP_ID = process.env.APP_ID!;
    const APP_SECRET = process.env.APP_SECRET!;
    const PROVIDER_ID = process.env.PROVIDER_ID!;

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