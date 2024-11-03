import React from "react";
import LoginAdminClient from "./pageClient";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const AdminLogin = async () => {
  const user = await getUser();
  if (user) {
    redirect("/home");
  }
  return <LoginAdminClient />;
};

export default AdminLogin;
