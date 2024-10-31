import React from "react";
import RegisterClient from "./pageClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Register = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/home");
  }
  console.log(user);
  return <RegisterClient />;
};

export default Register;
