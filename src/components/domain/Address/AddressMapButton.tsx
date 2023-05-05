import { FC, MouseEvent } from "react";
import Image from "next/image";
import CurrentLocationIcon from "@/public/assets/current-location.png";
import MapIcon from "@/public/assets/map.png";
import styled from "@emotion/styled";

export interface AddressMapButtonProp {
  iconType: "location" | "map";
  text: string;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const AddressMapButton: FC<AddressMapButtonProp> = ({
  iconType,
  text,
  onClick,
}) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <div className="buttonContent">
        <Image
          src={iconType === "location" ? CurrentLocationIcon : MapIcon}
          alt="buttonTypeIcon"
          width={24}
          height={24}
        ></Image>
        <div className="buttonText">{text}</div>
      </div>
    </ButtonWrapper>
  );
};

export default AddressMapButton;

const ButtonWrapper = styled.div`
  border-radius: 0.5rem;
  border: 0.1rem solid;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .buttonContent {
    display: flex;
    align-items: center;
  }

  .buttonText {
    padding-left: 0.5rem;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    font-weight: 700;
  }
`;
