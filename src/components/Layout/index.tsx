import { useRouter } from "next/router";
import React, { FC, ReactElement, useEffect } from "react";
import Footer from "./Footer";
import { useSetRecoilState } from "recoil";
import { menuState } from "./store";
import { menus } from "./menu";

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
      <main
        css={{
          position: `relative`,
          flex: `1 1 0%`,
          overflowY: `auto`,
          padding: "0 2rem",
        }}
      >
        {children}
      </main>
      {footer && <Footer menus={menus} />}
    </>
  );
};

export default Layout;
