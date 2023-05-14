import styled from "@emotion/styled";
import SearchBar from "../Search/SearchBar";
import AddressMapButton from "./AddressMapButton";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { addressModeState, locationState } from "./store";
import { useEffect } from "react";

const MyAddressSearch = () => {
  const setMode = useSetRecoilState(addressModeState);
  const resetLocation = useResetRecoilState(locationState);

  useEffect(() => {
    resetLocation();
  }, []);

  const onSearchBarClick = () => {
    setMode((prev) => [...prev, 6]);
  };

  const onAddressMapButtonClick = () => {
    setMode((prev) => [...prev, 3]);
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
export default MyAddressSearch;

const Wrapper = styled.div`
  .button {
    padding: 20px 0;
  }
`;
