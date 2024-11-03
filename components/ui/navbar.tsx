"use client";
import React, { useEffect, useState } from "react";
import EachUtils from "./eachutils";
import { NavbarType } from "@/types/main";
import Link from "next/link";
import { ButtonToggleTheme } from "./button-toggle-theme";
import { getUser, signOut } from "@/lib/supabase/server";
import NavbarMobile from "./navbar-mobile";

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
  const [isLogin, setIsLogin] = useState(false);
  async function init() {
    const user = await getUser();
    if (user) {
      setIsLogin(true);
    }
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <nav className="fixed inset-x-0 z-50 top-0 w-full shadow bg-opacity-90 backdrop-filter backdrop-blur bg-slate-200 dark:bg-gray-900">
      <div className="h-14 px-4 flex items-center justify-between">
        <h1 className="font-bold text-3xl">IX A</h1>
        <div className="lg:flex gap-7 items-center hidden">
          <EachUtils
            of={navbarLists}
            renderItem={(item) => (
              <Link href={item.path} className="font-medium hover:underline">
                {item.display}
              </Link>
            )}
          />
          {isLogin ? (
            <a
              className="cursor-pointer font-medium hover:underline"
              onClick={logout}
            >
              Logout
            </a>
          ) : null}
          <ButtonToggleTheme sizeButton="icon" />
        </div>
        <NavbarMobile isLogin={isLogin} />
      </div>
    </nav>
  );
};

export default Navbar;
