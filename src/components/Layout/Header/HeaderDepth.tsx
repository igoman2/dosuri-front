import React, { FC, ReactNode } from "react";

import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

interface IHeaderDepthProps {
  left?: ReactNode;
  bottomLine?: boolean;
}

const HeaderDepth: FC<IHeaderDepthProps> = ({ left, bottomLine }) => {
  const router = useRouter();
  const theme = useTheme();

  const onBack = () => {
    router.back();
  };

  return (
    <div
      css={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
        "& .center": {
          flexGrow: 1,
        },
        height: "5.4rem",
        marginBottom: "0.5rem",
        padding: "0 1rem",
        zIndex: "50",
        position: "relative",
        borderBottom: bottomLine
          ? `1px solid ${theme.colors.grey_light}`
          : "none",
      }}
    >
      <BackButton onClick={onBack}>
        <Icon
          name="arrow"
          width="24"
          height="24"
          stroke="black"
          strokeWidth="2"
        />
      </BackButton>

      {left}
    </div>
  );
};

export default HeaderDepth;

const BackButton = styled.div`
  cursor: pointer;
`;
