import { NextRequest, NextResponse } from "next/server";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";

const BASE_URL = process.env.BASE_URL; // use your ngrok URL if testing mobile

export async function POST(req: NextRequest) {
  const APP_ID = process.env.APP_ID!;
  const APP_SECRET = process.env.APP_SECRET!;
  const PROVIDER_ID = process.env.PROVIDER_ID!;

  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(
      APP_ID,
      APP_SECRET,
      PROVIDER_ID
    );
    reclaimProofRequest.setAppCallbackUrl(BASE_URL + "/api/receive-proofs");

    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();

    return NextResponse.json({ reclaimProofRequestConfig });
  } catch (error) {
    console.error("Error generating request config:", error);
    return NextResponse.json(
      { error: "Failed to generate request config" },
      { status: 500 }
    );
  }
}
