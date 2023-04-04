import styled from "@emotion/styled";

const PostBottom = styled.div`
  .post-bottom {
    display: flex;
    gap: 1rem;
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    .heart {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
    .comment {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
  }
`;

export default PostBottom;
