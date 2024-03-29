import FullModalBase from "@/components/Modal/FullModalBase";
import { useRecoilState } from "recoil";
import { price, searchModalState, year } from "./store";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import theme from "@/styles/theme";
import Slider from "@/components/Slider";
import { useState } from "react";
import { MAX_PRICE, MAX_YEAR } from "@/constants/Filter";

const FilterOptionModal = () => {
  const [modal, setModal] = useRecoilState(searchModalState);
  const [defaultFlag, setDefault] = useState(false);
  const [filterPrice, setFilterPrice] = useRecoilState(price);
  const [filterYear, setFilterYear] = useRecoilState(year);
  const [tmpPrice, setPrice] = useState(filterPrice);
  const [tmpYear, setYear] = useState(filterYear);

  const closeModal = () => {
    setModal(false);
  };

  const getMaxPrice = () => {
    if (tmpPrice.max === MAX_PRICE) return "제한없음";
    return Math.round(tmpPrice.max).toLocaleString("en");
  };

  const onDefault = () => {
    setDefault(true);
    setPrice({ min: 0, max: MAX_PRICE });
    setYear({ min: 0, max: MAX_YEAR });
  };

  const onClick = () => {
    setFilterPrice(tmpPrice);
    setFilterYear(tmpYear);
    closeModal();
  };

  const handlePriceChange = (value: { min: number; max: number }) => {
    setPrice(value);
  };

  const handleYearChange = (value: { min: number; max: number }) => {
    setYear(value);
  };

  const onClickBack = () => {
    setPrice(filterPrice);
    setYear(filterYear);
    closeModal();
  };

  return (
    <>
      {modal && (
        <FullModalBase
          isActive={false}
          onClose={() => {
            closeModal();
          }}
          title="필터"
          isBackBtnVisible={true}
          onClickBack={onClickBack}
        >
          <Default onClick={onDefault}>초기화</Default>
          <Filter>
            <div className="filter-name">치료비 (60분 기준)</div>
            <div className="description">
              원하는 예산 범위를 설정할 수 있어요.
            </div>
            <div className="range-text">
              ₩ {tmpPrice.min} ~ ₩ {getMaxPrice()}
            </div>
            <Slider
              max={MAX_PRICE}
              min={0}
              value={tmpPrice}
              setValue={handlePriceChange}
              step={50000}
              setDefault={setDefault}
              defaultFlag={defaultFlag}
            />
            <div className="filter-name second">병원 연식</div>
            <div className="description">
              오래된 병원인지 새 병원인지 설정할 수 있어요.
            </div>
            <div className="range-text">
              {tmpYear.min}년 ~{" "}
              {tmpYear.max === MAX_YEAR ? "제한없음" : tmpYear.max + "년"}
            </div>
            <Slider
              max={MAX_YEAR}
              min={0}
              value={tmpYear}
              setValue={handleYearChange}
              step={1}
              setDefault={setDefault}
              defaultFlag={defaultFlag}
            />
          </Filter>
          <ButtonWrapper>
            <Button
              text="적용하기"
              width="100%"
              height="5.2rem"
              borderRadius="0.3rem"
              backgroundColor={theme.colors.purple_light}
              bold
              onClick={onClick}
            />
          </ButtonWrapper>
        </FullModalBase>
      )}
    </>
  );
};

export default FilterOptionModal;

const Default = styled.div`
  position: absolute;
  top: 1.6rem;
  right: 2rem;
  font-size: ${(props) => props.theme.fontSizes.xxl};
  line-height: ${(props) => props.theme.lineHeights.xxl};
  color: ${(props) => props.theme.colors.grey};
`;

const Filter = styled.div`
  .filter-name {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: bold;
  }

  .description {
    margin: 1rem 0;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
  }

  .range-text {
    margin-bottom: 2rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }

  .second {
    margin-top: 4rem;
  }
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.colors.white};
`;
