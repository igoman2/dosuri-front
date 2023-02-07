const siteUrl = "https://www.dosuri.site";

module.exports = {
  siteUrl,
  exclude: ["/fallback", "/oauth", "/withauth", "/404", "/500"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/fallback", "/oauth", "/withauth", "/404", "/500"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`${siteUrl}server-sitemap.xml`],
  },
};
