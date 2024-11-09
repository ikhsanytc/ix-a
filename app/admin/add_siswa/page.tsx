import React from "react";
import AddSiswaClient from "./pageClient";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const AddSiswa = async () => {
  const user = await getUser();
  if (user?.email !== "admin@ixa.com") {
    redirect("/admin/login");
  }
  return <AddSiswaClient />;
};

export default AddSiswa;
