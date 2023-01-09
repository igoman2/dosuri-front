import { DropdownIndicator, ValueContainer, colourStyles } from "./style";
import { FC, useEffect, useId, useMemo, useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { LOCATIONS, Location, do_si } from "./location";
import { checkNicknameDuplication, registerUser } from "@/service/apis/user";
import {
  formatPartialPhoneNumberToComplete,
  parseBirthday,
} from "@/util/format";
import { useMutation, useQuery } from "react-query";

import { AxiosError } from "axios";
import Button from "@/components/Button";
import Select from "react-select";
import { Symtom } from "@/types/hospital";
import { UserInfo } from "@/types/user";
import _ from "lodash";
import { setTokenInCookie } from "@/util/setToken";
import styled from "@emotion/styled";
import useFormikFactory from "@/hooks/useFormikFactory";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";
import { useUser } from "@/hooks/service/useUser";
import { userInfoState } from "@/store/user";

export const Symtoms: Symtom[] = [
  {
    name: "머리",
    selected: false,
  },
  {
    name: "목",
    selected: false,
  },
  {
    name: "허리",
    selected: false,
  },
  {
    name: "어깨",
    selected: false,
  },
  {
    name: "골반",
    selected: false,
  },
  {
    name: "무릎",
    selected: false,
  },
  {
    name: "손목",
    selected: false,
  },
  {
    name: "발목",
    selected: false,
  },
  {
    name: "관절",
    selected: false,
  },
  {
    name: "그외",
    selected: false,
  },
];

interface IRegisterForm {
  formType: "register" | "edit";
}

const RegisterForm: FC<IRegisterForm> = ({ formType }) => {
  const router = useRouter();
  const theme = useTheme();
  const [symtoms, setSymtoms] = useState<Symtom[]>(Symtoms);
  const [largeArea, setLargeArea] = useState<string>();
  const [smallArea, setSmallArea] = useState<Location | null>();
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [didNicknameValidCheck, setDidNicknameValidCheck] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isSmallAreaDisabled, setIsSmallAreaDisabled] = useState(false);
  const id1 = useId();
  const id2 = useId();

  const { mutate } = useMutation<UserInfo, AxiosError, UserInfo, unknown>(
    (data) => registerUser(data, userInfo.accessToken),
    {
      onSuccess: (resp) => {
        setTokenInCookie("refresh", userInfo.refreshToken);
        setTokenInCookie("access", userInfo.accessToken);
        setUserInfo((prev) => {
          return {
            ...resp,
            uuid: prev.uuid,
            refreshToken: prev.refreshToken,
            accessToken: prev.accessToken,
          };
        });
        router.push("/");
      },
    }
  );

  const { user } = useUser(userInfo.accessToken);

  const { initialValues, validationSchema } = useFormikFactory(user);

  const sortedLargeArea = useMemo(
    () => do_si.sort((a, b) => (a.label > b.label ? 1 : -1)),
    []
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: () => {
      const registerUserData: UserInfo = {
        uuid: userInfo.uuid,
        name: userInfo.name,
        nickname: formik.values.nickname,
        birthday: parseBirthday(formik.values.birthday),
        phone_no: formatPartialPhoneNumberToComplete(formik.values.phone),
        address: {
          large_area: formik.values.largeArea,
          small_area: formik.values.smallArea,
        },
        sex: formik.values.sex,
        pain_areas: formik.values.pain_areas.map((symtom) => {
          return {
            name: symtom.name,
          };
        }),
      };
      mutate(registerUserData);
    },
  });

  const sortedSmallArea = useMemo(() => {
    const parsedArea = LOCATIONS.filter((location) =>
      location.label.includes(largeArea as string)
    )
      .sort((a, b) => (a.label > b.label ? 1 : -1))
      .map((loc) => {
        let returnArea;
        if (
          loc.label.includes("서울특별시") ||
          loc.label.includes("부산광역시") ||
          loc.label.includes("대구광역시") ||
          loc.label.includes("인천광역시") ||
          loc.label.includes("광주광역시") ||
          loc.label.includes("대전광역시") ||
          loc.label.includes("울산광역시")
        ) {
          returnArea = loc.label.replace(largeArea as string, "").split(" ")[1];
        } else if (loc.label.includes("세종특별자치시")) {
          returnArea = "세종특별자치시";
          setIsSmallAreaDisabled(true);
          setSmallArea(null);
          formik.setFieldValue("smallArea", null);
        } else {
          const 구제외한주소 = loc.label
            .replace(largeArea as string, "")
            .split(" ");
          if (구제외한주소.length > 3) {
            returnArea = 구제외한주소.slice(1, 3).join(" ");
          } else {
            returnArea = 구제외한주소.slice(1, 2).join("");
          }
        }
        return { value: returnArea, label: returnArea };
      });

    return _.uniqBy(parsedArea, "label");
  }, [largeArea]);

  const userLargeArea = sortedLargeArea.find(
    (largeArea) => largeArea.label === initialValues.largeArea
  );

  const userSmallArea = sortedSmallArea.find(
    (smallArea) => smallArea.label === initialValues.smallArea
  );

  useEffect(() => {
    if (userLargeArea) {
      setLargeArea(userLargeArea.label);
    }

    if (userSmallArea) {
      setSmallArea(userSmallArea);
    } else {
      setSmallArea({
        label: formik.initialValues.smallArea,
        value: formik.initialValues.smallArea,
      });
    }
  }, [formik.initialValues, userLargeArea, userSmallArea]);

  useEffect(() => {
    const userSymtoms = Symtoms.map((symtom) => {
      if (
        initialValues.pain_areas.find(
          (pain) => pain.name.toLowerCase() === symtom.name.toLowerCase()
        )
      ) {
        return { ...symtom, selected: true };
      }
      return { ...symtom, selected: false };
    });
    setSymtoms(userSymtoms);
  }, []);

  useEffect(() => {
    if (formType === "edit") {
      setDidNicknameValidCheck(true);
      setIsNicknameValid(true);
    }
  }, [formType]);

  const { refetch } = useQuery(
    ["nicknameDuplication", formik.values.nickname],
    () => checkNicknameDuplication(formik.values.nickname),
    {
      enabled: false,
      suspense: false,
      retry: false,
      useErrorBoundary: false,
      onSuccess: (resp) => {
        if (resp.status === 200) {
          setIsNicknameValid(true);
        }
        setDidNicknameValidCheck(true);
      },
      onError: () => {
        setIsNicknameValid(false);
        setDidNicknameValidCheck(true);
      },
    }
  );

  const onNicknameValidation = () => {
    refetch();
  };

  /**
   * ts 적용
   * https://stackoverflow.com/questions/66546842/add-typescript-types-to-react-select-onchange-function
   */
  const onLargeAreaSelect = (selectedValue: any) => {
    setLargeArea(selectedValue.value);
    setSmallArea(null);
  };

  const onSmallAreaSelect = (selectedValue: Location) => {
    setSmallArea(selectedValue);
  };

  const onSymtomClick = (symtom: Symtom, formikState: typeof formik) => {
    setSymtoms((prev) => {
      const selectedIndex = prev.findIndex((s) => s.name === symtom.name);
      const currentStatus = prev[selectedIndex].selected;
      prev[selectedIndex].selected = !currentStatus;

      formikState.setFieldValue(
        "pain_areas",
        [...prev].filter((s) => s.selected === true)
      );
      return [...prev];
    });
  };

  return (
    <FormWrapper>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-section">
            {formType === "edit" ? (
              <>
                <div className="divider">
                  <label className="label" htmlFor="name">
                    이름
                  </label>
                  <Field
                    className={"field"}
                    id="name"
                    name="name"
                    value={formik.values.name}
                    disabled
                  />
                </div>
                <div className="divider">
                  <label className="label" htmlFor="email">
                    이메일
                  </label>
                  <Field
                    className={"field"}
                    id="email"
                    name="email"
                    value={formik.values.email}
                    disabled
                  />
                </div>
              </>
            ) : null}

            <div className="divider nickname">
              <label className="label" htmlFor="nickname">
                닉네임
              </label>
              <div className="input-section">
                <Field
                  className={
                    "field" +
                    (formik.errors.nickname && formik.touched.nickname
                      ? " is-invalid"
                      : "")
                  }
                  id="nickname"
                  name="nickname"
                  placeholder="2글자 이상 10글자 이하"
                  onChange={(e: InputEvent) => {
                    setDidNicknameValidCheck(false);
                    formik.handleChange(e);
                  }}
                  value={formik.values.nickname}
                />
                <Button
                  type="button"
                  text="중복확인"
                  backgroundColor={theme.colors.purple_light2}
                  disabled={
                    formik.values.nickname.length === 0 ||
                    !!formik.errors.nickname
                  }
                  onClick={onNicknameValidation}
                />
              </div>

              <div className="noti">
                {didNicknameValidCheck ? (
                  isNicknameValid ? (
                    <div className="valid">사용 가능한 닉네임입니다.</div>
                  ) : (
                    <div className="invalid">중복된 닉네임이 있습니다.</div>
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
                  className={
                    "field" +
                    (formik.errors.phone && formik.touched.phone
                      ? " is-invalid"
                      : "")
                  }
                  id="phone"
                  name="phone"
                  placeholder="숫자만 입력"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </div>
            </div>

            <div className="divider">
              <label className="label" htmlFor="birthday">
                생년월일
              </label>
              <Field
                className={
                  "field" +
                  (formik.errors.birthday && formik.touched.birthday
                    ? " is-invalid"
                    : "")
                }
                id="birthday"
                name="birthday"
                placeholder="예: 19901230"
                onChange={formik.handleChange}
                value={formik.values.birthday}
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
                  <Field
                    type="radio"
                    name="sex"
                    onChange={formik.handleChange}
                    value="남자"
                  />
                  <span>남자</span>
                </label>
                <label>
                  <Field
                    type="radio"
                    name="sex"
                    onChange={formik.handleChange}
                    value="여자"
                  />
                  <span>여자</span>
                </label>
              </div>
            </div>

            <div className="divider">
              <label className="label">지역</label>
              <div className="select-section">
                <Select
                  options={sortedLargeArea}
                  instanceId={id1}
                  isSearchable={false}
                  components={{
                    ValueContainer,
                    DropdownIndicator,
                    IndicatorSeparator: null,
                  }}
                  styles={colourStyles}
                  placeholder="시/도 선택"
                  onChange={(selectedOption: any) => {
                    onLargeAreaSelect(selectedOption);
                    formik.setFieldValue("largeArea", selectedOption.value);
                  }}
                  defaultValue={sortedLargeArea.find(
                    (largeArea) => largeArea.label === initialValues.largeArea
                  )}
                />
                <Select
                  isDisabled={!largeArea || isSmallAreaDisabled}
                  options={sortedSmallArea}
                  instanceId={id2}
                  isSearchable={false}
                  components={{
                    ValueContainer,
                    DropdownIndicator,
                    IndicatorSeparator: null,
                  }}
                  styles={colourStyles}
                  placeholder="시/군/구 선택"
                  onChange={(selectedOption: any) => {
                    onSmallAreaSelect(selectedOption);
                    formik.setFieldValue("smallArea", selectedOption.value);
                  }}
                  value={smallArea}
                />
              </div>
            </div>

            <div className="divider">
              <label className="label">통증 부위</label>
              <ButtonWrapper>
                {symtoms.map((symtom, i) =>
                  symtom.selected ? (
                    <Button
                      type="button"
                      key={i}
                      text={symtom.name}
                      backgroundColor={theme.colors.white}
                      color={theme.colors.purple}
                      border={`0.1rem solid ${theme.colors.purple}`}
                      onClick={() => onSymtomClick(symtom, formik)}
                    />
                  ) : (
                    <Button
                      type="button"
                      key={i}
                      text={symtom.name}
                      backgroundColor={theme.colors.white}
                      color={theme.colors.grey}
                      border={`0.1rem solid ${theme.colors.grey}`}
                      onClick={() => onSymtomClick(symtom, formik)}
                    />
                  )
                )}
              </ButtonWrapper>
            </div>
            <div className="save-button-wrapper">
              <Button
                type="submit"
                text="도수리 시작하기"
                width="100%"
                borderRadius="0.3rem"
                backgroundColor={theme.colors.purple}
                disabled={
                  !(
                    formik.isValid &&
                    formik.dirty &&
                    didNicknameValidCheck &&
                    isNicknameValid
                  )
                }
              />
            </div>
          </div>
        </form>
      </FormikProvider>
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
    outline-color: ${(props) => props.theme.colors.purple};

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

  .is-invalid {
    border: 1px solid red;
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
