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
import {
  do_si,
  gu_dong,
  LOCATIONS,
  Location,
} from "@/components/Register/location";
import { useId, useState } from "react";
import Chevron from "@/public/assets/Chevron.svg";
import Image from "next/image";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";

interface MyFormValues {
  firstName: string;
}

interface Symtom {
  title: string;
  selected: boolean;
}

const Symtoms: Symtom[] = [
  {
    title: "머리",
    selected: false,
  },
  {
    title: "목",
    selected: false,
  },
  {
    title: "허리",
    selected: false,
  },
  {
    title: "어깨",
    selected: false,
  },
  {
    title: "골반",
    selected: false,
  },
  {
    title: "무릎",
    selected: false,
  },
  {
    title: "손목",
    selected: false,
  },
  {
    title: "발목",
    selected: false,
  },
  {
    title: "관절",
    selected: false,
  },
  {
    title: "그외",
    selected: false,
  },
];

const RegisterForm: React.FC<{}> = () => {
  const initialValues: MyFormValues = { firstName: "" };
  const theme = useTheme();
  const [symtoms, setSymtoms] = useState<Symtom[]>(Symtoms);
  const [dosi, setDosi] = useState<string>();
  const [gudong, setGudong] = useState<string>();
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [didNicknameValidCheck, setDidNicknameValidCheck] = useState(false);

  /**
   * ts 적용
   * https://stackoverflow.com/questions/66546842/add-typescript-types-to-react-select-onchange-function
   */

  const onNicknameValidation = () => {
    setDidNicknameValidCheck(true);
  };

  const onDoSiSelect = (selectedValue: any) => {
    setDosi(selectedValue.value);
  };

  const onGuDongSelect = (selectedValue: any) => {
    setGudong(selectedValue.value);
  };

  const onSymtomClick = (symtom: Symtom) => {
    setSymtoms((prev) => {
      const selectedIndex = prev.findIndex((s) => s.title === symtom.title);
      const currentStatus = prev[selectedIndex].selected;
      prev[selectedIndex].selected = !currentStatus;

      return [...prev];
    });
  };

  const colourStyles: any = {
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
      <div css={{ cursor: "pointer" }}>
        <Icon name={`chevron`} />
      </div>
    );
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
    <Layout header={<HeaderDepth />} footer={false}>
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
                  이름
                </label>
                <div className="input-section">
                  <Field
                    disabled={true}
                    className="field"
                    id="nickname"
                    name="nickname"
                    placeholder="한종호"
                  />
                </div>
              </div>
              <div className="divider nickname">
                <label className="label" htmlFor="nickname">
                  이메일
                </label>
                <div className="input-section">
                  <Field
                    disabled={true}
                    className="field"
                    id="nickname"
                    name="nickname"
                    placeholder="igoman1@naver.com"
                  />
                </div>
                <div className="noti">
                  {didNicknameValidCheck ? (
                    isNicknameValid ? (
                      <div className=" valid">사용 가능한 닉네임입니다.</div>
                    ) : (
                      <div className=" invalid">
                        사용 불가능한 닉네임입니다.
                      </div>
                    )
                  ) : (
                    <div className="invisible">dd</div>
                  )}
                </div>
              </div>
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
                    onClick={onNicknameValidation}
                  />
                </div>
                <div className="noti">
                  {didNicknameValidCheck ? (
                    isNicknameValid ? (
                      <div className=" valid">사용 가능한 닉네임입니다.</div>
                    ) : (
                      <div className=" invalid">
                        사용 불가능한 닉네임입니다.
                      </div>
                    )
                  ) : (
                    <div className="invisible">dd</div>
                  )}
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
                    onChange={onDoSiSelect}
                  />
                  <Select
                    isDisabled={!dosi}
                    options={LOCATIONS.filter((location) =>
                      location.label.includes(dosi as string)
                    )
                      .sort((a, b) => (a.label > b.label ? 1 : -1))
                      .map((lo) => {
                        return {
                          value: lo.label.replace(dosi as string, "").trim(),
                          label: lo.label.replace(dosi as string, "").trim(),
                        };
                      })}
                    instanceId={useId()}
                    components={{
                      ValueContainer,
                      DropdownIndicator,
                      IndicatorSeparator: null,
                    }}
                    styles={colourStyles}
                    placeholder="시/군/구 선택"
                    onChange={onGuDongSelect}
                  />
                </div>
              </div>

              <div className="divider">
                <label className="label">통증 부위</label>
                <ButtonWrapper>
                  {Symtoms.map((symtom, i) =>
                    symtom.selected ? (
                      <Button
                        key={i}
                        text={symtom.title}
                        backgroundColor={theme.colors.white}
                        color={theme.colors.purple}
                        border={`0.1rem solid ${theme.colors.purple}`}
                        onClick={() => onSymtomClick(symtom)}
                      />
                    ) : (
                      <Button
                        key={i}
                        text={symtom.title}
                        backgroundColor={theme.colors.white}
                        color={theme.colors.grey}
                        border={`0.1rem solid ${theme.colors.grey}`}
                        onClick={() => onSymtomClick(symtom)}
                      />
                    )
                  )}
                </ButtonWrapper>
              </div>

              <div className="save-button-wrapper">
                <Button text="저장하기" width="100%" />
              </div>
            </div>
          </Form>
        </Formik>
      </FormWrapper>
    </Layout>
  );
};

export default RegisterForm;

const FormWrapper = styled.div`
  .divider {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.nickname {
      position: relative;
      margin-bottom: 3.5rem;
    }
  }

  .noti {
    position: absolute;
    bottom: -2.5rem;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};

    & .valid {
      color: ${(props) => props.theme.colors.purple};
    }
    & .invalid {
      color: ${(props) => props.theme.colors.red};
    }
    & .invisible {
      visibility: hidden;
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
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
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

  .save-button-wrapper {
    padding: 1rem 0;
    width: 100%;
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
