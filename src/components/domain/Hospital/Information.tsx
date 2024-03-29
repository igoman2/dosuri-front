import React, { FC, useEffect } from "react";

import Button from "@/components/Button";
import { EmptyText } from "@/components/etc/emotion/EmptyText";
import { IGetHospitalInfo } from "@/types/service";
import TimeTable from "@/components/TimeTable";
import { formatPhoneNumber } from "@/util/format";
import { phoneCall } from "@/util/phoneCall";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import HospitalMapView from "./HospitalMapView";
import { useRouter } from "next/router";
import Link from "next/link";

interface IInformationProps {
  hospitalData: IGetHospitalInfo;
}

const Information: FC<IInformationProps> = ({ hospitalData }) => {
  const theme = useTheme();
  const router = useRouter();
  const 전화예약가능 = router.asPath.includes(
    "dd53e8ffb1bd45a3a0ed7517af6069e0"
  );

  return (
    <HospitalInformationWrapper>
      <div>
        <Content>
          <div className="list">
            <div className="list-title">진료시간</div>
            {hospitalData.calendar ? (
              <>
                <TimeTable
                  times={{
                    monday: hospitalData.calendar.monday,
                    tuesday: hospitalData.calendar.tuesday,
                    wednesday: hospitalData.calendar.wednesday,
                    thursday: hospitalData.calendar.thursday,
                    friday: hospitalData.calendar.friday,
                    saturday: hospitalData.calendar.saturday,
                    sunday: hospitalData.calendar.sunday,
                  }}
                />
                {hospitalData.calendar.lunch_time && (
                  <li
                    css={{
                      paddingLeft: "1rem",
                      marginBottom: "1rem",
                      listStyleType: "disc",
                      fontSize: theme.fontSizes.md,
                    }}
                  >
                    평일 오후 {hospitalData.calendar.lunch_time} 시는 점심시간
                    입니다.
                  </li>
                )}
              </>
            ) : (
              <EmptyText>등록된 진료 시간이 없습니다.</EmptyText>
            )}
          </div>
          <div className="list">
            <div className="list-title">주소</div>
            {hospitalData.address ? (
              <div>
                <div className="hospital-address">{hospitalData.address}</div>
                <HospitalMapView
                  latitude={hospitalData.latitude}
                  longitude={hospitalData.longitude}
                ></HospitalMapView>
              </div>
            ) : (
              <EmptyText>등록된 주소가 없습니다.</EmptyText>
            )}
          </div>
          {/* <div className="list">
            <div className="list-title">주차</div>
            {hospitalData.parking_info ? (
              <div>{hospitalData.parking_info}</div>
            ) : (
              <EmptyText>등록된 주차 정보가 없습니다.</EmptyText>
            )}
          </div> */}
          <div className="list">
            <div className="list-title">병원 소개</div>
            {hospitalData.introduction ? (
              <>
                <div>
                  {hospitalData.introduction
                    .split("\n")
                    .map((str, index, array) =>
                      index === array.length - 1 ? (
                        str
                      ) : (
                        <div key={index}>
                          {str}
                          <br />
                        </div>
                      )
                    )}
                </div>

                {전화예약가능 && (
                  <Link href="https://m.booking.naver.com/booking/13/bizes/625475?theme=place&entry=pll&area=pll">
                    <a target="_blank" rel="noopener noreferrer">
                      <span className="link">네이버 예약</span>
                    </a>
                  </Link>
                )}
              </>
            ) : (
              <EmptyText>등록된 병원 소개가 없습니다.</EmptyText>
            )}
          </div>
          <div className="list">
            <div className="list-title">치료 키워드</div>
            {hospitalData.keywords.length !== 0 ? (
              <ButtonWrapper>
                {hospitalData.keywords.map((el, i) => (
                  <Button
                    key={i}
                    text={el.keyword}
                    backgroundColor={theme.colors.white}
                    color={theme.colors.black}
                    border={`0.1rem solid ${theme.colors.grey}`}
                  />
                ))}
              </ButtonWrapper>
            ) : (
              <EmptyText>등록된 키워드가 없습니다.</EmptyText>
            )}
          </div>
          <div className="list">
            <div className="list-title">전화번호</div>
            {hospitalData.phone_no ? (
              <div>
                <span
                  className="link"
                  onClick={() => phoneCall(hospitalData.phone_no)}
                >
                  {formatPhoneNumber(hospitalData.phone_no)}
                </span>
                {전화예약가능 && <div className="link-sub">(전화예약가능)</div>}
                {hospitalData.website_address && (
                  <div>
                    <Link href={hospitalData.website_address}>
                      <a target="_blank" rel="noopener noreferrer">
                        <span className="link">홈페이지</span>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <EmptyText>등록된 전화번호가 없습니다.</EmptyText>
            )}
          </div>
        </Content>
      </div>
    </HospitalInformationWrapper>
  );
};

export default Information;

const HospitalInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Content = styled.div`
  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      color: ${(props) => props.theme.colors.purple};
      font-weight: 700;
    }
  }

  .hospital-address {
    margin-bottom: 1rem;
  }

  .link {
    color: ${(props) => props.theme.colors.purple_light};
    text-decoration: underline;
  }

  .link-sub {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
