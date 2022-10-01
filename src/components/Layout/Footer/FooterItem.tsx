import Icon from "@/util/Icon";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { menuState } from "../store";

interface IFooterItemProps {
  iconName: string;
  text: string;
  path: string;
}

const FooterItem: FC<IFooterItemProps> = ({ iconName, text, path }) => {
  const currentMenu = useRecoilValue(menuState);

  const theme = useTheme();

  const isCurrentPath = (): boolean => {
    return path === currentMenu;
  };
  return (
    <Link href={path}>
      <a
        css={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.3rem",
          position: "relative",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            height: "6.8rem",
            borderTop: isCurrentPath()
              ? `2px solid ${theme.colors.purple}`
              : "",
            position: "absolute",
            top: "-0.1rem",
          }}
        >
          {isCurrentPath() ? (
            <Icon name={`${iconName}_clicked`} />
          ) : (
            <Icon name={iconName} />
          )}
          <span
            css={{
              marginTop: "0.4rem",
              fontSize: theme.fontSizes.sm,
              lineHeight: theme.lineHeights.sm,
              color: isCurrentPath() ? theme.colors.purple : theme.colors.black,
            }}
          >
            {text}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default FooterItem;
