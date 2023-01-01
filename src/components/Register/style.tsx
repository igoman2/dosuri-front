import { CSSObject } from "@emotion/react";
import Icon from "@/util/Icon";
import { components } from "react-select";
import theme from "@/styles/theme";

export const colourStyles: any = {
  container: (styles: CSSObject) => ({
    ...styles,
    flexGrow: 1,
    width: "calc(50% - 2rem)",
  }),
  control: (styles: CSSObject) => ({
    ...styles,
    borderRadius: "0.5rem",
    border: `0.1rem solid ${theme.colors.grey}`,
    boxShadow: "none",
    "&:hover": {
      border: `0.1rem solid ${theme.colors.grey}`,
    },
    cursor: "text",
    height: "4.2rem",
    padding: "0 1rem",
  }),
  menu: (styles: CSSObject) => ({
    ...styles,
    border: `0.1rem solid ${theme.colors.purple}`,
    borderRadius: "0.5rem",
  }),
  option: (styles: CSSObject, { isDisabled }: any) => ({
    ...styles,
    color: `${theme.colors["black"]}`,
    backgroundColor: `${theme.colors.white}`,
    fontSize: theme.fontSizes.lg,
    lineHeight: theme.lineHeights.lg,
    ":active": {
      ...styles[":active"],
      backgroundColor: `${theme.colors.white}`,
    },
    ":hover": {
      backgroundColor: "rgba(152, 143, 255, 0.2)",
    },
    cursor: isDisabled ? "not-allowed" : "pointer",
  }),
  placeholder: (styles: CSSObject) => ({
    ...styles,
    fontSize: theme.fontSizes.lg,
    lineHeight: theme.lineHeights.lg,
  }),
  valueContainer: (styles: CSSObject) => ({
    ...styles,
    fontSize: theme.fontSizes.lg,
    lineHeight: theme.lineHeights.lg,
    padding: 0,
    margin: 0,
  }),
};
export const CustomIcon = () => {
  return (
    <div css={{ cursor: "pointer" }}>
      <Icon name={`chevron`} width="1.6rem" height="1.6rem" />
    </div>
  );
};
export const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomIcon />
    </components.DropdownIndicator>
  );
};
export const ValueContainer = (props: any) => {
  return (
    <components.ValueContainer {...props}>
      {props.children}
    </components.ValueContainer>
  );
};
