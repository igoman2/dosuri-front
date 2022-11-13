import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
    expires: string;
  }
}
