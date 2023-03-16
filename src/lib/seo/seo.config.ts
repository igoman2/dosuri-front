import { DefaultSeoProps } from "next-seo";

const DEFAULT_SEO: DefaultSeoProps = {
  title: "도수리",
  description: "도수 통증치료 병원정보는 도수리",
  openGraph: {
    type: "website",
    site_name: "도수리",
    locale: "ko_KR",
    url: "https://www.dosuri.site",
    images: [{ url: "https://dosuri-image.dosuri.site/common/favicon.png" }],
  },
};

export default DEFAULT_SEO;
