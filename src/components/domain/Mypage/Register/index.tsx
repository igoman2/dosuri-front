import { ChangeEvent, FC, useEffect, useState } from "react";
import SearchBar from "../../Search/SearchBar";
import AddressMapButton from "../../Address/AddressMapButton";
import { Field, FormikProvider, useFormik } from "formik";
import { UserInfo } from "@/types/user";
import { checkNicknameDuplication, registerUser } from "@/service/apis/user";
import {
  formatPartialPhoneNumberToComplete,
  parseBirthday,
} from "@/util/format";
import { useMutation, useQuery } from "react-query";

import { AxiosError } from "axios";
import Button from "@/components/Button";
import { Symtom } from "@/types/hospital";
import { Symtoms } from "@/constants/Symtoms";
import _ from "lodash";
import { queryClient } from "@/service/react-query/queryClient";
import { queryKeys } from "@/service/react-query/constants";
import { setTokenInCookie } from "@/util/setToken";
import styled from "@emotion/styled";
import useFormikFactory from "@/hooks/useFormikFactory";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";
import { useUser } from "@/hooks/service/useUser";
import { userInfoState } from "@/store/user";
import toast from "react-hot-toast";
import {
  addressModalState,
  addressModeState,
  selectedAddressObject,
} from "../../Address/store";
import * as R from "ramda";
import AliasAddressList from "../../Address/AliasAddressList";

interface IRegisterForm {
  formType: "register" | "edit";
}

const RegisterForm: FC<IRegisterForm> = ({ formType }) => {
  const router = useRouter();
  const theme = useTheme();
  const [symtoms, setSymtoms] = useState<Symtom[]>(Symtoms);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameSame, setIsNicknameSame] = useState(false);
  const [didNicknameValidCheck, setDidNicknameValidCheck] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [mode, setMode] = useRecoilState(addressModeState);
  const setModal = useSetRecoilState(addressModalState);
  const addressObject = useRecoilValue(selectedAddressObject);

  const { mutate } = useMutation<UserInfo, AxiosError, UserInfo, unknown>(
    (data) => registerUser(data, userInfo.accessToken),
    {
      onSuccess: (resp) => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.hospital],
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.community],
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.user],
          refetchInactive: true,
        });
        if (formType === "register") {
          setTokenInCookie("refresh", userInfo.refreshToken);
          setTokenInCookie("access", userInfo.accessToken);
        }
        setUserInfo((prev) => {
          return {
            ...resp,
            uuid: prev.uuid,
            refreshToken: prev.refreshToken,
            accessToken: prev.accessToken,
          };
        });

        if (formType === "register") {
          router.push("/");
        } else {
          toast("변경사항이 저장되었습니다.");
          router.back();
        }
      },
    }
  );

  const { user } = useUser(userInfo.accessToken);

  const { initialValues, validationSchema } = useFormikFactory(user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: () => {
      const registerUserData: UserInfo = {
        uuid: userInfo.uuid,
        name: formik.values.name,
        nickname: formik.values.nickname,
        birthday: parseBirthday(formik.values.birthday),
        phone_no: formatPartialPhoneNumberToComplete(formik.values.phone),
        address: formik.values.address,
        sex: formik.values.sex,
        unread_notice: userInfo.unread_notice,
        pain_areas: formik.values.pain_areas.map((symtom) => {
          return {
            name: symtom.name,
          };
        }),
      };
      mutate(registerUserData);
    },
  });

  const { refetch } = useQuery(
    ["nicknameDuplication", formik.values.nickname],
    () =>
      checkNicknameDuplication(formik.values.nickname, userInfo.accessToken),
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

  useEffect(() => {
    if (!!!addressObject.name) {
      return;
    }
    const tmp = R.omit(["uuid"], addressObject);
    formik.setFieldValue("address", tmp);
    checkAddressValidity();
  }, [addressObject]);

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

  const checkAddressValidity = () => {
    setIsAddressValid(
      !!addressObject.address &&
        !!addressObject.address_type &&
        !!addressObject.latitude &&
        !!addressObject.longitude &&
        !!addressObject.name
    );
  };

  const onNicknameValidation = () => {
    if (formType === "edit") {
      if (formik.values.nickname === userInfo.nickname) {
        setIsNicknameSame(true);
        setDidNicknameValidCheck(true);

        return;
      } else {
        setIsNicknameSame(false);
        refetch();
      }
    } else {
      setIsNicknameSame(false);
      refetch();
    }
  };

  const setModeHistory = (nextMode: number) => {
    setMode((prev) => prev.filter((mode) => mode !== nextMode));
    setMode((prev) => [...prev, nextMode]);
  };

  const onSearchBarClick = () => {
    setModal({ isActive: true });
    setModeHistory(1);
    // setMode((prev) => [...prev, 1]);
  };

  const onAddressMapButtonClick = () => {
    setModal({ isActive: true });
    setModeHistory(3);
    // setMode((prev) => [...prev, 3]);
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

  const isSubmittable = () => {
    return !(
      isAddressValid &&
      formik.isValid &&
      formik.dirty &&
      didNicknameValidCheck &&
      isNicknameValid
    );
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
                    onChange={formik.handleChange}
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
                  style={{
                    width: "22rem",
                  }}
                  id="nickname"
                  name="nickname"
                  placeholder="2글자 이상 10글자 이하"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length > 10) {
                      return;
                    }

                    if (e.target.value === userInfo.nickname) {
                    }
                    setDidNicknameValidCheck(false);
                    formik.handleChange(e);
                  }}
                  value={formik.values.nickname}
                />
                <Button
                  type="button"
                  text="중복확인"
                  width="8rem"
                  backgroundColor={theme.colors.purple_light2}
                  disabled={
                    formik.values.nickname.length === 0 ||
                    !!formik.errors.nickname
                  }
                  onClick={onNicknameValidation}
                />
              </div>

              <div className="noti">
                {formType === "edit" ? (
                  <>
                    {didNicknameValidCheck ? (
                      isNicknameSame ? (
                        <div className="invalid">
                          기존과 동일한 닉네임 입니다.
                        </div>
                      ) : isNicknameValid ? (
                        <div className="valid">사용 가능한 닉네임입니다.</div>
                      ) : (
                        <div className="invalid">중복된 닉네임이 있습니다.</div>
                      )
                    ) : (
                      <div className="invisible">dd</div>
                    )}
                  </>
                ) : (
                  <>
                    {didNicknameValidCheck ? (
                      isNicknameValid ? (
                        <div className="valid">사용 가능한 닉네임입니다.</div>
                      ) : (
                        <div className="invalid">중복된 닉네임이 있습니다.</div>
                      )
                    ) : (
                      <div className="invisible">dd</div>
                    )}
                  </>
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
              <label className="label">관심있는 지역</label>
              <div className="location-section">
                <SearchBar
                  inputText=""
                  placeHolder="주변 병원 정보를 보고 싶은 지역 검색"
                  onClick={onSearchBarClick}
                />
                <AddressMapButton
                  iconType="location"
                  text="현재 위치로 설정하기"
                  onClick={onAddressMapButtonClick}
                />
              </div>
              {!!formik.values.address.name && (
                <AliasAddressList
                  type={formik.values.address.address_type}
                  alias={formik.values.address.name}
                  address={formik.values.address.address}
                />
              )}
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
            <FloatButtonWrapper>
              <Button
                type="submit"
                text={formType === "edit" ? "저장하기" : "도수리 시작하기"}
                width="100%"
                bold
                height="5.2rem"
                borderRadius="0.3rem"
                backgroundColor={theme.colors.purple_light}
                disabled={isSubmittable()}
              />
            </FloatButtonWrapper>
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
    margin-bottom: 7.2rem;
  }

  .input-section {
    display: flex;
    gap: 2rem;
    width: 100%;

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

  .location-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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

const FloatButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 2rem;
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.colors.white};
`;
