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
import {
  SearchedAddressByAddress,
  SearchedAddressByKeyword,
} from "@/types/location";
import {
  getLocationByAddress,
  getLocationByKeyword,
} from "@/service/apis/location";

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
  const selectedType = useRecoilValue(defaultAddressType);
  const [mode, setMode] = useRecoilState(addressModeState);
  const [searchedAddressList, setSearchedAddressList] = useState<
    SearchedAddressByAddress[]
  >([]);
  const [searchedKeywordAddressList, setSearchedKeywordAddressList] = useState<
    SearchedAddressByKeyword[]
  >([]);
  const [isQuerying, setIsQuerying] = useState(false);

  const handleSearch = async () => {
    const data = await getLocationByAddress({ query: inputText });
    if (!isSearchedAddressValid()) {
      const data = await getLocationByKeyword({ query: inputText });
      setSearchedKeywordAddressList(data.documents);
    } else {
      setSearchedAddressList(data.documents);
    }
    setIsQuerying(true);
  };

  const extractAddress = (address: SearchedAddressByAddress) => {
    if (!!address.road_address) {
      if (!!address.road_address.building_name) {
        return address.road_address.building_name;
      } else {
        if (!!address.road_address.region_3depth_name) {
          return `${address.road_address.region_3depth_name} ${address.road_address.road_name} ${address.road_address.main_building_no}`;
        } else {
          return address.road_address.address_name;
        }
      }
    }
    return `${address.address.region_3depth_name} ${
      address.address.main_address_no
    }${
      !!address.address.sub_address_no
        ? `-${address.address.sub_address_no}`
        : ""
    }`;
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
        isNewAddressValue && selectedType !== "etc" ? selectedType : "",
    };
    setSelectedAddressObject(newAddressObject);

    setLocation({
      longitude: Number(address.x),
      latitude: Number(address.y),
    });

    setModeHistory(nextMode);
  };

  const onKeywordAddressClick = (address: SearchedAddressByKeyword) => {
    const newAddressObject = {
      uuid: address.id,
      alias: "",
      name: address.place_name,
      address: address.address_name,
      longitude: Number(address.x),
      latitude: Number(address.y),
      address_type:
        isNewAddressValue && selectedType !== "etc" ? selectedType : "",
    };
    setSelectedAddressObject(newAddressObject);

    setLocation({
      longitude: Number(address.x),
      latitude: Number(address.y),
    });

    setModeHistory(nextMode);
  };

  const setModeHistory = (nextMode: number) => {
    setMode((prev) => prev.filter((mode) => mode !== nextMode));
    setMode((prev) => [...prev, nextMode]);
  };

  const isSearchedAddressValid = () => {
    if (searchedAddressList.length === 0) {
      return false;
    }

    if (!!!searchedAddressList[0].road_address) {
      return false;
    }

    return true;
  };

  const isSearchedKeywordAddressValid = () => {
    if (searchedKeywordAddressList.length === 0) {
      return false;
    }

    if (!!!searchedKeywordAddressList[0].address_name) {
      return false;
    }

    return true;
  };

  const renderAddressItem = () => {
    if (!isQuerying) {
      return null;
    } else if (isSearchedAddressValid()) {
      return searchedAddressList.map((address, idx) => (
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
      ));
    } else if (isSearchedKeywordAddressValid()) {
      return searchedKeywordAddressList.map((address, idx) => (
        <SearchedAddressList
          addressName={address.place_name}
          address={address.address_name}
          key={`address-${idx}`}
          onClick={() => onKeywordAddressClick(address)}
        />
      ));
    } else {
      return <div className="noneSearched">검색 결과가 없습니다.</div>;
    }
  };

  return (
    <Wrapper>
      <AddressSearchBar
        inputText={inputText}
        placeHolder="지번 또는 도로명으로 검색"
        onInput={onInput}
        enableDelete={enableDelete}
        onSearch={handleSearch}
      />
      <div className="searchedAddressList">{renderAddressItem()}</div>
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

  .noneSearched {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
  }
`;
