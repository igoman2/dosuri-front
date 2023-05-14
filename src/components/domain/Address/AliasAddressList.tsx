import { FC } from "react";
import BriefcaseIcon from "@/public/assets/briefcase.png";
import LocationIcon from "@/public/assets/location.png";
import HomeIcon from "@/public/assets/home.png";
import CheckIcon from "@/public/assets/check.png";
import Image from "next/image";
import styled from "@emotion/styled";
import AddressDivider from "@/components/Divider/AddressDivider";

export interface AliasAddressListProp {
  type: string;
  alias: string;
  address: string | null;
  onClick?: () => void;
  clicked?: boolean;
  fullDivider?: boolean;
}

const AliasAddressList: FC<AliasAddressListProp> = ({
  type,
  alias,
  address,
  onClick,
  clicked,
  fullDivider,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return HomeIcon;
      case "office":
        return BriefcaseIcon;
      default:
        return LocationIcon;
    }
  };

  return (
    <div>
      <Wrapper onClick={onClick}>
        {
          <ImageWrapper>
            <Image
              className="typeIcon"
              src={getIcon(type)}
              alt="address-type-icon"
              width={14}
              height={14}
            />
          </ImageWrapper>
        }
        <div className="aliasAddress" css={{ width: "100%" }}>
          {/* 
          FIXME: !! 활용해서 null 체크하는 것이 좋을 것 같음
           */}
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
        {clicked ? (
          <Image
            src={CheckIcon}
            alt="check-icon"
            width={22}
            height={22}
          ></Image>
        ) : null}
      </Wrapper>
      <AddressDivider height={1} marginLeft={fullDivider ? 0 : 3} />
    </div>
  );
};

export default AliasAddressList;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  .aliasAddress {
    padding: 1rem 0;
  }

  .alias {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: 400;

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

const ImageWrapper = styled.div`
  span {
    width: 1.4rem !important;
  }
`;
