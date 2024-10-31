import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email }: { email: string } = await req.json();
  const protocol = req.headers.get("x-forwarded-proto") || "http"; // Menentukan protokol, biasanya 'http' atau 'https'
  const host = req.headers.get("host");
  const baseUrl = `${protocol}://${host}`;
  if (!email) {
    return NextResponse.json(
      {
        message: "Bad request",
        error: true,
      },
      {
        status: 400,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/api/callback`,

        shouldCreateUser: false,
      },
    });
    if (error) {
      return NextResponse.json(
        {
          message: error.message,
          error: true,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json({
      message: "Success",
      error: false,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Unexpected error",
        error: true,
      },
      {
        status: 500,
      }
    );
  }
}
