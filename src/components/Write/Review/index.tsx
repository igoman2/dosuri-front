import { closeModalDirectionState, modalState } from "@/components/Modal/store";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Auth from "./Auth";
import Basic from "./Basic";
import ChooseDoctor from "./ChooseDoctor";
import ChooseHospital from "./ChooseHospital";
import ChooseTherapist from "./ChooseTherapist";
import ChooseTreatment from "./ChooseTreatment";
import Complete from "./Complete";
import Detail from "./Detail";

interface IWriteReviewProps {
  isActive: boolean;
  onChangeActive: () => void;
  onSwap: () => void;
  onClose: () => void;
}

const WriteReview: FC<IWriteReviewProps> = ({
  isActive,
  onChangeActive,
  onSwap,
  onClose,
}) => {
  const [mode, setMode] = useState<number>(0);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleMode = (modeNum: number) => {
    setMode(modeNum);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  const renderWithMode = () => {
    switch (mode) {
      case 0:
        return (
          <Basic
            isActive={isActive}
            onClose={() => onChangeActive()}
            mode={mode}
            setMode={setMode}
            onSwap={onSwap}
          />
        );
      case 1:
        return (
          <Detail
            isActive={isActive}
            onClose={() => onChangeActive()}
            mode={mode}
            setMode={setMode}
            onSwap={onSwap}
          />
        );
      case 2:
        return (
          <Auth
            isActive={isActive}
            onClose={() => onChangeActive()}
            mode={mode}
            setMode={setMode}
            onSwap={onSwap}
          />
        );
      case 3:
        return (
          <Complete
            isActive={isActive}
            onClose={onClose}
            setMode={setMode}
            onSwap={onSwap}
          />
        );

      case 10:
        return (
          <ChooseHospital
            isActive={isActive}
            onClose={() => onChangeActive()}
            setMode={handleMode}
            onSwap={onSwap}
            mode={0}
          />
        );

      case 11:
        return (
          <ChooseTreatment
            isActive={isActive}
            onClose={() => onChangeActive()}
            setMode={handleMode}
            onSwap={onSwap}
            mode={0}
          />
        );

      case 12:
        return (
          <ChooseDoctor
            isActive={isActive}
            onClose={() => onChangeActive()}
            setMode={handleMode}
            onSwap={onSwap}
            mode={0}
          />
        );

      case 13:
        return (
          <ChooseTherapist
            isActive={isActive}
            onClose={() => onChangeActive()}
            setMode={handleMode}
            onSwap={onSwap}
            mode={0}
          />
        );
    }
  };

  return <>{renderWithMode()}</>;
};

export default WriteReview;
