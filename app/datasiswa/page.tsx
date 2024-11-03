"use client";
import EachUtils from "@/components/ui/eachutils";
import Navbar from "@/components/ui/navbar";
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
import { useToast } from "@/hooks/use-toast";
import { supabaseClient } from "@/lib/supabase/client";
import { ProfileData } from "@/types/database.types";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

const DataSiswa = () => {
  const { toast } = useToast();
  const [siswa, setSiswa] = useState<ProfileData[]>([]);
  const siswaRef = useRef<ProfileData[]>([]);
  async function init() {
    const { error: profileError, data: profileData } = await supabaseClient
      .from("profiles")
      .select()
      .neq("username", "admin");
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
      <Table className="mt-4">
        <TableCaption className="text-center">
          Seluruh siswa di kelas ada 26 siswa
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Alamat Rumah</TableHead>
            <TableHead>Ig</TableHead>
            <TableHead>Quotes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EachUtils
            of={siswa}
            renderItem={(item, idx) => (
              <TableRow>
                <TableCell>{++idx}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.alamatrumah}</TableCell>
                <TableCell>{item.ig === "" ? "Tidak ada" : item.ig}</TableCell>
                <TableCell>{item.quotes}</TableCell>
              </TableRow>
            )}
          />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Data</TableCell>
            <TableCell className="text-right">{siswa.length} Siswa</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataSiswa;
