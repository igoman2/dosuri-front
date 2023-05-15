import styled from "@emotion/styled";
import SearchBar from "../Search/SearchBar";
import AliasAddressList from "@/components/domain/Address/AliasAddressList";
import AddressMapButton from "./AddressMapButton";
import { useQuery } from "react-query";
import { getUser } from "@/service/apis/user";
import { getMyAddressList, selectMyAddress } from "@/service/apis/user";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { addressModeState, locationState } from "./store";
import { userInfoState } from "@/store/user";
import { useEffect, useState } from "react";
import { queryClient } from "@/service/react-query/queryClient";
import useAddress from "@/hooks/useAddress";
import { queryKeys } from "@/service/react-query/constants";

const AddressMain = () => {
  const setMode = useSetRecoilState(addressModeState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedAddress, setSelectedAddress] = useState(
    userInfo?.address?.uuid ?? ""
  );
  const { closeAddressModal } = useAddress();
  const resetLocation = useResetRecoilState(locationState);

  const { data: myAddressList } = useQuery(
    "getMyAddressList",
    getMyAddressList
  );

  useEffect(() => {
    resetLocation();
  }, []);

  const onSearchBarClick = () => {
    setModeHistory(1);
    // setMode((prev) => [...prev, 1]);
  };

  const onAddressMapButtonClick = () => {
    setModeHistory(3);
    // setMode((prev) => [...prev, 3]);
  };

  const setModeHistory = (nextMode: number) => {
    setMode((prev) => prev.filter((mode) => mode !== nextMode));
    setMode((prev) => [...prev, nextMode]);
    console.log(mode);
  };

  const selectAddress = async (uuid: string) => {
    setSelectedAddress(uuid);
    try {
      // FIXME: api는 hook으로 빼야함
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
    closeAddressModal();
  };

  return (
    <AddressConfigWrapper>
      <SearchBar
        inputText=""
        placeHolder="장소명, 건물명, 지번 또는 도로명으로 검색"
        onClick={onSearchBarClick}
      />
      <div className="button">
        <AddressMapButton
          iconType="location"
          text="현재 위치로 주소 찾기"
          onClick={onAddressMapButtonClick}
        />
      </div>
      {myAddressList && myAddressList.results.length !== 0 ? (
        <>
          {myAddressList.results.map((myAddress) => (
            <AliasAddressList
              type={myAddress.address_type}
              alias={myAddress.name}
              address={myAddress.address}
              key={myAddress.uuid}
              onClick={() => selectAddress(myAddress.uuid)}
              clicked={myAddress.uuid === selectedAddress ? true : false}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </AddressConfigWrapper>
  );
};

const AddressConfigWrapper = styled.div`
  padding-bottom: 2rem; // [COMMENT] 이게 더 예쁘지 않나요?
  .button {
    padding: 20px 0;
  }
`;

export default AddressMain;
