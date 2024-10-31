"use client";
import React, { useEffect, useState } from "react";
import EachUtils from "./eachutils";
import { NavbarType } from "@/type/main";
import Link from "next/link";
import { ButtonToggleTheme } from "./button-toggle-theme";
import { getUser, signOut } from "@/lib/supabase/server";

export const navbarLists: NavbarType[] = [
  {
    display: "Home",
    path: "/",
  },
];

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
  async function logout() {
    await signOut();
  }
  return (
    <nav className="fixed inset-x-0 z-50 top-0 w-full bg-slate-200 dark:bg-gray-900">
      <div className="h-14 px-4 flex items-center justify-between">
        <h1 className="font-bold text-3xl">IX A</h1>
        <div className="flex gap-7 items-center">
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
          <ButtonToggleTheme />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
