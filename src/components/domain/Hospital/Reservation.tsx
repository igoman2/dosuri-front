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

const Reservation = () => {
  const userInfo = useRecoilValue(userInfoState);
  const [modal, setModal] = useRecoilState(reservationModalState);
  const setNoticeModal = useSetRecoilState(modalState);
  const setNoticeModalContent = useSetRecoilState(modalContentState);
  const theme = useTheme();
  const router = useRouter();
  const hospitalUuid = useContext(ReservationContext);

  const handleReservation = async () => {
    try {
      const hospital = hospitalUuid;
      const response = await createReservation({ hospital: hospital });
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
        <div className="gap bold">이름</div>
        <div>{userInfo.name}</div>
        <div className="gap bold last">핸드폰 번호</div>
        <div>{userInfo.phone_no}</div>
      </div>
      <ButtonsWrapper>
        <Button
          text="신청하기"
          width="100%"
          borderRadius="0.3rem"
          height="5.2rem"
          backgroundColor={theme.colors.purple_light}
          onClick={handleReservation}
          bold
        />
      </ButtonsWrapper>
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
