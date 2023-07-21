import React, { FC, ReactElement, useEffect } from "react";

import Footer from "./Footer";
import ModalBase from "../Modal/ModalBase";
import { menuState } from "./store";
import { menus } from "./menu";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

interface ILayoutProps {
  header?: ReactElement;
  children: ReactElement | ReactElement[];
  footer?: boolean;
  full?: boolean;
}

const Layout: FC<ILayoutProps> = ({
  header,
  children,
  footer = true,
  full = false,
}) => {
  const router = useRouter();
  const setMenu = useSetRecoilState(menuState);

  useEffect(() => {
    setMenu(router.asPath);
  }, [router, setMenu]);

  return (
    <>
      <header>{header}</header>
      <div
        css={{
          position: `relative`,
          flex: `1 1 0%`,
        }}
      >
        <main
          css={{
            overflowY: `auto`,
            overflowX: "hidden",
            padding: full ? "0" : "0 2rem",
            marginBottom: footer ? "6.5rem" : "",
            height: "100%",
          }}
        >
          {children}
        </main>
      </div>

      {footer && <Footer menus={menus} />}
      <ModalBase />
    </>
  );
};

export default Layout;
