import React from "react";
import HomeClient from "./pageClient";
import { getUser } from "@/lib/supabase/server";

const Home = async () => {
  const user = await getUser();
  if (!user) {
    return;
  }
  return <HomeClient user={user} />;
};

export default Home;
