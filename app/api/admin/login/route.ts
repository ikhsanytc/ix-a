import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type ParamsFromJson = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const { email, password }: ParamsFromJson = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Bad request.",
        error: true,
      },
      {
        status: 400,
      }
    );
  }
  try {
    const supabase = await createClient();
    if (email === "admin@ixa.com") {
      const { error: AuthError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (AuthError) {
        return NextResponse.json(
          {
            message: AuthError.message,
            error: true,
          },
          {
            status: 500,
          }
        );
      }
      return NextResponse.json({
        message: "Sukes",
        error: false,
      });
    }
    return NextResponse.json(
      {
        message: "Email admin bukan itu!",
        error: true,
      },
      {
        status: 500,
      }
    );
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
