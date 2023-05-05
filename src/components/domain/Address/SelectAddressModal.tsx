import FullModalBase from "@/components/Modal/FullModalBase";
import { useRecoilState, useRecoilValue } from "recoil";
import AddressComplete from "./AddressComplete";
import AddressMain from "./AddressMain";
import AddressSearch from "./AddressSearch";
import MapView from "./MapView";
import MyAddressMain from "./MyAddressMain";
import MyAddressEdit from "./MyAddressEdit";
import { addressModalState, addressModeState, isNewAddress } from "./store";
import { FC, useEffect, useState } from "react";
import MyAddressSearch from "./MyAddressSearch";
import useAddress from "@/hooks/useAddress";
import MyAddressSearchDetail from "./MyAddressSearchDetail";

const SelectAddressModal = () => {
  const [modal, setModal] = useRecoilState(addressModalState);
  const [mode, setMode] = useRecoilState(addressModeState);
  const [addressModalTitle, setAddressModalTitle] = useState("");
  const [backBtnVisibility, setBackBtnVisibility] = useState(false);
  const isNewAddressValue = useRecoilValue(isNewAddress);
  const { closeAddressModal } = useAddress();

  const setModalTitle = () => {
    if (mode === 4) {
      setAddressModalTitle("내 주소 관리");
    } else if (mode === 3) {
      setAddressModalTitle("");
    } else {
      setAddressModalTitle("주소 설정");
    }
  };

  const setModalButtonType = () => {
    if (mode === 0 || mode === 4) {
      setBackBtnVisibility(false);
    } else {
      setBackBtnVisibility(true);
    }
  };

  const onClickBack = () => {
    if (backBtnVisibility) {
      if (mode === 7 && !isNewAddressValue) {
        setMode(4);
      } else {
        setMode(mode - 1);
      }
    }
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
          {mode === 0 && <AddressMain />}
          {mode === 1 && <AddressSearch />}
          {mode === 2 && <AddressComplete />}
          {mode === 3 && <MapView />}
          {mode === 4 && <MyAddressMain />}
          {mode === 5 && <MyAddressSearch />}
          {mode === 6 && <MyAddressSearchDetail />}
          {mode === 7 && <MyAddressEdit />}
        </FullModalBase>
      )}
    </>
  );
};

export default SelectAddressModal;
