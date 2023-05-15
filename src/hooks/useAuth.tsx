import { getCookie } from "cookies-next";

const useAuth = () => {
  const accessToken = getCookie("accessToken");

  return { isLoggedIn: !!accessToken };
};

export default useAuth;
