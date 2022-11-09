import api from "./axiosConfig";
import { GetUserAuth } from "./types";

export const apis = {
  getPosts: () => api.get("/api/posts"),
  getUserAuth: ({ username, token, type }: GetUserAuth) =>
    api.post("/user/v1/auth", {
      username,
      token,
      type,
    }),
};
