import { NextRequest, NextResponse } from "next/server";
import { createClient, getUser } from "./lib/supabase/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = await createClient();
  const includeURL = ["/home", "/datasiswa", "/admin/add_siswa"];
  const { pathname } = req.nextUrl;
  if (!includeURL.includes(pathname)) {
    return res;
  }
  const user = await getUser();
  if (!user) {
    const redirect = new URL("/login", req.url);
    return NextResponse.redirect(redirect);
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"], // Menentukan URL yang akan menggunakan middleware
};
