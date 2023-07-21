import { FC, useEffect, useState } from "react";

import styled from "@emotion/styled";

interface ISliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  setValue: any;
  setDefault: any;
  defaultFlag: boolean;
}

interface ISliderFillTrackProps {
  fill: string;
}

const Slider: FC<ISliderProps> = ({
  step,
  min,
  max,
  value,
  setValue,
  setDefault,
  defaultFlag,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (defaultFlag) {
      setCurrentValue(max);
      setDefault(false);
    }
  }, [defaultFlag]);

  const onSliderChange = (e: any) => {
    const newValue = parseInt(e.target.value);
    setCurrentValue(newValue);
    setValue(newValue);
  };
  return (
    <SliderWrapper>
      <div className="slider-start" />
      <SliderRail />
      <SliderFillTrack fill={`${(currentValue / (max - min)) * 100}%`} />
      <input
        type="range"
        min={step}
        max={max}
        className="slider"
        value={defaultFlag ? max : currentValue}
        onChange={(e) => {
          onSliderChange(e);
        }}
        step={step}
      />
    </SliderWrapper>
  );
};

export default Slider;

const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 2rem;

  .slider-start {
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    border: 2px solid ${(props) => props.theme.colors.purple_light};
    background: ${(props) => props.theme.colors.white};
    z-index: 2;
  }

  .slider {
    position: absolute;
    width: 100%;
    height: 1rem;
    -webkit-appearance: none;
    background-color: transparent;
    top: 3px;
    z-index: 4;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.colors.purple_light};
    background: ${(props) => props.theme.colors.white};
    cursor: pointer;
  }
`;

const SliderRail = styled.div`
  width: 100%;
  position: absolute;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.grey};
  top: 5px;
`;

const SliderFillTrack = styled.div<ISliderFillTrackProps>`
  width: ${(props) => props.fill};
  height: 1rem;
  border-radius: 0.5rem;
  position: absolute;
  background-color: ${(props) => props.theme.colors.purple_light};
  top: 5px;
  left: 0.1rem;
`;
