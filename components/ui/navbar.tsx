"use client";
import React, { useEffect, useState } from "react";
import EachUtils from "./eachutils";
import { NavbarType } from "@/types/main";
import Link from "next/link";
import { ButtonToggleTheme } from "./button-toggle-theme";
import { getUser, signOut } from "@/lib/supabase/server";
import NavbarMobile from "./navbar-mobile";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";

export const navbarLists: NavbarType[] = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "About",
    path: "/",
  },
];
export async function logout() {
  await signOut();
}

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  async function init() {
    const user = await getUser();
    if (user) {
      setIsLogin(true);
    }
  }
  function handleLogoutClick() {
    setShowLogout(!showLogout);
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <nav className="fixed inset-x-0 z-50 top-0 w-full shadow bg-opacity-90 backdrop-filter backdrop-blur bg-slate-200 dark:bg-gray-900">
        <div className="h-14 px-4 flex items-center justify-between">
          <h1 className="font-bold text-3xl">IX A</h1>
          <div className="lg:flex gap-7 items-center hidden">
            <EachUtils
              of={navbarLists}
              renderItem={(item) => {
                if (item.display === "About") {
                  return (
                    <Dialog>
                      <DialogTrigger asChild>
                        <a className="cursor-pointer hover:underline font-medium">
                          About
                        </a>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>About</DialogTitle>
                        <p>
                          Web ini digunakan untuk pendaftaran biodata siswa
                          kelas IX A (9A).
                        </p>
                        <DialogClose asChild>
                          <Button>Oh oke</Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  );
                }
                return (
                  <Link
                    href={item.path}
                    className="font-medium hover:underline"
                  >
                    {item.display}
                  </Link>
                );
              }}
            />
            {isLogin ? (
              <a
                className="cursor-pointer font-medium hover:underline"
                onClick={handleLogoutClick}
              >
                Logout
              </a>
            ) : null}
            <ButtonToggleTheme sizeButton="icon" />
          </div>
          <NavbarMobile
            handleLogoutClick={handleLogoutClick}
            isLogin={isLogin}
          />
        </div>
      </nav>
      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent>
          <DialogTitle>Logout</DialogTitle>
          <div>
            <p>
              Kamu yakin ingin <span className="text-red-600">keluar</span>?
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive" onClick={logout}>
                Iya
              </Button>
            </DialogClose>
            <DialogClose className="mb-2" asChild>
              <Button>Ga jadi</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
