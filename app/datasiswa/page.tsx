import React from "react";
import DataSiswaClient from "./pageClient";
import { getUser } from "@/lib/supabase/server";

const DataSiswa = async () => {
  const user = await getUser();
  if (!user) {
    return;
  }
  return (
    <DataSiswaClient isAdmin={user?.email === "admin@ixa.com" ? true : false} />
  );
};

export default DataSiswa;
