export const setTokenInCookie = (type: "refresh" | "access", token: string) => {
  if (type === "refresh") {
    document.cookie = `refreshToken=${token}; path=/;`;
  } else if (type === "access") {
    document.cookie = `accessToken=${token}; path=/;`;
  } else {
    throw new Error("Invalid token type");
  }
};
