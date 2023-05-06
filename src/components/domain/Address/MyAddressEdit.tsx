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
import { registerMyAddress } from "@/service/apis/user";
import { queryClient } from "@/service/react-query/queryClient";

const MyAddressEdit = () => {
  const setMode = useSetRecoilState(addressModeState);
  const setModalIsActive = useSetRecoilState(modalState);
  const setModalContent = useSetRecoilState(modalContentState);
  const selectedAddress = useRecoilValue(selectedAddressObject);
  const [selectedType, setSelectedType] = useState("");
  const [inputText, setInputText] = useState("");
  const isNewAddressValue = useRecoilValue(isNewAddress);
  const resetIsNewAddress = useResetRecoilState(isNewAddress);
  const [preselectedType, setPreselectedType] =
    useRecoilState(defaultAddressType);
  const resetDefaultAddressTyep = useResetRecoilState(defaultAddressType);
  const { mutate } = useDeleteMyAddress();

  const onClick = (type: string) => {
    setPreselectedType("");
    setSelectedType(type);
    setInputText("");
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onAddressMapButtonClick = () => {
    setMode((prev) => [...prev, 3]);
  };

  const getAlias = () => {
    switch (selectedType) {
      case "home":
        return "집";
      case "office":
        return "회사";
      default:
        return inputText.length > 0 ? inputText : selectedAddress.address;
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
      await registerMyAddress(address);
      queryClient.invalidateQueries({
        queryKey: ["getMyAddressList"],
        refetchInactive: true,
      });
      setMode((prev) => [...prev, 4]);
      resetDefaultAddressTyep();
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
                setMode((prev) => [...prev, 4]);
              },
            });
          },
        },
      });
    } else {
      registerAddress();
      setModalIsActive({ isActive: false });
      setMode((prev) => [...prev, 4]);
    }
  };

  const onDeleteButtonClick = () => {
    if (isCurrentAddress()) {
      return;
    }
    setModalIsActive({ isActive: true });

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
              setMode((prev) => [...prev, 4]);
            },
          });
        },
      },
    });
  };

  useEffect(() => {
    if (!isNewAddressValue) {
      setSelectedType(selectedAddress.address_type);
    } else {
      setSelectedType(preselectedType);
    }
  }, []);

  useEffect(() => {
    if (!isNewAddressValue && selectedType === "etc" && inputText === "")
      setInputText(selectedAddress.name);
  }, [selectedType]);

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
        (isNewAddressValue && preselectedType === "home") ? (
          <AddressType2 type="home" text="집" onClick={() => onClick("home")} />
        ) : (
          <AddressType type="home" text="집" onClick={() => onClick("home")} />
        )}
        {selectedType === "office" ||
        (isNewAddressValue && preselectedType === "office") ? (
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
      cursor: disable;
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
