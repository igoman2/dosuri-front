import { useEffect, useState } from "react";

import { getCookie } from "cookies-next";

const useAuth = () => {
  const token = getCookie("accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return { isLoggedIn };
};

export default useAuth;
