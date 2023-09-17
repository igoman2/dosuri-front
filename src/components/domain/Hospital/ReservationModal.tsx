import { useRecoilState } from "recoil";
import { reservationModalState } from "./store";
import FullModalBase from "@/components/Modal/FullModalBase";
import Reservation from "./Reservation";
import { FC, useEffect } from "react";
import { createContext } from "react";

interface ReservationModalProps {
  hospitalUuid: string;
}

export const ReservationContext = createContext("");

const ReservationModal: FC<ReservationModalProps> = ({ hospitalUuid }) => {
  const [modal, setModal] = useRecoilState(reservationModalState);
  const onClose = () => {
    setModal(false);
  };
  return (
    // <ReservationContext.Provider value={hospitalUuid}>
    <>
      {modal && (
        <FullModalBase
          isActive={false}
          title="예약하기"
          isBackBtnVisible={true}
          onClickBack={onClose}
          onClose={onClose}
        >
          <ReservationContext.Provider value={hospitalUuid}>
            <Reservation />
          </ReservationContext.Provider>
        </FullModalBase>
      )}
    </>
    // </ReservationContext.Provider>
  );
};
export default ReservationModal;
