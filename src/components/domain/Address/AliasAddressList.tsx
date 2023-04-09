import React, { FC } from "react";
import BriefcaseIcon from "@/public/assets/briefcase.png";
import LocationIcon from "@/public/assets/location.png";
import HomeIcon from "@/public/assets/home.png";
import Image from "next/image";
import styled from "@emotion/styled";
import Home from "@/pages";
import { useTheme } from "@emotion/react";

// type AliasAddressListProps = {
//   type: string;
//   alias: string;
//   address: string | null;
// };

export interface AliasAddressListProp {
  type: string;
  alias: string;
  address: string | null;
}

// const AliasAddressList: React.FunctionComponent<AliasAddressListProps> = ({
const AliasAddressList: FC<AliasAddressListProp> = ({
  type,
  alias,
  address,
}) => {
  const theme = useTheme();

  return (
    <div>
      <Wrapper>
        <Image
          className="typeIcon"
          src={
            type === "home"
              ? HomeIcon
              : type === "company"
              ? BriefcaseIcon
              : LocationIcon
          }
          alt="address-type-icon"
          width={14}
          height={14}
        ></Image>
        <div className="aliasAddress" css={{ width: "100%" }}>
          {address === null ? (
            <div>
              <div className="alias solo">{alias} 추가</div>
            </div>
          ) : (
            <div>
              <div className="alias">{alias}</div>
              <div className="address">{address}</div>
            </div>
          )}
        </div>
      </Wrapper>
      <div
        className="line"
        css={{
          marginLeft: "30px",
          borderBottom: `1px solid lightGrey`,
        }}
      ></div>
    </div>
  );
};

export default AliasAddressList;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .aliasAddress {
    padding: 1rem 0;
    padding-left: 16px;
  }

  .alias {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: 350;

    &.solo {
      padding: 1.3rem 0;
    }
  }

  .address {
    padding-top: 5px;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    color: ${(props) => props.theme.colors.grey};
    font-weight: 100;
  }
`;

// font size & boldness 판단 어케해요??
// 피그마에서는 가로 360인데 화면
// Wrapper height 60으로 정한거 넘 거슬림.
