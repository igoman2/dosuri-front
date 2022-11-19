import api from "./axiosConfig";
import { GetUserAuth } from "./types";

export const apis = {
  getPosts: () => api.get("/api/posts"),
  getMyInfo: () => api.get("/api/user/v1/users/me"),
  getUserAuth: ({ token, type }: GetUserAuth) =>
    api.post("/api/user/v1/auth", {
      token,
      type,
    }),
};
