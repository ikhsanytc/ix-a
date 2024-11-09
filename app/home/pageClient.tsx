"use client";

import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { FC } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  user: User;
};

const HomeClient: FC<Props> = ({ user }) => {
  return (
    <div className="p-4">
      <Navbar />
      <div className="mt-20">
        <h1 className="font-semibold md:text-3xl text-2xl">
          Halo,{" "}
          {user.user_metadata.username
            ? user.user_metadata.username
            : user.email}
        </h1>
        <p className="font-semibold mt-1 md:text-2xl text-xl">
          Selamat datang di web IX A
        </p>
        <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Lihat Seluruh Data Siswa</CardTitle>
              <CardDescription>
                Anda bisa melihat data siswa yg sudah meng-input biodata mereka.
                <br />
                {user.email === "admin@ixa.com"
                  ? "(anda bisa melihat semua data mereka dengan lengkap karena anda admin)"
                  : "(anda bisa melihat data mereka namun tentu ada batasan terkait hal privasi)"}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/datasiswa">Lihat</Link>
              </Button>
            </CardFooter>
          </Card>
          {user.email === "admin@ixa.com" ? (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Tambah Data Siswa (admin)</CardTitle>
                <CardDescription>
                  Anda bisa menambah data siswa sebagai admin!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/admin/add_siswa">Lihat</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
