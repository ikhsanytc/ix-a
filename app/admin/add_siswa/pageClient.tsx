"use client";
import { formRegister } from "@/app/register/pageClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { fetchAPI } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const AddSiswaClient = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formRegister>>({
    resolver: zodResolver(formRegister),
    defaultValues: {
      alamatRumah: "",
      email: "",
      Ig: "",
      nama: "",
      NoHp: "",
      quotes: "",
      tempatLahir: "",
      tglLahir: "",
    },
  });
  const submitCuy: SubmitHandler<z.infer<typeof formRegister>> = async (
    dataVal
  ) => {
    setIsLoading(true);
    const data = await fetchAPI("admin/add_user", {
      data: dataVal,
      method: "POST",
    });
    if (data.error) {
      setIsLoading(false);
      toast({
        title: "Kesalahan saat menambah user!",
        description: data.message,
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    form.setValue("nama", "");
    form.setValue("email", "");
    form.setValue("tglLahir", "");
    form.setValue("tempatLahir", "");
    form.setValue("NoHp", "");
    form.setValue("Ig", "");
    form.setValue("quotes", "");
    form.setValue("alamatRumah", "");
    toast({
      title: "Sukses menambah user",
      action: (
        <ToastAction altText="Lihat user" asChild>
          <Link href="/datasiswa">Lihat</Link>
        </ToastAction>
      ),
    });
  };
  return (
    <div className="px-4">
      <Navbar />
      <Card className="mt-20 w-full lg:w-1/2 mx-auto shadow-lg relative mb-5">
        {isLoading ? (
          <div className="w-full h-full absolute bg-slate-200 rounded-lg backdrop-filter backdrop-blur bg-opacity-20 flex justify-center items-center">
            <h1 className="font-semibold text-xl">Tunggu Sebentar...</h1>
          </div>
        ) : null}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitCuy)}
            className={isLoading ? "pointer-events-none" : ""}
          >
            <CardHeader>
              <CardTitle>Menambahkan Siswa Sesuka Hati Admin.</CardTitle>
              <CardDescription>Tambah user!!!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email..." type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tglLahir"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">Tanggal Lahir</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        type="date"
                        className="w-full"
                        placeholder="Tanggal Lahir..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tempatLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input placeholder="Tempat Lahir..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alamatRumah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Alamat Rumah</FormLabel>
                    <FormControl>
                      <Input placeholder="Alamat Rumah..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="NoHp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">No Hp</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="No Hp..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Ig"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Ig (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ig..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Quotes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Qoutes..." {...field}></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddSiswaClient;
