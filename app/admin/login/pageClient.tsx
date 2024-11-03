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
import { useToast } from "@/hooks/use-toast";
import { fetchAPI } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginScheme = z.object({
  email: z
    .string()
    .min(5, "Email minimal 5 karakter")
    .max(255, "Email maximal 255 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

const LoginAdminClient = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submit: SubmitHandler<z.infer<typeof loginScheme>> = async (
    dataVal
  ) => {
    setIsLoading(true);
    const data = await fetchAPI("admin/login", {
      method: "POST",
      data: dataVal,
    });
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
      description: "Selamat datang!",
    });
    router.push("/home");
  };
  return (
    <div className="flex justify-center items-center px-4 min-h-screen">
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
              <CardTitle>Login Sebagai Admin</CardTitle>
              <CardDescription>
                Anda bisa menjadi admin di web ini dengan login (ytta)
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex gap-4 flex-col">
              <Button className="w-full" type="submit">
                Submit
              </Button>
              <Button className="w-full" variant="secondary" asChild>
                <Link href="/login">Kembali</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginAdminClient;
