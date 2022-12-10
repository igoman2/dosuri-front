import { CSSObject, useTheme } from "@emotion/react";
import React, { useId } from "react";
import Select, {
  DropdownIndicatorProps,
  ValueContainerProps,
  components,
} from "react-select";

import ArrowRight from "@/public/assets/arrow-right.png";
import Icon from "@/util/Icon";
import Image from "next/image";
import { do_si } from "@/components/Register/location";

const SelectForm = () => {
  const theme = useTheme();

  const colourStyles: any = {
    container: (styles: CSSObject) => ({
      ...styles,
      flexGrow: 1,
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

  const CustomIcon = () => {
    return (
      <Icon
        name="arrow"
        width="24"
        height="24"
        stroke={theme.colors.grey}
        stroke-width="2"
        css={{
          transform: "rotate(180deg)",
        }}
      />
    );
  };
  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props} css={{ padding: 0 }}>
        <CustomIcon />
      </components.DropdownIndicator>
    );
  };
  const ValueContainer = (props: ValueContainerProps) => {
    return (
      <components.ValueContainer {...props}>
        {props.children}
      </components.ValueContainer>
    );
  };

  return (
    <div>
      <Select
        options={do_si.sort((a, b) => (a.label > b.label ? 1 : -1))}
        instanceId={useId()}
        components={{
          ValueContainer,
          DropdownIndicator,
          IndicatorSeparator: null,
        }}
        styles={colourStyles}
        placeholder="시/도 선택"
      />
    </div>
  );
};

export default SelectForm;
