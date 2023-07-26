import { FC, useEffect, useState } from "react";

import styled from "@emotion/styled";

interface ISliderProps {
  min: number;
  max: number;
  value: {
    min: number;
    max: number;
  };
  step: number;
  setValue: any;
  setDefault: any;
  defaultFlag: boolean;
}

interface ISliderFillTrackProps {
  gap: string;
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
      setCurrentValue({ min: min, max: max });
      setDefault(false);
    }
  }, [defaultFlag]);

  const onMinSliderChange = (e: any) => {
    let newValue = parseInt(e.target.value);
    const currentMax = currentValue.max;
    if (newValue >= currentMax) {
      if (currentMax === 0) newValue = 0;
      else newValue = currentMax - step;
    }
    setCurrentValue((prev) => ({ ...prev, min: newValue }));
    setValue((prev: any) => ({ ...prev, min: newValue }));
  };

  const onMaxSliderChange = (e: any) => {
    let newValue = parseInt(e.target.value);
    const currentMin = currentValue.min;
    if (newValue <= currentMin) {
      if (currentMin === max) newValue = max;
      newValue = currentValue.min + step;
    }
    setCurrentValue((prev) => ({ ...prev, max: newValue }));
    setValue((prev: any) => ({ ...prev, max: newValue }));
  };

  return (
    <SliderWrapper>
      <SliderRail />
      <SliderFillTrack
        gap={`${(currentValue.min / (max - min)) * 100}%`}
        fill={`${((currentValue.max - currentValue.min) / (max - min)) * 100}%`}
      />
      <input
        type="range"
        id="input-left"
        min={min}
        max={max}
        className="slider"
        value={currentValue.min}
        onChange={(e) => {
          onMinSliderChange(e);
        }}
        step={step}
      />
      <input
        type="range"
        id="input-right"
        min={min}
        max={max}
        className="slider"
        value={currentValue.max}
        onChange={(e) => {
          onMaxSliderChange(e);
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

  .slider {
    position: absolute;
    pointer-events: none;
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
    pointer-events: all;
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
  margin: 0 0.2rem;
`;

const SliderFillTrack = styled.div<ISliderFillTrackProps>`
  margin: 0 0.2rem;
  width: ${(props) => props.fill};
  height: 1rem;
  border-radius: 0.5rem;
  position: absolute;
  background-color: ${(props) => props.theme.colors.purple_light};
  top: 5px;
  left: ${(props) => props.gap};
`;
