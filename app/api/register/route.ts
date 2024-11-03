import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export type RegisterType = {
  nama: string;
  tglLahir: string;
  email: string;
  tempatLahir: string;
  NoHp: string;
  Ig: string;
  quotes: string;
  alamatRumah: string;
};

export async function POST(req: NextRequest) {
  const {
    nama,
    tglLahir,
    email,
    tempatLahir,
    NoHp,
    Ig,
    quotes,
    alamatRumah,
  }: RegisterType = await req.json();
  if (
    !nama ||
    !tglLahir ||
    !email ||
    !tempatLahir ||
    !NoHp ||
    !quotes ||
    !alamatRumah
  ) {
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
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback`,
        data: {
          username: nama,
          tglLahir,
          email,
          tempatLahir,
          NoHp,
          Ig,
          quotes,
          alamatRumah,
        },
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
