import React, { FC, useState } from "react";

import Auth from "./Auth";
import Basic from "./Basic";
import ChooseHospital from "./ChooseHospital";
import ChooseTreatment from "./ChooseTreatment";
import Complete from "./Complete";
import Detail from "./Detail";
import { css } from "@emotion/react";

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
            setMode={setMode}
            onSwap={onSwap}
            mode={0}
          />
        );

      case 11:
        return (
          <ChooseTreatment
            isActive={isActive}
            onClose={() => onChangeActive()}
            setMode={setMode}
            onSwap={onSwap}
            mode={0}
          />
        );
    }
  };

  return <>{renderWithMode()}</>;
};

export default WriteReview;
