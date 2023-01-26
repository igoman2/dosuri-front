import { Field, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";

import Button from "@/components/Button";
import Checkbox from "@/components/UI/Checkbox";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import _ from "lodash";
import styled from "@emotion/styled";
import { useResignUser } from "@/hooks/service/useResignUser";
import { useTheme } from "@emotion/react";

interface FormValues {
  resignReason: string;
}

const Resign = () => {
  const initialValues: FormValues = { resignReason: "" };

  const [reason, setReason] = useState([
    {
      checked: false,
      text: "서비스가 마음에 들지 않아요.",
    },
    {
      checked: false,
      text: "다른 서비스를 주로 사용해요.",
    },
    {
      checked: false,
      text: "정보가 충분하지 않아요.",
    },
    {
      checked: false,
      text: "다른 계정으로 이용하고 있어요.",
    },
    {
      checked: false,
      text: "탈퇴 후 재가입 하고 싶어요.",
    },
    {
      checked: false,
      text: "기타",
    },
  ]);
  const theme = useTheme();
  const [agree, setAgree] = useState(false);

  const { mutate } = useResignUser();

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      mutate({
        reason:
          reason.find((re) => re.checked)?.text ?? formik.values.resignReason,
      });
    },
  });

  const resignHandler = () => {
    formik.handleSubmit();
  };

  const canSubmit = () => {
    if (reason[5].checked) {
      return formik.values.resignReason.length >= 20 && agree;
    } else {
      return !!reason.find((re) => re.checked) && agree;
    }
  };

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <ResignWrapper>
        <div className="sub-title">회원 탈퇴</div>
        <div className="setting-layout">
          <FormikProvider value={formik}>
            <form>
              <div className="section-mid">
                <div className="information">
                  회원 탈퇴 시, 회원 정보와 포인트, 작성한 글 등 모든 정보가
                  삭제되며 복구할 수 없습니다.
                </div>
                <div className="question">탈퇴하시는 이유가 무엇인가요?</div>
                <CheckboxWrapper>
                  <Checkbox
                    text="서비스가 마음에 들지 않아요."
                    value={reason[0].checked}
                    onClick={() =>
                      setReason((prev) => {
                        const tmp = [...prev];
                        tmp[0].checked = !prev[0].checked;
                        tmp[5].checked = false;
                        tmp[5].text = "";
                        return tmp;
                      })
                    }
                  />
                  <Checkbox
                    text="다른 서비스를 주로 사용해요."
                    value={reason[1].checked}
                    onClick={() =>
                      setReason((prev) => {
                        const tmp = [...prev];
                        tmp[1].checked = !prev[1].checked;
                        tmp[5].checked = false;
                        tmp[5].text = "";
                        return tmp;
                      })
                    }
                  />
                  <Checkbox
                    text="정보가 충분하지 않아요."
                    value={reason[2].checked}
                    onClick={() =>
                      setReason((prev) => {
                        const tmp = [...prev];
                        tmp[2].checked = !prev[2].checked;
                        tmp[5].checked = false;
                        tmp[5].text = "";
                        return tmp;
                      })
                    }
                  />
                  <Checkbox
                    text="다른 계정으로 이용하고 있어요."
                    value={reason[3].checked}
                    onClick={() =>
                      setReason((prev) => {
                        const tmp = [...prev];
                        tmp[3].checked = !prev[3].checked;
                        tmp[5].checked = false;
                        tmp[5].text = "";
                        return tmp;
                      })
                    }
                  />
                  <Checkbox
                    text="탈퇴 후 재가입 하고 싶어요."
                    value={reason[4].checked}
                    onClick={() =>
                      setReason((prev) => {
                        const tmp = [...prev];
                        tmp[4].checked = !prev[4].checked;
                        tmp[5].checked = false;
                        tmp[5].text = "";
                        return tmp;
                      })
                    }
                  />
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                    }}
                  >
                    <Checkbox
                      text="기타"
                      value={reason[5].checked}
                      onClick={() =>
                        setReason((prev) => {
                          const tmp = [...prev];
                          prev.forEach((val) => {
                            if (val.text === "기타") {
                              return;
                            }

                            return (val.checked = false);
                          });
                          tmp[5].checked = !prev[5].checked;
                          return tmp;
                        })
                      }
                    />
                    <span
                      css={{
                        color: theme.colors.grey,
                        fontSize: theme.fontSizes.md,
                        lineHeight: theme.lineHeights.md,
                      }}
                    >
                      {formik.values.resignReason.length}자 / 최소 20자
                    </span>
                  </div>
                </CheckboxWrapper>

                <Field
                  className="field"
                  component="textarea"
                  id="resignReason"
                  name="resignReason"
                  disabled={!reason[5].checked}
                  placeholder="탈퇴 사유를 적어주세요 (20자 이상)"
                />
              </div>
            </form>
          </FormikProvider>

          <div className="section-bottom">
            <Checkbox
              text="모든 정보를 삭제하는 것에 동의합니다."
              value={agree}
              onClick={() => setAgree((prev) => !prev)}
            />
            <div className="save-button-wrapper">
              <Button
                type="submit"
                text="탈퇴하기"
                width="100%"
                height="5.2rem"
                disabled={!canSubmit()}
                onClick={resignHandler}
              />
            </div>
          </div>
        </div>
      </ResignWrapper>
    </Layout>
  );
};

export default Resign;

const ResignWrapper = styled.div`
  height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;

  .setting-layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .sub-title {
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .information {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    margin-bottom: 4rem;
  }

  .question {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .field {
    width: 100%;
    height: 8rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    flex-grow: 1;
    padding: 1rem;
    vertical-align: top;
    resize: none;

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
    }
  }

  .save-button-wrapper {
    margin-top: 1.5rem;
    padding: 1rem 0;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;
