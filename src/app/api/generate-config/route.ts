import { NextRequest, NextResponse } from "next/server";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";

const BASE_URL = process.env.BASE_URL; // use your ngrok URL if testing mobile

export async function POST(req: NextRequest) {
  const APP_ID = process.env.APP_ID!;
  const APP_SECRET = process.env.APP_SECRET!;
  const PROVIDER_ID = process.env.PROVIDER_ID!;

  console.log("---- POST /api/your-endpoint called ----");

  console.log("Environment Variables:");
  console.log("BASE_URL:", BASE_URL);
  console.log("APP_ID:", APP_ID);
  console.log("APP_SECRET:", APP_SECRET ? "***hidden***" : "undefined");
  console.log("PROVIDER_ID:", PROVIDER_ID);

  try {
    console.log("Initializing ReclaimProofRequest...");
    const reclaimProofRequest = await ReclaimProofRequest.init(
      APP_ID,
      APP_SECRET,
      PROVIDER_ID
    );

    console.log("Setting app callback URL...");
    reclaimProofRequest.setAppCallbackUrl(BASE_URL + "/api/receive-proofs");

    console.log("Converting request config to JSON...");
    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();

    console.log("Successfully generated reclaimProofRequestConfig.");
    console.log("Returning response to client...");

    return NextResponse.json({ reclaimProofRequestConfig });
  } catch (error) {
    console.error("Error generating request config:", error);
    return NextResponse.json(
      { error: "Failed to generate request config" },
      { status: 500 }
    );
  }
}
