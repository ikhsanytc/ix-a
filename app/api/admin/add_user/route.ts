import { NextRequest, NextResponse } from "next/server";
import { RegisterType } from "../../register/route";
import { createClientAdmin } from "@/lib/supabase/server";

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
    const supabase = await createClientAdmin();
    const { error } = await supabase.auth.admin.createUser({
      email,
      user_metadata: {
        username: nama,
        tglLahir,
        email,
        tempatLahir,
        NoHp,
        Ig,
        quotes,
        alamatRumah,
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
      message: "Sukses",
      error: false,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Unexpected Error",
        error: true,
      },
      {
        status: 500,
      }
    );
  }
}
