import styled from "@emotion/styled";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <StyledWrap>
      <h2>블로그 Home</h2>
      <div>Blog</div>
    </StyledWrap>
  );
};

export default Home;

const StyledWrap = styled.div`
  background-color: hotpink;
  div {
    font-size: 24px;
  }
`;
