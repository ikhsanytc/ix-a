import React from "react";
import LoginClient from "./pageClient";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Login = async () => {
  const user = await getUser();
  if (user) {
    redirect("/home");
  }
  return <LoginClient />;
};

export default Login;
