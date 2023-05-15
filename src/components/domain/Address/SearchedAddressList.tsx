import AddressDivider from "@/components/Divider/AddressDivider";
import styled from "@emotion/styled";
import { FC } from "react";
export interface SearchedAddressListProp {
  addressName: string;
  address: string;
  onClick: () => void;
}
const SearchedAddressList: FC<SearchedAddressListProp> = ({
  address,
  addressName,
  onClick,
}) => {
  return (
    <Wrapper onClick={onClick}>
      <div className="addressName">{addressName}</div>
      <div className="address">{address}</div>
      <AddressDivider height={1} />
    </Wrapper>
  );
};

export default SearchedAddressList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .addressName {
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
  }

  .address {
    padding-top: 0.3rem;
    padding-bottom: 0.8rem;
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    color: ${(props) => props.theme.colors.grey};
  }
`;
