import React, { FC, ReactNode } from "react";

import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import Link from "next/link";

interface IPageModal {
  children: ReactNode;
}

const PageModal: FC<IPageModal> = ({ children }) => {
  return (
    <>
      <PageModalWrapper>
        <div className="modal_back" />
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
                  <Link
                    href={`/community`}
                    as={`/community`}
                    scroll={false}
                    shallow={true}
                  >
                    <a>
                      <Icon
                        name="arrow"
                        width="24"
                        height="24"
                        stroke="black"
                        strokeWidth="2"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </PageModalWrapper>
    </>
  );
};

export default PageModal;

const PageModalWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  align-items: center;
  justify-content: center;

  .modal_back {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: ${(props) => props.theme.colors.white};
  }
  .modal_content {
    position: relative;
    max-width: 40rem;
    z-index: 10;
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.colors.white};
    margin: 2rem;
    overflow: hidden;
  }
`;
