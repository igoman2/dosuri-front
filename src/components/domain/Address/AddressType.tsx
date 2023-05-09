import { FC } from "react";
import BriefcaseIcon from "@/public/assets/briefcase.png";
import LocationIcon from "@/public/assets/location.png";
import HomeIcon from "@/public/assets/home.png";
import Image from "next/image";
import styled from "@emotion/styled";

export interface AddressType {
  type: string;
  text: string;
  onClick: () => void;
}

const AddressType: FC<AddressType> = ({ type, text, onClick }) => {
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
    <TypeButtonWrapper onClick={onClick}>
      <div>
        <div className="image">
          <Image
            src={getIcon(type)}
            alt="address-type-icon"
            width={13}
            height={13}
          ></Image>
        </div>
        <div className="text">{text}</div>
      </div>
    </TypeButtonWrapper>
  );
};
export default AddressType;

const TypeButtonWrapper = styled.div`
  border: solid ${(props) => props.theme.colors.grey};
  border-width: 1px;
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .image {
    display: flex;
    justify-content: center;
  }

  .text {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
  }
`;
