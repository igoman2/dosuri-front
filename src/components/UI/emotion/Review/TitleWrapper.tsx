import styled from "@emotion/styled";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5rem;

  .title {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
  }

  .required {
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    color: ${(props) => props.theme.colors.purple};
    margin-bottom: 0.2rem;
  }

  .optional {
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    color: ${(props) => props.theme.colors.grey};
    margin-bottom: 0.2rem;
  }
`;
