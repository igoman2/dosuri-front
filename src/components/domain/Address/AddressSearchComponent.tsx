import { ChangeEvent, FC, useState } from "react";
import styled from "@emotion/styled";
import AddressSearchBar from "./AddressSearchBar";
import SearchedAddressList from "./SearchedAddressList";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  addressModeState,
  defaultAddressType,
  isNewAddress,
  locationState,
  selectedAddressObject,
} from "./store";
import { SearchedAddressByKeyword } from "@/types/location";
import { getLocationByKeyword } from "@/service/apis/location";

interface AddressSearchComponentProps {
  inputText: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  enableDelete: boolean;
  nextMode: number;
}

const AddressSearchComponent: FC<AddressSearchComponentProps> = ({
  inputText,
  onInput,
  enableDelete,
  nextMode,
}) => {
  const [location, setLocation] = useRecoilState(locationState);
  const setSelectedAddressObject = useSetRecoilState(selectedAddressObject);
  const isNewAddressValue = useRecoilValue(isNewAddress);
  const defaultAddressTypeValue = useRecoilValue(defaultAddressType);
  const [mode, setMode] = useRecoilState(addressModeState);
  const [searchedAddressList, setSearchedAddressList] = useState<
    SearchedAddressByKeyword[]
  >([]);

  const handleSearch = async () => {
    const data = await getLocationByKeyword({ query: inputText });
    setSearchedAddressList(data.documents);
  };

  const onAddressClick = (address: any) => {
    console.log(defaultAddressType);
    const newAddressObject = {
      uuid: "",
      name: address.place_name,
      address: !!address.road_address_name
        ? address.road_address_name
        : address.address_name,
      longitude: address.x,
      latitude: address.y,
      address_type:
        isNewAddressValue && defaultAddressTypeValue !== "etc"
          ? defaultAddressTypeValue
          : "",
    };
    setSelectedAddressObject(newAddressObject);

    setLocation({
      longitude: address.x,
      latitude: address.y,
    });

    setMode(nextMode);
  };
  return (
    <Wrapper>
      <AddressSearchBar
        inputText={inputText}
        placeHolder="장소명, 건물명, 지번 또는 도로명으로 검색"
        onInput={onInput}
        enableDelete={enableDelete}
        onSearch={handleSearch}
      />
      <div className="searchedAddressList">
        {searchedAddressList.map((address, idx) => (
          <SearchedAddressList
            addressName={address.place_name}
            address={
              !!address.road_address_name
                ? address.road_address_name
                : address.address_name
            }
            key={`address-${idx}`}
            onClick={() => onAddressClick(address)}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default AddressSearchComponent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .searchedAddressList {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
`;
