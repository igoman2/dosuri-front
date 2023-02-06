import { DefaultSeoProps } from "next-seo";

const DEFAULT_SEO: DefaultSeoProps = {
  title: "도수리",
  description: "도수 통증치료 병원정보는 도수리",
  canonical: "https://www.dosuri.site",
  //   openGraph: {
  //     type: "website",
  //     locale: "ko_KR",
  //     url: "https://www.dosuri.site",
  //     title: "https://www.dosuri.site",
  //     site_name: "도수리",
  //     images: [
  //       {
  //         url: "https://dosuri-image.dosuri.site/common/favicon.ico",
  //         width: 285,
  //         height: 167,
  //         alt: "이미지",
  //       },
  //     ],
  //   },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default DEFAULT_SEO;
