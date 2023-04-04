import BeatLoader from "react-spinners/BeatLoader";
import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const Spinner = () => {
  const theme = useTheme();

  return (
    <SpinnerWrapper>
      <BeatLoader color={theme.colors.purple} />
    </SpinnerWrapper>
  );
};

export default Spinner;

const SpinnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
