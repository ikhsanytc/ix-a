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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fetchAPI } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical } from "lucide-react";
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
    const data = await fetchAPI("login", {
      method: "POST",
      data: dataVal,
    });
    if (data.error) {
      setIsLoading(false);
      if (data.message === "Signups not allowed for otp") {
        toast({
          title: "Kesalahan saat login",
          description:
            "Email yang anda tulis tidak ada dalam database! register dulu sana!",
          variant: "destructive",
        });
        return;
      }
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
    form.setValue("email", "");
    setIsLoading(false);
  };
  return (
    <div className="flex px-4 justify-center items-center min-h-screen">
      <Card className="w-full lg:w-1/2 relative">
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
            <CardFooter className="flex flex-col gap-4">
              <div className="flex w-full gap-2">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/login">Login sebagai admin</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p>
                Tidak punya akun?{" "}
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginClient;
