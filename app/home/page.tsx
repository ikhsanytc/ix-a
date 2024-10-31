import React from "react";
import HomeClient from "./pageClient";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/register");
  }
  return <HomeClient user={user} />;
};

export default Home;
