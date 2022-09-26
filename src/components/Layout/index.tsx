import React, { FC, ReactElement } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  header?: ReactElement;
  children: ReactElement | ReactElement[];
  footer?: ReactElement;
}

const Layout: FC<ILayoutProps> = ({ header, children, footer }) => {
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
      <footer>{footer}</footer>
    </>
  );
};

export default Layout;
