import styled from "@emotion/styled";

export const SearchInputWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  color: ${(props) => props.theme.colors.grey};

  input {
    height: 4.2rem;
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    padding-left: 1rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
  }
`;
