"use client";

import Navbar from "@/components/ui/navbar";
import { FC } from "react";
import { User } from "@supabase/supabase-js";

type Props = {
  user: User;
};

const HomeClient: FC<Props> = ({ user }) => {
  return (
    <div className="p-4">
      <Navbar />
      <div className="mt-20">
        <h1 className="font-semibold text-4xl">
          Halo, {user.user_metadata.username}
        </h1>
        <p className="font-semibold mt-1 text-2xl">
          Selamat datang di web IX A
        </p>
      </div>
    </div>
  );
};

export default HomeClient;
