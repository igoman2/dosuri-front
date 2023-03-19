import React, {
  ChangeEvent,
  Dispatch,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { css, useTheme } from "@emotion/react";
import { useBoolean, useDebounce } from "usehooks-ts";

import Button from "@/components/Button";
import { EmptyText } from "@/components/UI/emotion/EmptyText";
import FullModalBase from "@/components/Modal/FullModalBase";
import { IHospitalInfoResult } from "@/service/types";
import { createReviewState } from "./store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useSearchHospital } from "@/hooks/service/useSearchHospital";
import { closeModalDirectionState } from "@/components/Modal/store";
import { DIRECTION } from "@/types/common";

interface IChooseDoctorProps {
  isActive: boolean;
  mode: number;
  setMode: (val: number) => void;
  onClose: () => void;
  onSwap: () => void;
}
const ChooseDoctor: FC<IChooseDoctorProps> = ({
  isActive,
  mode,
  setMode,
  onClose,
  onSwap,
}) => {
  const theme = useTheme();
  const image = css`
    position: absolute;
    left: 1rem;
    top: 0.8rem;
  `;
  const [inputText, setInputText] = useState("");
  const { value, setTrue, setFalse } = useBoolean(false);
  const debouncedValue = useDebounce<string>(inputText, 300);
  const [reviewState, setReviewState] = useRecoilState(createReviewState);
  const setCloseModalDirection = useSetRecoilState(closeModalDirectionState);

  const { searchedHospitalList } = useSearchHospital({
    query: inputText,
    isInput: value,
    page_size: 30,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTrue();
    setInputText(e.target.value);
  };

  useEffect(() => {
    setFalse();
  }, [debouncedValue]);

  const handleListClick = (hospital: IHospitalInfoResult) => {
    setReviewState((prev) => ({
      ...prev,
      hospital: { name: hospital.name, uuid: hospital.uuid },
    }));
    setMode(0);
  };

  const highlightIncludedText = (text: string, value: string) => {
    const title = text.toLowerCase();
    const searchValue = value.toLowerCase();
    if (searchValue !== "" && title.includes(searchValue)) {
      const matchText = text.split(new RegExp(`(${searchValue})`, "gi"));

      return (
        <>
          {matchText.map((text, index) =>
            text.toLowerCase() === searchValue.toLowerCase() ? (
              <span className="highlight" key={index}>
                {text}
              </span>
            ) : (
              text
            )
          )}
        </>
      );
    }

    return text;
  };

  return (
    <FullModalBase
      isActive={isActive}
      onClose={() => {
        setCloseModalDirection({ direction: DIRECTION.Down });
        setMode(0);
      }}
      onClickBack={() => onClose}
      title="의사 선택"
      right={
        <Button
          padding="0"
          text="적용"
          bold
          color={theme.colors.purple}
          backgroundColor={theme.colors.white}
          fontSize="xxl"
        />
      }
      divider
    >
      <div
        css={{
          marginTop: "0.5rem",
        }}
      >
        <EmptyText>등록된 의사가 없습니다.</EmptyText>
      </div>
    </FullModalBase>
  );
};

export default ChooseDoctor;
