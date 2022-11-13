import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

const createOptions = (req: NextApiRequest): NextAuthOptions => ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (req.url === "/api/auth/session?update") {
        const { data } = await axios.post(
          "http://dosuri-env.eba-igc5wtjb.ap-northeast-2.elasticbeanstalk.com/user/v1/token/refresh/",
          {
            refresh: token.refreshToken,
          }
        );
        token.accessToken = data.access;

        return token;
      }

      if (account) {
        try {
          const resp = await axios.post(
            "http://dosuri-env.eba-igc5wtjb.ap-northeast-2.elasticbeanstalk.com/user/v1/auth/",
            {
              username: token.email,
              token: account.access_token,
              type: account.provider,
            }
          );

          token.accessToken = resp.data.access_token;
          token.refreshToken = resp.data.refresh_token;
        } catch (e) {
          console.log(e);
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.JWT_SECRET,
});

const Auth = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  return NextAuth(req, res, createOptions(req));
};

export default Auth;
