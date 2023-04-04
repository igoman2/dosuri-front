import React, { FC, ReactNode } from "react";

import Divider from "../Divider/Divider";
import Icon from "@/util/Icon";
import { ModalBaseContainer } from "./ModalBase";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { closeModalDirectionState } from "./store";

interface IFullModalBase {
  isActive: boolean;
  children: ReactNode;
  title: string;
  subTitle?: string;
  right?: ReactNode;
  onClose: () => void;
  onClickBack?: () => void;
  divider?: boolean;
}

const FullModalBase: FC<IFullModalBase> = ({
  isActive,
  onClose,
  children,
  title,
  subTitle,
  right,
  onClickBack,
  divider = false,
}) => {
  const closeDirection = useRecoilValue(closeModalDirectionState);

  return (
    <>
      <FullModalBaseWrapper active={isActive} closeDirection={closeDirection}>
        <div
          className="modal_back"
          onClick={onClickBack ? onClickBack : onClose}
        />
        <div className="modal_content ">
          <div>
            <div>
              <div
                css={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "& .center": {
                    flexGrow: 1,
                  },
                  height: "5.4rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div className="modal-head">
                  <span onClick={onClose}>
                    <Icon
                      name="close"
                      fill={theme.colors.black}
                      width="14"
                      height="14"
                    />
                  </span>
                  <div
                    css={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      css={{
                        display: "flex",
                        gap: "1.5rem",
                        alignItems: "center",
                      }}
                    >
                      <span className="title">{title}</span>
                      <span className="subTitle">{subTitle}</span>
                    </div>
                    <div>{right}</div>
                  </div>
                </div>
              </div>
              {divider && <Divider height={1} />}
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </FullModalBaseWrapper>
    </>
  );
};

export default FullModalBase;

type SFullModalBaseWrapperProps = {
  closeDirection: any;
};

const FullModalBaseWrapper = styled(
  ModalBaseContainer
)<SFullModalBaseWrapperProps>`
  padding: 0;

  .modal-head {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    height: 6rem;
    flex-grow: 1;
  }

  .modal_content {
    height: 100%;
    margin: 0;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ${(props) => {
      return props.active
        ? props.closeDirection.direction === "UP"
          ? css`
              animation: popInFromBottom 0.4s forwards ease-in-out;
            `
          : css`
              animation: popInFromTop 0.4s forwards ease-in-out;
            `
        : css`
            animation: popInFromBottom 0.4s forwards ease-in-out;
          `;
    }}

    .content {
      margin-top: 0.5rem;
      flex: 1;
    }

    .title {
      font-size: ${(props) => props.theme.fontSizes.xxl};
      line-height: ${(props) => props.theme.lineHeights.xxl};
      font-weight: 700;
    }

    .subTitle {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      color: ${(props) => props.theme.colors.grey};
    }

    @keyframes popInFromBottom {
      0% {
        opacity: 0;
        transform: translateY(40rem) scale(0.75);
      }
      75% {
        opacity: 1;
        transform: translateY(-1.6rem) scale(1);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes popInFromTop {
      0% {
        opacity: 0;
        transform: translateY(-40rem) scale(0.75);
      }
      75% {
        opacity: 1;
        transform: translateY(1.6rem) scale(1);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;
