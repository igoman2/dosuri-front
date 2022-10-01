import { useTheme } from "@emotion/react";
import Image, { StaticImageData } from "next/image";
import React, { FC, ReactElement } from "react";

interface IFooterItemProps {
  image: StaticImageData;
  text: string;
}

const FooterItem: FC<IFooterItemProps> = ({ image, text }) => {
  const theme = useTheme();
  return (
    <div
      css={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "6.8rem",
        gap: "0.3rem",
        padding: "1rem 2.8rem 1.2rem 2.8rem",
      }}
    >
      <Image src={image} alt={`${image}`} width={24} height={24} />
      <span
        css={{
          marginTop: "0.4rem",
          fontSize: theme.fontSizes.sm,
          lineHeight: theme.lineHeights.sm,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default FooterItem;
