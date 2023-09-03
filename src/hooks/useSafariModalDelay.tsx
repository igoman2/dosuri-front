import { useEffect, useState } from "react";

const SAFARI_DELAY = 280;

const useSafariModalDelay = () => {
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsBottomVisible(true);
    }, SAFARI_DELAY);
  }, []);

  return { isBottomVisible };
};

export default useSafariModalDelay;
