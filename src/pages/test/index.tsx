import AliasAddressList from "@/components/domain/Address/AliasAddressList";
import AddressType from "@/components/domain/Address/AddressType";
import React from "react";

const testList = [
  { type: "home", alias: "집", address: null, uuid: "test-uuid-1" },
  {
    type: "company",
    alias: "회사",
    address: "역삼역 센터필드",
    uuid: "test-uuid-2",
  },
  {
    type: "customizedAlias",
    alias: "딸기타르트쫀맛",
    address: "롯데몰 타르타르",
    uuid: "test-uuid-3",
  },
];

const Test = () => {
  return (
    <div>
      <div
        css={{
          padding: "0px 30px",
        }}
      >
        {testList.map((a) => (
          <AliasAddressList
            type={a.type}
            alias={a.alias}
            address={a.address}
            key={a.uuid}
          />
        ))}
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "50px",
        }}
      >
        <AddressType type="home" text="집" />
        <AddressType type="company" text="회사" />
        <AddressType type="etc" text="기타" />
      </div>
    </div>
  );
};

export default Test;
