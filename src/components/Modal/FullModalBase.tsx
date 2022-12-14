import React, { FC, ReactNode, useEffect, useState } from "react";

import Icon from "@/util/Icon";
import { ModalBaseContainer } from "./ModalBase";
import WritePostContent from "../Write/Question";
import styled from "@emotion/styled";

interface IFullModalBase {
  isActive: boolean;
  children: ReactNode;
  title: string;
  onClose: () => void;
}

const FullModalBase: FC<IFullModalBase> = ({
  isActive,
  onClose,
  children,
  title,
}) => {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    document.body.style.overflowY = isActive ? "hidden" : "initial";

    let timeoutId: any;
    if (isActive) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isActive]);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "initial";
    };
  }, []);

  if (!isActive && closed) return null;

  return (
    <>
      <FullModalBaseWrapper active={isActive}>
        <div className="modal_back" onClick={onClose} />
        <div className="modal_content">
          <div>
            <div className="title">
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
                  padding: "0 1rem",
                }}
              >
                <div className="modal-head">
                  <span onClick={onClose}>
                    <Icon name="close" />
                  </span>
                  <span>{title}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </FullModalBaseWrapper>
    </>
  );
};

export default FullModalBase;

const FullModalBaseWrapper = styled(ModalBaseContainer)`
  padding: 0;

  .modal-head {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    height: 6rem;
  }

  .modal_content {
    height: 100%;
    margin: 0;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .content {
    margin-top: 0.5rem;
    flex: 1;
  }

  .title {
    font-size: ${(props) => props.theme.fontSizes.xxl};
    line-height: ${(props) => props.theme.lineHeights.xxl};
    font-weight: 700;
  }
`;
