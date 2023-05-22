import { IHospitalInfoHomeResponse } from "@/types/service";
import { atom } from "recoil";
import { v4 } from "uuid";

export const HospitalListState = atom<IHospitalInfoHomeResponse>({
  key: `HospitalList${v4()}`,
  default: {
    address: "",
    top_hospitals: [
      {
        uuid: "",
        address: "",
        name: "",
        area: "",
        up_count: 0,
        view_count: 0,
        article_count: 0,
        latest_article: "",
        latest_article_created_at: "",
        opened_at: "",
        distance: 0,
        attachments: [
          {
            signed_path: "",
          },
        ],
      },
    ],
    good_review_hospitals: [
      {
        uuid: "",
        address: "",
        name: "",
        area: "",
        up_count: 0,
        view_count: 0,
        article_count: 0,
        latest_article: "",
        latest_article_created_at: "",
        opened_at: "",
        distance: 0,
        attachments: [
          {
            signed_path: "",
          },
        ],
      },
    ],
    many_review_hospitals: [
      {
        uuid: "",
        address: "",
        name: "",
        area: "",
        up_count: 0,
        view_count: 0,
        article_count: 0,
        latest_article: "",
        latest_article_created_at: "",
        opened_at: "",
        distance: 0,
        attachments: [
          {
            signed_path: "",
          },
        ],
      },
    ],
    new_hospitals: [
      {
        uuid: "",
        address: "",
        name: "",
        area: "",
        up_count: 0,
        view_count: 0,
        article_count: 0,
        latest_article: "",
        latest_article_created_at: "",
        opened_at: "",
        distance: 0,
        attachments: [
          {
            signed_path: "",
          },
        ],
      },
    ],
    good_price_hospitals: [
      {
        uuid: "",
        name: "",
        area: "",
        up_count: 0,
        view_count: 0,
        article_count: 0,
        avg_price_per_hour: "",
        attachments: [
          {
            signed_path: "",
          },
        ],
      },
    ],
    new_review_hospitals: [
      {
        uuid: "",
        address: "",
        name: "",
        area: "",
        up_count: 0,
        view_count: 0,
        article_count: 0,
        latest_article: "",
        latest_article_created_at: "",
        opened_at: "",
        distance: 0,
        attachments: [
          {
            signed_path: "",
          },
        ],
      },
    ],
  },
});
