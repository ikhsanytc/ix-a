import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const protocol = req.headers.get("x-forwarded-proto") || "http"; // Menentukan protokol, biasanya 'http' atau 'https'
  const host = req.headers.get("host");
  const baseUrl = `${protocol}://${host}`;
  return NextResponse.json({
    baseUrl,
  });
}
