import styled from "@emotion/styled";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import Button from "@/components/Button";
import { CSSObject, useTheme } from "@emotion/react";
import Select, {
  DropdownIndicatorProps,
  ValueContainerProps,
  components,
} from "react-select";
import { do_si, gu_dong } from "./location";
import { useId } from "react";
import Chevron from "@/public/assets/Chevron.svg";
import Image from "next/image";
import Icon from "@/util/Icon";

interface MyFormValues {
  firstName: string;
}

const Symtoms = [
  "머리",
  "목",
  "어깨",
  "허리",
  "골반",
  "무릎",
  "손목",
  "발목",
  "관절",
  "그외",
];

const RegisterForm: React.FC<{}> = () => {
  const initialValues: MyFormValues = { firstName: "" };
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
      cursor: "pointer",
      height: "4.2rem",
      padding: "0 1rem",
    }),

    option: (styles: CSSObject, { isDisabled }: any) => ({
      ...styles,
      color: `${theme.colors["black"]}`,
      backgroundColor: `${theme.colors.white}`,
      ":active": {
        ...styles[":active"],
        backgroundColor: `${theme.colors.white}`,
      },
      ":hover": {
        backgroundColor: `${theme.colors.purple}`,
        color: `${theme.colors.white}`,
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
      padding: 0,
      margin: 0,
    }),
  };

  const CustomIcon = () => {
    return <Icon name={`chevron`} />;
  };
  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
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
    <FormWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <div className="form-section">
            <div className="divider nickname">
              <label className="label" htmlFor="nickname">
                닉네임
              </label>
              <div className="input-section">
                <Field
                  className="field"
                  id="nickname"
                  name="nickname"
                  placeholder="2글자 이상 10글자 이하"
                />
                <Button
                  text="중복확인"
                  backgroundColor={theme.colors.purple_light2}
                  type="submit"
                />
              </div>
            </div>

            <div className="divider">
              <label className="label" htmlFor="phone">
                핸드폰 번호
              </label>
              <div className="input-section phone">
                <div className="phone-prefix">010</div>
                <Field
                  className="field"
                  id="phone"
                  name="phone"
                  placeholder="숫자만 입력"
                />
              </div>
            </div>

            <div className="divider">
              <label className="label" htmlFor="birthday">
                생년월일
              </label>
              <Field
                className="field"
                id="birthday"
                name="birthday"
                placeholder="예: 19901230"
              />
            </div>

            <div className="divider">
              <label className="label">성별</label>
              <div
                className="sex-section"
                role="group"
                aria-labelledby="my-radio-group"
              >
                <label>
                  <Field type="radio" name="picked" value="male" />
                  <span>남자</span>
                </label>
                <label>
                  <Field type="radio" name="picked" value="female" />
                  <span>여자</span>
                </label>
              </div>
            </div>

            <div className="divider">
              <label className="label">지역</label>
              <div className="select-section">
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
                <Select
                  options={gu_dong.sort((a, b) => (a.label > b.label ? 1 : -1))}
                  instanceId={useId()}
                  components={{
                    ValueContainer,
                    DropdownIndicator,
                    IndicatorSeparator: null,
                  }}
                  styles={colourStyles}
                  placeholder="시/군/구 선택"
                />
              </div>
            </div>

            <div className="divider">
              <label className="label">통증 부위</label>
              <ButtonWrapper className="">
                {Symtoms.map((symtom, i) => (
                  <Button
                    key={i}
                    text={symtom}
                    backgroundColor={theme.colors.white}
                    color={theme.colors.purple}
                    border={`0.1rem solid ${theme.colors.purple}`}
                  />
                ))}
              </ButtonWrapper>
            </div>
          </div>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default RegisterForm;

const FormWrapper = styled.div`
  margin-top: 2rem;

  .divider {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.nickname {
      margin-bottom: 3.5rem;
    }
  }

  .form-section {
    display: flex;
    flex-direction: column;
  }

  .input-section {
    display: flex;
    gap: 2rem;

    &.phone {
      gap: 1rem;
    }
  }

  .sex-section {
    display: flex;
    gap: 2.5rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg} label {
      display: flex;
      align-items: center;
    }

    label {
      display: flex;
      align-items: center;
    }

    input[type="radio"] {
      height: 1.8em;
      width: 1.8rem;
      margin: 0 1rem 0 0;
      accent-color: ${(props) => props.theme.colors.purple};
      &:checked {
        accent-color: ${(props) => props.theme.colors.purple};
      }
      &:checked::after {
        accent-color: ${(props) => props.theme.colors.purple};
      }
    }
  }

  .select-section {
    display: flex;
    gap: 2rem;
    flex-grow: 1;
  }

  .label {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: 700;
    color: ${(props) => props.theme.colors.purple};
  }

  .field {
    height: 4.2rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    flex-grow: 1;

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
      padding: 1rem;
    }
  }

  .phone-prefix {
    height: 4.2rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    padding: 1rem 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  & button {
    flex: 1 0 auto;
    max-width: 6rem;
  }
`;
