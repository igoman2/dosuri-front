import React, { FC } from "react";

import Button from "@/components/Button";
import { EmptyText } from "@/components/UI/emotion/EmptyText";
import { IGetHospitalInfo } from "@/service/types";
import TimeTable from "@/components/TimeTable";
import { formatPhoneNumber } from "@/util/format";
import { phoneCall } from "@/util/phoneCall";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

interface IInformationProps {
  hospitalData: IGetHospitalInfo;
}

const Information: FC<IInformationProps> = ({ hospitalData }) => {
  const theme = useTheme();

  return (
    <HospitalInformationWrapper>
      <div>
        <Content>
          <div className="list">
            <div className="list-title">병원 소개</div>
            {hospitalData.introduction ? (
              <div>{hospitalData.introduction}</div>
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
            <div className="list-title">진료시간</div>
            {hospitalData.calendar ? (
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
            ) : (
              <EmptyText>등록된 진료 시간이 없습니다.</EmptyText>
            )}
          </div>
          <div className="list">
            <div className="list-title">주소</div>
            {hospitalData.address ? (
              <div>{hospitalData.address}</div>
            ) : (
              <EmptyText>등록된 주소가 없습니다.</EmptyText>
            )}
          </div>
          <div className="list">
            <div className="list-title">전화번호</div>
            {hospitalData.phone_no ? (
              <div
                className="phone-number"
                onClick={() => phoneCall(hospitalData.phone_no)}
              >
                {formatPhoneNumber(hospitalData.phone_no)}
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

    &-title {
      color: ${(props) => props.theme.colors.purple};
      font-weight: 700;
    }
  }

  .phone-number {
    color: ${(props) => props.theme.colors.purple_light};
    text-decoration: underline;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
