import {
  addressModalContentState,
  addressModalState,
  addressModeState,
  addressObject,
  defaultAddressType,
  isNewAddress,
  locationState,
  selectedAddressObject,
} from "@/components/domain/Address/store";
import { useRecoilState, useResetRecoilState } from "recoil";

const useAddress = () => {
  const [modal, setModal] = useRecoilState(addressModalState);
  const resetAddressModalContentState = useResetRecoilState(
    addressModalContentState
  );
  const resetAddressModeState = useResetRecoilState(addressModeState);
  const resetAddressObject = useResetRecoilState(addressObject);
  const resetSelectedMyAddresOjbect = useResetRecoilState(
    selectedAddressObject
  );
  const resetIsNewAddres = useResetRecoilState(isNewAddress);
  const resetDefaultAddressType = useResetRecoilState(defaultAddressType);
  const resetLocationState = useResetRecoilState(locationState);

  const closeAddressModal = () => {
    setModal({ isActive: false });
    resetAddressModalContentState();
    resetAddressModeState();
    resetAddressObject();
    resetSelectedMyAddresOjbect();
    resetIsNewAddres();
    resetDefaultAddressType();
    resetLocationState();
  };

  return { closeAddressModal };
};

export default useAddress;
