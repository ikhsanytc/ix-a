"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fetchAPI } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formRegister = z.object({
  nama: z
    .string()
    .min(4, "Nama Lengkap minimal 4 huruf!")
    .max(255, "Nama Lengkap maximal 255 huruf!"),
  tglLahir: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Tanggal Lahir tidak valid",
  }),
  email: z
    .string()
    .min(5, "Email minimal 5 huruf!")
    .max(255, "Email maximal 255 huruf!"),
  tempatLahir: z
    .string()
    .min(4, "Tempat Lahir minimal 4 huruf!")
    .max(255, "Tempat Lahir maximal 255 huruf!"),
  alamatRumah: z
    .string()
    .min(5, "Alamat Rumah minimal 5 huruf!")
    .max(255, "Alamat Rumah maximal 255 huruf!"),
  NoHp: z
    .string()
    .min(6, "No Hp minimal 6 karakter!")
    .max(255, "No Hp maximal 255 karakter!"),
  Ig: z.string().optional(),
  quotes: z.string().min(10, "Quotes minimal 10 huruf!"),
});

const RegisterClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formRegister>>({
    resolver: zodResolver(formRegister),
    defaultValues: {
      email: "",
      Ig: "",
      nama: "",
      NoHp: "",
      quotes: "",
      tempatLahir: "",
      tglLahir: "",
      alamatRumah: "",
    },
  });
  const submit: SubmitHandler<z.infer<typeof formRegister>> = async (
    dataVal
  ) => {
    setIsLoading(true);
    const data = await fetchAPI("register", {
      method: "POST",
      data: dataVal,
    });
    if (data.error) {
      setIsLoading(false);
      toast({
        title: "Kesalahan saat register",
        description: data.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Sukses",
      description: "Cek email mu, saya mengirim sesuatu untuk verifikasi!",
    });
    form.setValue("nama", "");
    form.setValue("email", "");
    form.setValue("tglLahir", "");
    form.setValue("tempatLahir", "");
    form.setValue("NoHp", "");
    form.setValue("Ig", "");
    form.setValue("quotes", "");
    form.setValue("alamatRumah", "");
    setIsLoading(false);
  };
  return (
    <div className="px-4 flex">
      <Card className="w-full mt-5 mb-5 lg:w-1/2 mx-auto relative">
        {isLoading ? (
          <div className="w-full h-full absolute bg-slate-200 rounded-lg backdrop-filter backdrop-blur bg-opacity-20 flex justify-center items-center">
            <h1 className="font-semibold text-xl">Tunggu Sebentar...</h1>
          </div>
        ) : null}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className={isLoading ? "pointer-events-none" : ""}
          >
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Register biodata kalian!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Nama Lengkap</FormLabel>
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
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Register
              </Button>
              <p>
                Punya akun?{" "}
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterClient;
