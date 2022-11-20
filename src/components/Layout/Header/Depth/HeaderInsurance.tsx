import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import Wrapper from "./Wrapper";
import Logo from "@/public/assets/logo-horizontal.png";
import HyundaiLogo from "@/public/assets/logo-hyundai.png";
import CloseIcon from "@/public/assets/close-bold.png";
import Image from "next/image";

const HeaderInsurance = () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  return (
    <Wrapper>
      <BackButton onClick={onBack}>
        <Icon name="arrow" width="24" height="24" />
      </BackButton>
      <LogoWrapper>
        <Image src={Logo} width="82" height="22" alt="logo-horizontal" />
        <Image src={CloseIcon} width={16} height={16} alt="close" />
        <Image src={HyundaiLogo} width={95} height={30} alt="logo-hyundai" />
      </LogoWrapper>
      <div></div>
    </Wrapper>
  );
};

export default HeaderInsurance;

const BackButton = styled.div`
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;
