import styled from "@emotion/styled";
import plusIcon from "@/public/assets/plus.png";
import Image from "next/image";
import { useQuery } from "react-query";
import { getMyAddressList } from "@/service/apis/user";
import AliasAddressList from "./AliasAddressList";
import { useSetRecoilState } from "recoil";
import {
  addressModeState,
  defaultAddressType,
  isNewAddress,
  locationState,
  selectedAddressObject,
} from "./store";
import { MyAddressListResult } from "@/types/service";
import { useEffect, useState } from "react";

const MyAddressMain = () => {
  const setMode = useSetRecoilState(addressModeState);
  const setSelectedAddressObject = useSetRecoilState(selectedAddressObject);
  const setIsNewAddress = useSetRecoilState(isNewAddress);
  const setDefaultAddressType = useSetRecoilState(defaultAddressType);
  const setLocation = useSetRecoilState(locationState);
  const [isHome, setIsHome] = useState(false);
  const [isOffice, setIsOffice] = useState(false);

  const { data: myAddressList } = useQuery(
    "getMyAddressList",
    getMyAddressList
  );

  const addNewAddress = (type: string) => {
    setIsNewAddress(true);
    setDefaultAddressType(type);
    setMode(5);
  };

  const onAddressClick = (clickedAddressObject: MyAddressListResult) => {
    setLocation({
      latitude: clickedAddressObject.latitude,
      longitude: clickedAddressObject.longitude,
    });

    setIsNewAddress(false);
    setDefaultAddressType("");
    setSelectedAddressObject(clickedAddressObject);
    setMode(7);
  };

  const isHomeChecker = () => {
    if (myAddressList && myAddressList.results.length !== 0) {
      if (myAddressList.results[0].address_type === "home") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const isOfficeChecker = () => {
    if (myAddressList && myAddressList.results.length !== 0) {
      if (!isHome) {
        if (myAddressList.results[0].address_type === "office") {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          myAddressList.results.length > 1 &&
          myAddressList.results[1].address_type === "office"
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const addHome = () => {
    return (
      <AliasAddressList
        type="home"
        alias="집"
        key="addHome"
        onClick={() => addNewAddress("home")}
        address={null}
      />
    );
  };

  const addOffice = () => {
    return (
      <AliasAddressList
        type="office"
        alias="회사"
        key="addOffice"
        onClick={() => addNewAddress("office")}
        address={null}
      />
    );
  };

  const addHomeOffice = () => {
    if (!isHome) {
      if (!isOffice) {
        return (
          <div>
            {addHome()}
            {addOffice()}
          </div>
        );
      }
    }
  };

  useEffect(() => {
    setIsHome(isHomeChecker());
    setIsOffice(isOfficeChecker());
  });

  return (
    <Wrapper>
      <ButtonWrapper>
        <Image src={plusIcon} alt="plusIcon" width={24} height={24}></Image>
        <div
          className="addNewAddress"
          onClick={() => addNewAddress("typeUndefined")}
        >
          새 주소 추가
        </div>
      </ButtonWrapper>
      {addHomeOffice()}
      {myAddressList && myAddressList.results.length !== 0 ? (
        <>
          {myAddressList.results.map((myAddress, idx) =>
            idx === 0 && ((isHome && !isOffice) || (!isHome && isOffice)) ? (
              <div>
                {!isHome && isOffice ? (
                  <div>
                    {addHome()}
                    <AliasAddressList
                      type={myAddress.address_type}
                      alias={myAddress.name}
                      address={myAddress.address}
                      key={myAddress.uuid}
                      onClick={() => onAddressClick(myAddress)}
                    />
                  </div>
                ) : isHome && !isOffice ? (
                  <div>
                    <AliasAddressList
                      type={myAddress.address_type}
                      alias={myAddress.name}
                      address={myAddress.address}
                      key={myAddress.uuid}
                      onClick={() => onAddressClick(myAddress)}
                    />
                    {addOffice()}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <AliasAddressList
                type={myAddress.address_type}
                alias={myAddress.name}
                address={myAddress.address}
                key={myAddress.uuid}
                onClick={() => onAddressClick(myAddress)}
              />
            )
          )}
        </>
      ) : null}
    </Wrapper>
  );
};

export default MyAddressMain;

const Wrapper = styled.div`
  padding-bottom: 2rem; // [COMMENT] 이게 더 예쁘지 않나요?
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: ${(props) => props.theme.lineHeights.lg};
  color: ${(props) => props.theme.colors.purple_light};
  cursor: pointer;
  padding-bottom: 1rem;

  .addNewAddress {
    padding-left: 1rem;
  }
`;
