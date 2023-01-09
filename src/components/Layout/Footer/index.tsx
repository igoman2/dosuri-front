import React, { FC } from "react";

import CompanyInfo from "@/components/UI/CompanyInfo";
import FooterItem from "./FooterItem";
import { Menu } from "../menu";
import styled from "@emotion/styled";
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
        height: "17.5rem",
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
          top: "10.9rem",
          left: "0",
        },
      }}
    >
      <div>
        <CompanyInfo />
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
      </div>
    </nav>
  );
};

export default Footer;

const CompanyInfoWrapper = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 2.5rem 0;
  padding: 0 2rem;

  .bold {
    font-weight: 700;
  }
`;
