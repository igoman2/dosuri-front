import { useBoolean } from "usehooks-ts";
import { useEffect } from "react";

/**
 *
 * @returns 아이폰이면 true, 안드로이드면 false
 *  */
const useMobile = () => {
  const { value: isIphone, setTrue, setFalse } = useBoolean();

  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase();

    if (agent.indexOf("android") > -1) {
      setFalse();
    } else if (
      agent.indexOf("iphone") > -1 ||
      agent.indexOf("ipad") > -1 ||
      agent.indexOf("ipod") > -1
    ) {
      setTrue();
    } else {
      setFalse();
    }
  }, []);

  return { isIphone };
};

export default useMobile;
