import React, { FC } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./sheet";
import { Menu } from "lucide-react";
import { Button } from "./button";
import { ButtonToggleTheme } from "./button-toggle-theme";
import EachUtils from "./eachutils";
import { navbarLists } from "./navbar";
import Link from "next/link";

type Props = {
  isLogin: boolean;
  handleLogoutClick: () => void;
  handleAboutClick: () => void;
};

const NavbarMobile: FC<Props> = ({
  isLogin,
  handleLogoutClick,
  handleAboutClick,
}) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="text-center text-2xl">Menu</SheetTitle>
          <div className="w-full mt-4 flex gap-4 flex-col">
            <EachUtils
              of={navbarLists}
              renderItem={(item, index) => {
                if (index === 0) {
                  return (
                    <div className="flex gap-2 items-center">
                      <Button className="w-full shadow-lg" asChild>
                        <Link href={item.path}>{item.display}</Link>
                      </Button>
                      <ButtonToggleTheme sizeButton="icon" />
                    </div>
                  );
                }
                if (item.display === "About") {
                  return (
                    <Button
                      className="w-full shadow-lg"
                      onClick={handleAboutClick}
                    >
                      {item.display}
                    </Button>
                  );
                }
                return (
                  <Button className="w-full shadow-lg" asChild>
                    <Link href={item.path}>{item.display}</Link>
                  </Button>
                );
              }}
            />
            {isLogin ? (
              <Button className="w-full" onClick={handleLogoutClick}>
                Logout
              </Button>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarMobile;
