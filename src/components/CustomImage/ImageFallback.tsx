import React, { FC } from "react";

import { useTheme } from "@emotion/react";

interface IImageFallbackProps {
  width: string;
  height: string;
  circle?: boolean;
}

const ImageFallback: FC<IImageFallbackProps> = ({ width, height, circle }) => {
  const theme = useTheme();
  return (
    <div
      css={{
        width,
        height,
        backgroundColor: theme.colors.grey_light,
        borderRadius: circle ? "5rem" : "0.5rem",
      }}
    ></div>
  );
};

export default ImageFallback;
