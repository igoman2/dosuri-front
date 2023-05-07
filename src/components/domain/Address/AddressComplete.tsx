import styled from "@emotion/styled";
import { useState, ChangeEvent } from "react";
import AliasAddressList from "./AliasAddressList";
import AddressType from "./AddressType";
import AddressType2 from "./AddressType2";
import AddressMapButton from "./AddressMapButton";
import AliasInputBar from "./AliasInputBar";
import { useRecoilState, useSetRecoilState } from "recoil";
import { addressModeState, selectedAddressObject } from "./store";
import SetAddressAliasButton from "./SetAddressAliasButton";
import { registerMyAddress } from "@/service/apis/user";
import { queryClient } from "@/service/react-query/queryClient";
import { useRouter } from "next/router";
import useAddress from "@/hooks/useAddress";

const AddressComplete = () => {
  const [addressObject, setAddressObject] = useRecoilState(
    selectedAddressObject
  );
  const [selectedType, setSelectedType] = useState(
    addressObject.address_type ?? ""
  );
  const [inputText, setInputText] = useState(addressObject.alias ?? "");
  const setMode = useSetRecoilState(addressModeState);
  const router = useRouter();
  const { closeAddressModal } = useAddress();

  const onClick = (type: string) => {
    setSelectedType(type);
    setAddressObject((prev) => ({ ...prev, address_type: type }));
  };

  const onAddressMapButtonClick = () => {
    setMode((prev) => [...prev, 3]);
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressObject((prev) => ({
      ...prev,
      alias: e.target.value,
    }));
    setInputText(e.target.value);
  };

  const getAlias = () => {
    switch (selectedType) {
      case "home":
        return "집";
      case "office":
        return "회사";
      default:
        return inputText;
    }
  };

  const onButtonClick = async () => {
    if (router.pathname === "/register") {
      {
        closeAddressModal();
        return;
      }
    }

    const address = {
      name: getAlias(),
      address: addressObject.address,
      address_type: selectedType,
      latitude: addressObject.latitude,
      longitude: addressObject.longitude,
    };

    try {
      await registerMyAddress(address);
      queryClient.invalidateQueries({
        queryKey: ["getMyAddressList"],
        refetchInactive: true,
      });
      setMode((prev) => [...prev, 1]);
      closeAddressModal();
    } catch (e) {
      console.log(e);
    }
  };

  const addressCompleteIsValid = () => {
    const address = {
      name: getAlias(),
      address: addressObject.address,
      address_type: selectedType,
      latitude: 0,
      longitude: 0,
    };

    if (!!!address.address || !!!address.address_type) {
      return false;
    }

    if (address.address_type === "etc" && !!!address.name) {
      return false;
    }

    return true;
  };

  return (
    <Wrapper>
      <div className="contentsTop">
        <AliasAddressList
          type="customizedAlias"
          alias={addressObject.name}
          address={addressObject.address}
          fullDivider={true}
        />
        <div className="addressType">
          {selectedType === "home" ? (
            <AddressType2
              type="home"
              text="집"
              onClick={() => onClick("home")}
            />
          ) : (
            <AddressType
              type="home"
              text="집"
              onClick={() => onClick("home")}
            />
          )}
          {selectedType === "office" ? (
            <AddressType2
              type="office"
              text="회사"
              onClick={() => onClick("office")}
            />
          ) : (
            <AddressType
              type="office"
              text="회사"
              onClick={() => onClick("office")}
            />
          )}
          {selectedType === "etc" ? (
            <AddressType2
              type="etc"
              text="기타"
              onClick={() => onClick("etc")}
            />
          ) : (
            <AddressType
              type="etc"
              text="기타"
              onClick={() => onClick("etc")}
            />
          )}
        </div>

        {selectedType === "etc" ? (
          <AliasInputBar
            inputText={inputText}
            onInput={onInput}
            placeHolder="주소 별칭 설정 (최대 10자)"
          />
        ) : null}
      </div>
      <ButtonsWrapper>
        <AddressMapButton
          iconType="map"
          text="지도에서 위치 확인하기"
          onClick={onAddressMapButtonClick}
        />
        <SetAddressAliasButton
          onClick={onButtonClick}
          isValid={addressCompleteIsValid()}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default AddressComplete;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin-bottom: 140px;

  .contentsTop {
    input {
      :focus {
        outline: none;
      }
    }
  }

  .addressType {
    display: flex;
    flex-grow: 1;
    gap: 1.9rem;
    padding: 2rem 0rem 3rem 0rem;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 1rem;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
`;
