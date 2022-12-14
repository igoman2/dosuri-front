import React, { FC } from "react";

import FooterItem from "./FooterItem";
import { Menu } from "../menu";
import { useTheme } from "@emotion/react";

interface IFooterProps {
  menus: Menu[];
}

const Footer: FC<IFooterProps> = ({ menus }) => {
  const theme = useTheme();

  return (
    <nav
      css={{
        backgroundColor: " rgb(255, 255, 255)",
        position: "fixed",
        bottom: "0",
        height: "6.5rem",
        minWidth: "32rem",
        maxWidth: " 40rem",
        width: "100%",
        zIndex: 50,
        "&:before": {
          content: "''",
          position: "absolute",
          width: "100%",
          height: "0.1rem",
          background: `linear-gradient(to top, ${theme.colors.grey}, white)`,
          top: "-0.1rem",
          left: "0",
        },
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
