import React, { FC, ReactNode } from "react";

import Icon from "@/util/Icon";
import Link from "next/link";
import SearchBar from "@/components/domain/Search/SearchBar";
import styled from "@emotion/styled";
import useGeolocation from "@/hooks/useGeolocation";

interface IHeaderProps {
  left?: boolean;
  center?: ReactNode;
  right?: ReactNode;
}

const Header: FC<IHeaderProps> = ({ left, center, right }) => {
  const { coordinates } = useGeolocation();

  return (
    <div
      css={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        "& .center": {
          flexGrow: 1,
        },
        height: "4.8rem",
        marginBottom: "1.5rem",
        padding: "0 1rem",
      }}
    >
      {process.env.NODE_ENV !== "production" && (
        <LocationBox>
          <div>lat {coordinates?.latitude}</div>
          <div>lng {coordinates?.longitude}</div>
        </LocationBox>
      )}
      <Link href="/">
        <a>{left && <Icon name="logo1" width="82" height="22" />}</a>
      </Link>
      <div className="center">{center}</div>
      <div>{right}</div>
    </div>
  );
};

export default Header;

const LocationBox = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  font-size: 20px;
`;
