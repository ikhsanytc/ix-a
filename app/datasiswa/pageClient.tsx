"use client";
import EachUtils from "@/components/ui/eachutils";
import Navbar from "@/components/ui/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabaseClient } from "@/lib/supabase/client";
import { tambahAt } from "@/lib/utils";
import { ProfileData } from "@/types/database.types";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { FC, useEffect, useRef, useState } from "react";

type Props = {
  isAdmin: boolean;
};

const DataSiswaClient: FC<Props> = ({ isAdmin }) => {
  const { toast } = useToast();
  const [siswa, setSiswa] = useState<ProfileData[]>([]);
  const siswaRef = useRef<ProfileData[]>([]);
  async function init() {
    const { error: profileError, data: profileData } = await supabaseClient
      .from("profiles")
      .select()
      .neq("username", "admin")
      .order("username", { ascending: true });
    if (profileError) {
      toast({
        title: "Kesalahan saat mengambil data!",
        description: profileError.message,
        variant: "destructive",
      });
      return;
    }
    setSiswa(profileData);
  }
  const handlePayloadProfiles = (
    payload: RealtimePostgresChangesPayload<ProfileData>
  ) => {
    if (payload.eventType === "INSERT") {
      setSiswa((prev) => [...prev, payload.new]);
    }
    if (payload.eventType === "DELETE" && siswaRef.current) {
      const siswa = siswaRef.current;
      const deletedId = payload.old.id;
      const newSiswa = siswa.filter((item) => item.id !== deletedId);
      setSiswa(newSiswa);
    }
    if (payload.eventType === "UPDATE") {
      init();
    }
  };
  useEffect(() => {
    siswaRef.current = siswa;
  }, [siswa]);
  useEffect(() => {
    init();
    const realtime = supabaseClient
      .channel("profiles")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        handlePayloadProfiles
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(realtime);
    };
  }, []);
  return (
    <div className="px-4">
      <Navbar />
      <h1 className="mt-20 text-3xl font-semibold">Data siswa</h1>
      <p className="text-sm dark:text-gray-500 text-gray-800">
        Anda tidak perlu refresh halaman untuk melihat data terbaru, karena
        halaman ini akan otomatis memperbarui data jika ada perubahan di
        database!
      </p>
      <Tabs className="mt-5" defaultValue="table">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="table">Tabel</TabsTrigger>
          <TabsTrigger value="text">Teks</TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          {siswa.length == 0 ? (
            <Skeleton className="h-96 w-full" />
          ) : (
            <Table className="mt-4">
              <TableCaption className="text-center">
                Seluruh siswa di kelas ada 26 siswa
              </TableCaption>
              <TableHeader>
                {isAdmin ? (
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tanggal/Tempat Lahir</TableHead>
                    <TableHead>Alamat Rumah</TableHead>
                    <TableHead>No Hp</TableHead>
                    <TableHead>Ig</TableHead>
                    <TableHead>Quotes</TableHead>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>Alamat Rumah</TableHead>
                    <TableHead>Ig</TableHead>
                    <TableHead>Quotes</TableHead>
                  </TableRow>
                )}
              </TableHeader>
              <TableBody>
                {isAdmin ? (
                  <EachUtils
                    of={siswa}
                    renderItem={(item, idx) => (
                      <TableRow>
                        <TableCell>{++idx}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          {item.tempatlahir}, {item.tgllahir}
                        </TableCell>
                        <TableCell>{item.alamatrumah}</TableCell>
                        <TableCell>{item.nohp}</TableCell>
                        <TableCell>
                          {item.ig === "" ? "Tidak ada" : tambahAt(item.ig!)}
                        </TableCell>
                        <TableCell>{item.quotes}</TableCell>
                      </TableRow>
                    )}
                  />
                ) : (
                  <EachUtils
                    of={siswa}
                    renderItem={(item, idx) => (
                      <TableRow>
                        <TableCell>{++idx}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.alamatrumah}</TableCell>
                        <TableCell>
                          {item.ig === "" ? "Tidak ada" : tambahAt(item.ig!)}
                        </TableCell>
                        <TableCell>{item.quotes}</TableCell>
                      </TableRow>
                    )}
                  />
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={isAdmin ? 7 : 4}>Total Data</TableCell>
                  <TableCell className="text-right">
                    {siswa.length} Siswa
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </TabsContent>
        <TabsContent value="text">
          <h1 className="text-2xl font-semibold mb-3">Biodata</h1>
          <ol className="list-decimal text-xl pl-5 font-thin">
            <EachUtils
              of={siswa}
              renderItem={(item) => {
                return (
                  <li className="mb-3">
                    <p>Nama : {item.username}</p>
                    {isAdmin && <p>Email : {item.email}</p>}
                    {isAdmin && (
                      <p>
                        Tempat/Tanggal Lahir : {item.tempatlahir},{" "}
                        {item.tgllahir}
                      </p>
                    )}
                    <p>Alamat Rumah : {item.alamatrumah}</p>
                    {isAdmin && <p>No Hp : {item.nohp}</p>}
                    <p>
                      Ig : {item.ig === "" ? "Tidak ada" : tambahAt(item.ig!)}
                    </p>
                    <p>Quotes : {item.quotes}</p>
                  </li>
                );
              }}
            />
          </ol>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataSiswaClient;
