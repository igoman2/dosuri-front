import React, { FC, ReactNode } from "react";

interface IHeaderDepthProps {
  children?: ReactNode;
}

const Wrapper: FC<IHeaderDepthProps> = ({ children }) => {
  return (
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
        padding: "0 1rem",
      }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
