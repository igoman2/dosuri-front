import { IHospitalRankResult } from "@/types/service";
import styled from "@emotion/styled";
import { FC } from "react";
import Image from "next/image";
import YellowArrowIcon from "@/public/assets/yellow-arrow.png";
import { useSetRecoilState } from "recoil";
import { rankViewState } from "./store";
import { useRouter } from "next/router";

interface IPriceRankingProps {
  hospitalRankData: IHospitalRankResult;
}

const PriceRanking: FC<IPriceRankingProps> = ({ hospitalRankData }) => {
  const setRankViewState = useSetRecoilState(rankViewState);
  const router = useRouter();

  const onRankClick = () => {
    setRankViewState({
      viewRanking: true,
      nearSiteLatitude: hospitalRankData.near_site_latitude,
      nearSiteLongitude: hospitalRankData.near_site_longitude,
    });
    router.push(`/search`);
  };
  return (
    <PriceRankingWrapper>
      <div className="ranking">
        <div>
          {hospitalRankData.near_site} 근처 {hospitalRankData.total_count}개
          병원 중{" "}
          <span className="bold colored">{hospitalRankData.rank}번째</span>
          <span className="colored">로 치료비 싼 병원</span> -{" "}
          {hospitalRankData.total_count}개 병원 평균은 약{" "}
          <span className="bold colored">
            {Math.round(hospitalRankData.avg_price_per_hour).toLocaleString(
              "en"
            )}
            원
          </span>
          입니다.
        </div>
        <div className="ranking-router" onClick={onRankClick}>
          <div className="bold colored">
            {hospitalRankData.total_count}개 병원의 치료비 순위 보기
          </div>
          <Image
            src={YellowArrowIcon}
            alt="yelloArrowIcon"
            width={24}
            height={24}
          ></Image>
        </div>
      </div>
    </PriceRankingWrapper>
  );
};
export default PriceRanking;

const PriceRankingWrapper = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.grey_light};
  border-radius: 1rem;

  .ranking {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};

    .bold {
      font-weight: bold;
    }

    .colored {
      color: ${(props) => props.theme.colors.yellow};
    }

    .ranking-router {
      font-size: ${(props) => props.theme.fontSizes.xl};
      line-height: ${(props) => props.theme.lineHeights.xl};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 1rem;
    }
  }
`;
