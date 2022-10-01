import React, { FC } from "react";
import FooterItem from "./FooterItem";
import { Menu } from "../index";

interface IFooterProps {
  menus: Menu[];
}

const Footer: FC<IFooterProps> = ({ menus }) => {
  return (
    <nav
      css={{
        backgroundColor: " rgb(255, 255, 255)",
        position: "sticky",
        bottom: "0",
        height: "6.5rem",
        width: "100%",
        zIndex: 10,
        borderTop: "0.1rem solid rgb(214, 214, 214)",
      }}
    >
      <div
        css={{
          display: "flex",
        }}
      >
        {menus.map((menu, i) => {
          return (
            <FooterItem
              key={i}
              text={menu.title}
              path={menu.path}
              iconName={menu.iconName}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default Footer;
