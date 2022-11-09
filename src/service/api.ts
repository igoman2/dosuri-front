import api from "./axiosConfig";
import { GetToken } from "./types";

export const apis = {
  getPosts: () => api.get("/api/posts"),
  updateToken: ({ requestCode }: GetToken) =>
    api.post("/user/v1/token", {
      code: requestCode,
    }),
};
