import React from "react";
import styled from "@emotion/styled";

const CompanyInfo = () => {
  return (
    <CompanyInfoWrapper>
      <div className="bold">도수리</div>
      <div
        css={{
          display: "flex",
        }}
      >
        <div>
          <span className="bold">사업자등록번호</span>
          <span> 233-31-01388 </span>
        </div>
        <div>
          <span className="bold" css={{ margin: "0 0.5rem" }}>
            대표자
          </span>
        </div>
        <span> 한종호</span>
      </div>
      <div>
        <div>
          <span className="bold">주소</span>
          <span> 서울특별시 서초구 잠원동 23-21 301호</span>
        </div>
      </div>
    </CompanyInfoWrapper>
  );
};

export default CompanyInfo;

const CompanyInfoWrapper = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  line-height: ${(props) => props.theme.lineHeights.md};
  margin: 2.5rem 0;
  padding: 0 2rem;

  .bold {
    font-weight: 700;
  }
`;
