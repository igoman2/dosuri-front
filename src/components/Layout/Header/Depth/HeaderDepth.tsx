import React, { FC, ReactElement } from "react";
import Icon from "@/util/Icon";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Wrapper from "./Wrapper";

interface IHeaderDepthProps {
  left?: ReactElement;
}

const HeaderDepth: FC<IHeaderDepthProps> = ({ left }) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default HeaderDepth;

const BackButton = styled.div`
  cursor: pointer;
`;
