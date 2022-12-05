import { deleteCookie } from "cookies-next";

export const logout = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  window.location.replace("/");
};
