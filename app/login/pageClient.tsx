"use client";
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
import { useToast } from "@/hooks/use-toast";
import { ResponseAPI } from "@/lib/supabase/server";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginScheme = z.object({
  email: z
    .string()
    .min(5, "Email minimal 5 huruf!")
    .max(255, "Email maximal 255 huruf"),
});

const LoginClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
    },
  });
  const submit: SubmitHandler<z.infer<typeof loginScheme>> = async (
    dataVal
  ) => {
    setIsLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataVal),
    });
    const data = (await res.json()) as ResponseAPI;
    if (data.error) {
      setIsLoading(false);
      toast({
        title: "Kesalahan saat login",
        description: data.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Sukses",
      description: "Cek email mu, saya mengirim sesuatu untuk verifikasi!",
    });
  };
  return (
    <div className="flex px-4 justify-center items-center min-h-screen">
      <Navbar />
      <Card className="w-full mt-20 lg:w-1/2 relative">
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
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Masuk ke akun kalian lewat sini!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Submit</Button>
              <Button type="button" asChild variant="secondary">
                <Link href="/register">Register</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginClient;
