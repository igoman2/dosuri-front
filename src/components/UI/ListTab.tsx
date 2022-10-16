import styled from "@emotion/styled";
import Image from "next/image";
import ArrowRight from "@/public/assets/arrow-right.png";
import { FC } from "react";
import Link from "next/link";
import Divider from "./Divider";

interface IListTabProps {
  text: string;
  subText: string;
  link: string;
  hasNoti?: boolean;
  isLast: boolean;
}

const ListTab: FC<IListTabProps> = ({
  text,
  subText,
  link,
  hasNoti,
  isLast,
}) => {
  return (
    <Link href={link}>
      <a>
        <ListTabWrapper>
          <div className="list-title">
            <div className="text">
              <div>{text}</div>
              {hasNoti && <div className="bubble"></div>}
            </div>
            <div className="sub-text">{subText}</div>
          </div>
          <div>
            <Image src={ArrowRight} width={25} height={25} alt="arrow-right" />
          </div>
        </ListTabWrapper>
        {!isLast && <Divider height={1} />}
      </a>
    </Link>
  );
};

export default ListTab;

const ListTabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0rem;

  .list-title {
    display: flex;
    gap: 2rem;
    align-items: center;

    & .bubble {
      position: absolute;
      top: 0.2rem;
      right: -0.7rem;
      border-radius: 50%;
      background-color: red;
      width: 0.5rem;
      height: 0.5rem;
    }

    & .text {
      position: relative;
      font-size: ${(props) => props.theme.fontSizes.xl};
      line-height: ${(props) => props.theme.lineHeights.xl};
      font-weight: 700;
    }

    & .sub-text {
      color: ${(props) => props.theme.colors.purple};
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};
    }
  }
`;
