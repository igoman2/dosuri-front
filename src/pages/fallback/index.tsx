import ErrorIcon from "@/public/assets/error-icon.png";
import Header from "@/components/Layout/Header";
import Image from "next/image";
import Layout from "@/components/Layout";
import React, { FC } from "react";
import styled from "@emotion/styled";

interface IFallbackProps {
  error: any;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const Fallback: FC<IFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Layout header={<Header left={true} />}>
      <FallbackWrapper>
        <div className="error-text">에러가 발생했습니다.</div>
        <div>
          <Image src={ErrorIcon} width={150} height={130} alt="error-icob" />
        </div>
        <div className="error-subtext">
          <div>페이지를 새로고침 해주세요.</div>

          <div>불편을 드려 죄송합니다.</div>
          {/* <button onClick={() => resetErrorBoundary()}> 다시 시도 </button> */}
        </div>
      </FallbackWrapper>
    </Layout>
  );
};
export default Fallback;

const FallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .error-text {
    font-size: ${(props) => props.theme.fontSizes.xxxl};
    line-height: ${(props) => props.theme.lineHeights.xxxl};
    color: ${(props) => props.theme.colors.red};
    margin-top: 5rem;
    margin-bottom: 10rem;
  }

  .error-subtext {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    margin-top: 5rem;
  }
`;
