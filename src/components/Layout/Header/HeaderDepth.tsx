import React, { FC } from "react";
import Icon from "@/util/Icon";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const Header: FC = () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

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
      <BackButton onClick={onBack}>
        <Icon name="arrow" width="24" height="24" />
      </BackButton>
    </div>
  );
};

export default Header;

const BackButton = styled.div`
  cursor: pointer;
`;
