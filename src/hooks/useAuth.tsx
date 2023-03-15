import { userInfoState } from "@/store/user";
import { useRecoilValue } from "recoil";

const useAuth = () => {
  const userInfo = useRecoilValue(userInfoState);

  return { isLoggedIn: !!userInfo.accessToken };
};

export default useAuth;
