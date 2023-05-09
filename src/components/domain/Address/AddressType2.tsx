import { FC } from "react";
import BriefcaseIcon from "@/public/assets/purple-briefcase.png";
import LocationIcon from "@/public/assets/purple-location.png";
import HomeIcon from "@/public/assets/purple-home.png";
import Image from "next/image";
import styled from "@emotion/styled";

export interface AddressType {
  type: string;
  text: string;
  onClick: () => void;
}

const AddressType2: FC<AddressType> = ({ type, text, onClick }) => {
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
export default AddressType2;

const TypeButtonWrapper = styled.div`
  border: solid ${(props) => props.theme.colors.purple};
  border-width: 1px;
  background-color: rgba(152, 143, 255, 0.2);
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
    color: ${(props) => props.theme.colors.purple};
  }
`;
