import { useRecoilState } from "recoil";
import { reservationModalState } from "./store";
import FullModalBase from "@/components/Modal/FullModalBase";
import Reservation from "./Reservation";

const ReservationModal = () => {
  const [modal, setModal] = useRecoilState(reservationModalState);
  const onClose = () => {
    setModal(false);
  };
  return (
    <>
      {modal && (
        <FullModalBase
          isActive={false}
          title="예약하기"
          isBackBtnVisible={true}
          onClickBack={onClose}
          onClose={onClose}
        >
          <Reservation />
        </FullModalBase>
      )}
    </>
  );
};
export default ReservationModal;
