import { useRouter } from "next/router";
import React, { FC, ReactElement, useEffect } from "react";
import Footer from "./Footer";
import { useSetRecoilState } from "recoil";
import { menuState } from "./store";
import { menus } from "./menu";
import ModalBase from "../Modal/ModalBase";

interface ILayoutProps {
  header?: ReactElement;
  children: ReactElement | ReactElement[];
  footer?: boolean;
}

const Layout: FC<ILayoutProps> = ({ header, children, footer = true }) => {
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
            padding: "0 2rem",
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
