import styled from "@emotion/styled";
import Image from "next/image";
import PhoneIcon from "@/public/assets/phone-bold.png";
import Button from "@/components/Button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoState } from "@/store/user";
import { useTheme } from "@emotion/react";
import { reservationModalState } from "./store";
import { useRouter } from "next/router";
import { createReservation } from "@/service/apis/hospital";
import { useContext } from "react";
import { ReservationContext } from "./ReservationModal";
import { modalContentState, modalState } from "@/components/Modal/store";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

const Reservation = () => {
  const userInfo = useRecoilValue(userInfoState);
  const [modal, setModal] = useRecoilState(reservationModalState);
  const setNoticeModal = useSetRecoilState(modalState);
  const setNoticeModalContent = useSetRecoilState(modalContentState);
  const theme = useTheme();
  const router = useRouter();
  const hospitalUuid = useContext(ReservationContext);

  const handleReservation = async ({
    name,
    phone,
  }: {
    name: string;
    phone: string;
  }) => {
    try {
      const sendData = {
        hospital: hospitalUuid,
        name: name,
        phone_no: phone,
        reservation_date: new Date(),
      };

      const response = await createReservation(sendData);
      setNoticeModal({ isActive: true });
      setNoticeModalContent({
        title: "",
        content: "예약이 신청되었습니다. 병원에서 곧 전화를 드립니다.",
        actionCancel: {
          text: "",
          action: () => {},
        },
        actionWarn: {
          text: "",
          action: () => {},
        },
        actionConfirm: {
          text: "확인",
          action: () => {
            setNoticeModal({ isActive: false });
          },
        },
      });
      setModal(false);
      router.back();
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: userInfo.name ?? "",
      phone: userInfo.phone_no ?? "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      phone: Yup.string().length(8).required(),
    }),
    onSubmit: (data) => {
      console.log("data :>> ", data);
      handleReservation(data);
    },
  });

  return (
    <ReservationWrapper>
      <div className="guide">
        <Image src={PhoneIcon} alt="phone-icon" width={45} height={45}></Image>
        <div className="text">
          <div className="bold colored">
            예약을 위해 병원에서 직접 전화드려요
          </div>
          <div>처음 보는 번호로 전화가 와도 꼭 받아주세요.</div>
        </div>
      </div>
      <div className="info">
        <div className="gap bold colored">예약하는 분 정보</div>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="divider">
              <label className="label gap bold" htmlFor="name">
                이름
              </label>
              <Field
                className={"field"}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="이름 입력"
              />
            </div>
            <div className="divider">
              <label className="label gap bold" htmlFor="phone">
                예약자 핸드폰 번호
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
            <ButtonsWrapper>
              <Button
                text="신청하기"
                width="100%"
                borderRadius="0.3rem"
                height="5.2rem"
                backgroundColor={theme.colors.purple_light}
                bold
                type="submit"
              />
            </ButtonsWrapper>
          </form>
        </FormikProvider>
      </div>
    </ReservationWrapper>
  );
};

export default Reservation;

const ReservationWrapper = styled.div`
  .guide {
    display: flex;

    .text {
      margin-left: 0.5rem;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
    }
  }

  .bold {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: bold;
  }

  .colored {
    color: ${(props) => props.theme.colors.purple};
  }

  .info {
    margin-top: 2.5rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};

    .gap {
      margin-bottom: 1rem;
    }

    .last {
      margin-top: 2rem;
    }

    .divider {
      margin-bottom: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-section {
      display: flex;
      gap: 2rem;
      width: 100%;

      &.phone {
        gap: 1rem;
      }
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
  }
`;

const ButtonsWrapper = styled.div`
  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: ${(props) => props.theme.lineHeights.lg};
  /* color: ${(props) => props.theme.colors.purple_light}; */
  position: fixed;
  bottom: 1rem;
  width: calc(100% - 4rem);
`;
