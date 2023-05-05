import { useRecoilState } from "recoil";
import {
  addressModalState,
  addressModeState,
} from "@/components/domain/Address/store";
const Address = () => {
  const [modal, setModal] = useRecoilState(addressModalState);
  const [mode, setMode] = useRecoilState(addressModeState);
  return setMode(0);
};

export default Address;
