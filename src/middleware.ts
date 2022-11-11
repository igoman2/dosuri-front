import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: (res) => {
      return res.token ? true : false;
    },
  },
});

export const config = {
  matcher: [
    "/mypage/:path*",
    "/community/:path*",
    "/register/:path*",
    "/search/:path*",
  ],
};
