import styled from "@emotion/styled";
import React from "react";
import { ToastContainer } from "react-toastify";

export const StyledToast = styled(ToastContainer)`
  .react-toastify__toast--enter,
  .react-toastify__toast--exit {
    animation: none !important;
  }
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    margin-bottom: 4rem;
  }
  .Toastify__toast-body {
    justify-content: center;
    font-size: 1.4rem;
    color: #3d3dc1;

    & div {
      display: flex;
      justify-content: center;
    }
  }
  .Toastify__progress-bar {
  }
  .Toastify__toast-theme--light {
    background: none;
    box-shadow: none;
  }
`;
