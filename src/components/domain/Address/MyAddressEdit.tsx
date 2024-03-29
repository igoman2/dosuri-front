import AliasAddressList from "./AliasAddressList";
import AddressType from "./AddressType";
import AddressType2 from "./AddressType2";
import { useState, ChangeEvent, useEffect } from "react";
import AliasInputBar from "./AliasInputBar";
import styled from "@emotion/styled";
import AddressMapButton from "./AddressMapButton";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  addressModeState,
  defaultAddressType,
  isNewAddress,
  selectedAddressObject,
} from "./store";
import { modalContentState, modalState } from "@/components/Modal/store";
import SetAddressAliasButton from "./SetAddressAliasButton";
import { useDeleteMyAddress } from "@/hooks/service/useDeleteMyAddress";
import { getUser, registerMyAddress } from "@/service/apis/user";
import { queryClient } from "@/service/react-query/queryClient";
import { selectMyAddress } from "@/service/apis/user";
import { queryKeys } from "@/service/react-query/constants";
import { userInfoState } from "@/store/user";

const MyAddressEdit = () => {
  const [mode, setMode] = useRecoilState(addressModeState);
  const setModalIsActive = useSetRecoilState(modalState);
  const setModalContent = useSetRecoilState(modalContentState);
  const [selectedAddress, setSelectedAddress] = useRecoilState(
    selectedAddressObject
  );
  const resetSelectedAddress = useResetRecoilState(selectedAddressObject);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [inputText, setInputText] = useState(selectedAddress.alias ?? "");
  const isNewAddressValue = useRecoilValue(isNewAddress);
  const resetIsNewAddress = useResetRecoilState(isNewAddress);
  const [selectedType, setSelectedType] = useRecoilState(defaultAddressType);
  const resetSelectedType = useResetRecoilState(defaultAddressType);

  const { mutate } = useDeleteMyAddress();

  useEffect(() => {
    if (!isNewAddressValue && selectedType === "etc" && inputText === "")
      setInputText(selectedAddress.name);
  }, [selectedType]);

  const onClick = (type: string) => {
    setSelectedType(type);
    setSelectedAddress((prev) => ({ ...prev, address_type: type }));
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress((prev) => ({
      ...prev,
      alias: e.target.value,
    }));
    setInputText(e.target.value);
  };

  const setModeHistory = (nextMode: number) => {
    setMode((prev) => prev.filter((mode) => mode !== nextMode));
    setMode((prev) => [...prev, nextMode]);
  };

  const onAddressMapButtonClick = () => {
    setModeHistory(3);
    // setMode((prev) => [...prev, 3]);
  };

  const getAlias = () => {
    switch (selectedType) {
      case "home":
        return "집";
      case "office":
        return "회사";
      default:
        return inputText.length > 0 ? inputText : selectedAddress.name;
    }
  };

  const selectAddress = async (uuid: string) => {
    try {
      await selectMyAddress({
        uuid: uuid,
        isMain: true,
      });
      queryClient.invalidateQueries({
        queryKey: "getMyAddressList",
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.hospital,
        refetchInactive: true,
      });
      const resp = await getUser();
      const user = resp!;
      setUserInfo((prev) => {
        return {
          ...prev,
          address: user.address,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const registerAddress = async () => {
    const address = {
      name: getAlias(),
      address: selectedAddress.address,
      address_type: selectedType,
      latitude: selectedAddress.latitude,
      longitude: selectedAddress.longitude,
    };

    try {
      const response = await registerMyAddress(address);
      selectAddress(response.uuid);
      setMode([4]);
      // setModeHistory(4);
      // setMode((prev) => [...prev, 4]);
      resetSelectedType();
      resetSelectedAddress();
      resetIsNewAddress();
    } catch (e) {
      console.log(e);
    }
  };

  const onButtonClick = () => {
    if (!isNewAddressValue) {
      setModalIsActive({ isActive: true });
      setModalContent({
        title: "주소 대체하기",
        content: `기존에 등록된 ${selectedAddress.name} 주소를 대체할까요?`,
        actionCancel: {
          text: "취소",
          action: () => {
            setModalIsActive({ isActive: false });
          },
        },
        actionWarn: {
          text: "",
          action: () => {},
        },
        actionConfirm: {
          text: "대체하기",
          action: () => {
            mutate(selectedAddress.uuid, {
              onSuccess: () => {
                registerAddress();
                setModalIsActive({ isActive: false });
                setMode([4]);
                // setModeHistory(4);
                // setMode((prev) => [...prev, 4]);
              },
            });
          },
        },
      });
    } else {
      registerAddress();
      setModalIsActive({ isActive: false });
      setMode([4]);
      // setModeHistory(4);
      // setMode((prev) => [...prev, 4]);
    }
  };

  const onDeleteButtonClick = () => {
    setModalIsActive({ isActive: true });
    if (isCurrentAddress()) {
      setModalContent({
        title: "",
        content: `현재 사용 중인 주소는 삭제할 수 없습니다.`,
        actionCancel: {
          text: "",
          action: () => {},
        },
        actionConfirm: {
          text: "확인",
          action: () => {
            setModalIsActive({ isActive: false });
          },
        },
        actionWarn: {
          text: "",
          action: () => {},
        },
      });
    } else {
      setModalContent({
        title: "저장된 주소 삭제하기",
        content: `이 주소를 정말 삭제할까요?`,
        actionCancel: {
          text: "취소",
          action: () => {
            setModalIsActive({ isActive: false });
          },
        },
        actionConfirm: {
          text: "",
          action: () => {},
        },
        actionWarn: {
          text: "삭제",
          action: () => {
            mutate(selectedAddress.uuid, {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["getMyAddressList"],
                  refetchInactive: true,
                });
                setModalIsActive({ isActive: false });
                setMode([4]);
                // setModeHistory(4);
                // setMode((prev) => [...prev, 4]);
              },
            });
          },
        },
      });
    }
  };

  /**
   *
   * @returns {boolean} 유저가 현재 사용중인 주소인지 아닌지를 반환합니다.
   */
  const isCurrentAddress = () => {
    return selectedAddress.is_main;
  };

  const DeleteButton = () => {
    if (isCurrentAddress()) {
      return (
        <div className="delete disable" onClick={onDeleteButtonClick}>
          이 주소 삭제하기
        </div>
      );
    }

    if (!isNewAddressValue) {
      return (
        <div className="delete" onClick={onDeleteButtonClick}>
          이 주소 삭제하기
        </div>
      );
    }
  };

  const addressCompleteIsValid = () => {
    const address = {
      name: getAlias(),
      address: selectedAddress.address,
      address_type: selectedType,
      latitude: 0,
      longitude: 0,
    };

    if (!!!address.address || !!!address.address_type || !!!address.name) {
      return false;
    }

    return true;
  };

  return (
    <Wrapper>
      <AliasAddressList
        type={selectedAddress.address_type}
        alias={selectedAddress.name}
        address={selectedAddress.address}
        fullDivider={true}
      />
      <div className="addressType">
        {selectedType === "home" ||
        (isNewAddressValue && selectedType === "home") ? (
          <AddressType2 type="home" text="집" onClick={() => onClick("home")} />
        ) : (
          <AddressType type="home" text="집" onClick={() => onClick("home")} />
        )}
        {selectedType === "office" ||
        (isNewAddressValue && selectedType === "office") ? (
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
          <AddressType2 type="etc" text="기타" onClick={() => onClick("etc")} />
        ) : (
          <AddressType type="etc" text="기타" onClick={() => onClick("etc")} />
        )}
      </div>
      {selectedType === "etc" ? (
        <div className="inputBar">
          <AliasInputBar
            inputText={inputText}
            onInput={onInput}
            placeHolder="주소 별칭 설정 (최대 10자)"
          />
        </div>
      ) : null}
      {DeleteButton()}
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

export default MyAddressEdit;

const Wrapper = styled.div`
  .addressType {
    display: flex;
    flex-grow: 1;
    gap: 1.9rem;
    padding: 2rem 0rem 3rem 0rem;
  }

  .inputBar {
    padding-bottom: 3rem;
  }

  .delete {
    color: ${(props) => props.theme.colors.red};
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    text-align: center;

    &.disable {
      color: ${(props) => props.theme.colors.grey};
    }
  }
`;

const ButtonsWrapper = styled.div`
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
  display: flex;
  position: absolute;
  bottom: 1rem;
  flex-direction: column;
  gap: 2.5rem;
`;
