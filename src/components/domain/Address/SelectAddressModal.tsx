import FullModalBase from "@/components/Modal/FullModalBase";
import { useRecoilState } from "recoil";
import AddressComplete from "./AddressComplete";
import AddressMain from "./AddressMain";
import AddressSearch from "./AddressSearch";
import MapView from "./MapView";
import MyAddressMain from "./MyAddressMain";
import MyAddressEdit from "./MyAddressEdit";
import { addressModalState, addressModeState } from "./store";
import { useEffect, useState } from "react";
import MyAddressSearch from "./MyAddressSearch";
import useAddress from "@/hooks/useAddress";
import MyAddressSearchDetail from "./MyAddressSearchDetail";

const SelectAddressModal = () => {
  const [modal, setModal] = useRecoilState(addressModalState);
  const [mode, setMode] = useRecoilState(addressModeState);
  const [addressModalTitle, setAddressModalTitle] = useState("");
  const [backBtnVisibility, setBackBtnVisibility] = useState(false);
  const { closeAddressModal } = useAddress();

  const currentMode = mode.at(-1);

  const setModalTitle = () => {
    if (currentMode === 4) {
      setAddressModalTitle("내 주소 관리");
    } else if (currentMode === 3) {
      setAddressModalTitle("");
    } else {
      setAddressModalTitle("주소 설정");
    }
  };

  const setModalButtonType = () => {
    mode.length === 1
      ? setBackBtnVisibility(false)
      : setBackBtnVisibility(true);
  };

  const onClickBack = () => {
    setMode((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    setModalTitle();
    setModalButtonType();
  }, [mode]);

  return (
    <>
      {modal.isActive && (
        <FullModalBase
          isActive={false}
          onClose={() => {
            closeAddressModal();
          }}
          title={addressModalTitle}
          isBackBtnVisible={backBtnVisibility}
          onClickBack={onClickBack}
        >
          {currentMode === 0 && <AddressMain />}
          {currentMode === 1 && <AddressSearch />}
          {currentMode === 2 && <AddressComplete />}
          {currentMode === 3 && <MapView />}
          {currentMode === 4 && <MyAddressMain />}
          {currentMode === 5 && <MyAddressSearch />}
          {currentMode === 6 && <MyAddressSearchDetail />}
          {currentMode === 7 && <MyAddressEdit />}
        </FullModalBase>
      )}
    </>
  );
};

export default SelectAddressModal;
