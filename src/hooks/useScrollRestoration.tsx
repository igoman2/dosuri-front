import { useCallback, useEffect } from "react";

import { scrollState } from "@/store/searchOption";
import useMobile from "./useMobile";
import { useRecoilState } from "recoil";

const useScrollRestoration = () => {
  const { isIphone } = useMobile();
  const [scrollY, setScrollY] = useRecoilState(scrollState);
  const onScroll = useCallback((event: Event) => {
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    if (isIphone) {
      return;
    }

    if (window) {
      window.scrollTo(0, scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [scrollY, isIphone]);
};

export default useScrollRestoration;
