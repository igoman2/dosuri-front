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
import { SearchedAddressByAddress } from "@/types/location";
import { getLocationByAddress } from "@/service/apis/location";

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
    SearchedAddressByAddress[]
  >([]);

  const handleSearch = async () => {
    const data = await getLocationByAddress({ query: inputText });
    setSearchedAddressList(data.documents);
  };

  const extractAddress = (address: SearchedAddressByAddress) => {
    console.log(address);
    if (!!address.road_address) {
      return !!address.road_address.building_name
        ? address.road_address.building_name
        : `${address.road_address.region_3depth_name} ${address.road_address.road_name}-${address.road_address.main_building_no}`;
    }

    return `${address.address.region_3depth_name} ${address.address.main_address_no}-${address.address.sub_address_no}`;
  };

  const onAddressClick = (address: SearchedAddressByAddress) => {
    const newAddressObject = {
      uuid: "",
      alias: "",
      name: extractAddress(address),
      address: !!address.road_address
        ? address.road_address.address_name
        : address.address_name,
      longitude: Number(address.x),
      latitude: Number(address.y),
      address_type:
        isNewAddressValue && defaultAddressTypeValue !== "etc"
          ? defaultAddressTypeValue
          : "",
    };
    setSelectedAddressObject(newAddressObject);

    setLocation({
      longitude: Number(address.x),
      latitude: Number(address.y),
    });

    setMode((prev) => [...prev, nextMode]);
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
            addressName={extractAddress(address)}
            address={
              !!address.road_address
                ? address.road_address.address_name
                : address.address.address_name
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
