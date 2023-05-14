import Icon from "@/util/Icon";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addressModalState } from "./store";
import { userInfoState } from "@/store/user";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

const SelectAddressBar = () => {
  const { isLoggedIn } = useAuth();
  const setModal = useSetRecoilState(addressModalState);
  const theme = useTheme();
  const userInfo = useRecoilValue(userInfoState);
  const userAddress = userInfo.address ?? "";
  const router = useRouter();

  const handleClickBar = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setModal({ isActive: true });
  };

  return (
    <Wrapper onClick={handleClickBar}>
      <Icon name="location" />
      <span>{userAddress.name}</span>
      <Icon
        name="arrow"
        width="14"
        height="14"
        stroke={theme.colors.purple}
        strokeWidth="1"
        css={{
          transform: "rotate(270deg)",
        }}
      />
    </Wrapper>
  );
};

export default SelectAddressBar;

const Wrapper = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;

  span {
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    padding-top: 0.2rem;
  }
`;
