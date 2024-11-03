import React, { FC } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./sheet";
import { Menu } from "lucide-react";
import { Button } from "./button";
import { ButtonToggleTheme } from "./button-toggle-theme";
import EachUtils from "./eachutils";
import { logout, navbarLists } from "./navbar";

type Props = {
  isLogin: boolean;
};

const NavbarMobile: FC<Props> = ({ isLogin }) => {
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
                      <Button className="w-full shadow-lg">
                        {item.display}
                      </Button>
                      <ButtonToggleTheme sizeButton="icon" />
                    </div>
                  );
                }
                return (
                  <Button className="w-full shadow-lg">{item.display}</Button>
                );
              }}
            />
            {isLogin ? (
              <Button className="w-full" onClick={logout}>
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
