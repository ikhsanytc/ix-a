import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code!);
  if (error) {
    console.error(error);
  }
  redirect("/home");
}