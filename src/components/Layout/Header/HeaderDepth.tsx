import React, { FC, ReactElement } from "react";
import Icon from "@/util/Icon";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

interface IHeaderDepthProps {
  left?: ReactElement;
}

const HeaderDepth: FC<IHeaderDepthProps> = ({ left }) => {
  const router = useRouter();

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
      }}
    >
      <BackButton onClick={onBack}>
        <Icon
          name="arrow"
          width="24"
          height="24"
          stroke="black"
          stroke-width="2"
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
