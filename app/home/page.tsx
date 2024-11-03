"use client";

import Navbar from "@/components/ui/navbar";
import { FC } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="p-4">
      <Navbar />
      <div className="mt-20">
        <h1 className="font-semibold text-3xl">Halo</h1>
        <p className="font-semibold mt-1 text-2xl">
          Selamat datang di web IX A
        </p>
        <div className="grid grid-cols-1 mt-5 md:grid-cols-2">
          <div className="bg-slate-200 dark:bg-gray-900 p-3 shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold">Lihat seluruh data siswa</h1>
            <p>
              Anda bisa melihat data siswa yg sudah meng-input biodata mereka.
            </p>
            <p>
              (anda bisa melihat data mereka namun tentu ada batasan terkait hal
              privasi)
            </p>
            <Button className="mt-3" asChild>
              <Link href="/datasiswa">Lihat</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
