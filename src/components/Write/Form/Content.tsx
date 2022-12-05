import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";

interface IContentForm {
  children: ReactNode;
}

const Content: FC<IContentForm> = ({ children }) => {
  return (
    <FormContentWrapper>
      <div>{children}</div>
    </FormContentWrapper>
  );
};

export default Content;

const FormContentWrapper = styled.div`
  margin-bottom: 2.5rem;
`;
