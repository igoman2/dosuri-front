import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    lineHeights: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    colors: {
      purple: string;
      purple_light: string;
      purple_light2: string;
      red: string;
      red_light: string;
      green: string;
      mint_green: string;
      olive_green: string;
      olive_green_light: string;
      yellow: string;
      yellow_light: string;
      grey: string;
      grey_light: string;
      grey_dark: string;
      black: string;
      white: string;
    };
  }
}
