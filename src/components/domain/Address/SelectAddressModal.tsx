import FullModalBase from "@/components/Modal/FullModalBase";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { useRouter } from "next/router";

const SelectAddressModal = () => {
  const [modal, setModal] = useRecoilState(addressModalState);
  const [mode, setMode] = useRecoilState(addressModeState);
  const [addressModalTitle, setAddressModalTitle] = useState("");
  const [backBtnVisibility, setBackBtnVisibility] = useState(false);
  const { closeAddressModal } = useAddress();
  const router = useRouter();

  useEffect(() => {
    // popstate 이벤트를 감지하는 핸들러 함수
    const handleBackButtonEvent = (e: any) => {
      if (mode.length === 0) {
        setModal((prev) => ({ ...prev, isActive: false }));
        return;
      }

      onClickBack();
    };

    // popstate 이벤트 리스너 추가
    window.addEventListener("popstate", handleBackButtonEvent);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener("popstate", handleBackButtonEvent);
    };
  }, []);

  useEffect(() => {
    if (!modal.isActive) {
      return;
    }

    if (mode.length === 0) {
      setModal((prev) => ({ ...prev, isActive: false }));
      closeAddressModal();
    } else {
      router.push(
        {
          query: { mode: mode.at(-1) },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [mode, modal.isActive]);

  const currentMode = mode.at(-1);

  const onClickBack = () => {
    setMode((prev) => prev.slice(0, -1));
  };

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
