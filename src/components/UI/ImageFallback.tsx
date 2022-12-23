import React, { FC } from "react";

import { useTheme } from "@emotion/react";

interface IImageFallbackProps {
  width: string;
  height: string;
}

const ImageFallback: FC<IImageFallbackProps> = ({ width, height }) => {
  const theme = useTheme();
  return (
    <div
      css={{
        width,
        height,
        backgroundColor: theme.colors.grey_light,
        borderRadius: "0.5rem",
      }}
    ></div>
  );
};

export default ImageFallback;
