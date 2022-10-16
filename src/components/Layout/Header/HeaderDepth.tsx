import React, { FC } from "react";
import Icon from "@/util/Icon";

const Header: FC = () => {
  return (
    <div
      css={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        "& .center": {
          flexGrow: 1,
        },
        height: "5.4rem",
        marginBottom: "0.5rem",
        padding: "0 1rem",
      }}
    >
      <Icon name="arrow" width="24" height="24" />
    </div>
  );
};

export default Header;
